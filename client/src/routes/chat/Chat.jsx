import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import "./Chat.css"
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
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
              ? "Something went wrong!"
              : data?.history?.map((message, i) => (
                <div key={i}>
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
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <HighlightedMarkdown text={message.parts[0].text} />
                  </div>
                </div>
              ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  )
}

export default Chat