/*การใช้ parts แบบนี้ช่วยให้ประวัติการสนทนาเก็บข้อมูลเป็นชิ้นส่วนและสามารถเก็บข้อมูลประเภทอื่นๆ (เช่น รูปภาพหรือข้อมูลเชิงโครงสร้าง) ได้ในอนาคต 
โดยไม่จำเป็นต้องมีแค่ข้อความ.
เช่น

ผู้ใช้ได้พูดคำว่า "Hello" ในการสนทนาครั้งนั้น.
{
  role: "user",
  parts: [{ text: "Hello" }],
}

โมเดล AI ได้ตอบกลับด้วยประโยค "Great to meet you. What would you like to know?".
{
  role: "model",
  parts: [{ text: "Great to meet you. What would you like to know?" }],
}

*/

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        history: [
            {
                role: {
                    type: String,
                    enum: ["user", "model"],
                    required: true,
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true,
                        },
                    },
                ],
                img: {
                    type: String,
                    required: false,
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.chat || mongoose.model("chat", chatSchema);