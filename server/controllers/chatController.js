import Chat from "../models/chatModel.js";
import UserChats from "../models/userChatsModel.js";

export const createNewChat = async (req, res) => {
    const userId = req.auth.userId; // ดึง userId จากข้อมูลการยืนยันตัวตน
    const { text } = req.body;

    try {
        // สร้างแชทใหม่
        const newChat = new Chat({
            userId: userId,
            history: [{ role: "user", parts: [{ text }] }],
        });

        const savedChat = await newChat.save();

        // ตรวจสอบว่ามีการแชทของผู้ใช้หรือไม่
        const userChats = await UserChats.find({ userId: userId });

        // หากไม่มีอยู่ ให้สร้างใหม่และเพิ่มแชทในอาร์เรย์แชท
        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [
                    {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    },
                ],
            });

            await newUserChats.save();

        } else {
            // หากมีอยู่ ให้ผลักแชทไปยังอาร์เรย์ที่มีอยู่
            await UserChats.updateOne(
                { userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40),
                        },
                    },
                }
            );

            res.status(201).send(newChat._id);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching userchats!");
    }
}

export const getUserChats = async (req, res) => {
    const { userId } = req.auth;

    try {
        const userChats = await UserChats.findOne({ userId });

        if (!userChats) {
            return res.status(404).json({ error: "User chats not found!" });
        }

        res.status(200).json(userChats.chats);
    } catch (error) {
        console.error("Error fetching user chats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChats = async (req, res) => {
    const userId = req.auth.userId;

    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId });

        res.status(200).send(chat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching chat!");
    }
}

export const updateChat = async (req, res) => {
    const userId = req.auth.userId;

    const { question, answer, img } = req.body;

    const newItems = [
        ...(question
            ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
            : []),
        { role: "model", parts: [{ text: answer }] },
    ];

    try {
        const updatedChat = await Chat.updateOne(
            { _id: req.params.id, userId },
            {
                $push: {
                    history: {
                        $each: newItems,
                    },
                },
            }
        );
        res.status(200).send(updatedChat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding conversation!");
    }
}
