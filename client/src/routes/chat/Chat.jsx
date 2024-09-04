import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import NewPrompt from '../../components/NewPrompt'
import HighlightedMarkdown from "../../components/HighlightedMarkdown";

const Chat = () => {
  // example path => /dashboard/chats/66c87339e90e84234dc41640
  const path = useLocation().pathname;
  /* 
    path.split("/").pop() ทำการแยก string ที่เป็น path ออกเป็น array โดยใช้เครื่องหมาย / เป็นตัวแบ่ง
    จากนั้น .pop() จะดึงเอาค่า element สุดท้ายใน array ซึ่งก็คือ "66c87339e90e84234dc41640" ออกมาเป็นค่า chatId
  */
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="overflow-scroll w-full flex justify-center">
        <div className="flex flex-col items-center gap-5">
          {isPending
            ? "Loading..."
            : error
              ? "Something went wrong!"
              : data?.history?.map((message, i) => (
                <div
                  key={i}
                  className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[75%] px-12 mt-5">
                    {message.img && (
                      <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lqip={{ active: true, quality: 20 }}
                      />
                    )}
                    {
                      message.role === "user" && (
                        <div
                          className={`p-5 rounded-2xl bg-[#2c2937] text-white`}
                        >
                          {
                            message.parts[0].text
                          }
                        </div>
                      )
                    }
                    {
                      message.role !== "user" && (
                        <div
                          className={`flex p-5 rounded-2xl text-white`}
                        >
                          <img className="w-12 h-12 mx-2" src="/bot.png" alt="" />
                          <div className="mt-4"><HighlightedMarkdown text={message.parts[0].text} /></div>
                        </div>
                      )
                    }
                  </div>
                </div>
              ))}
          <div className="mt-12">.</div>
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  )
}

export default Chat