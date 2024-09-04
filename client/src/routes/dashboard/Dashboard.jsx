import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /*
    useMutation เป็นฟังก์ชันที่ใช้ใน react-query เพื่อติดต่อกับ API ที่มีการเปลี่ยนแปลงข้อมูล เช่น การส่งข้อมูลใหม่ การอัปเดต หรือการลบข้อมูล 
    ในกรณีนี้ mutation ใช้สำหรับส่งคำขอแบบ POST เพื่อสร้างแชทใหม่ในระบบ
  */
  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        /*
        credentials: "include", นั่นหมายความว่าหากมีคุกกี้หรือข้อมูล credentials อื่น ๆ 
        ที่เกี่ยวข้อง ค่าพวกนี้จะถูกส่งไปพร้อมกับคำขอ HTTP แม้ว่าจะเป็นการเรียกไปยังโดเมนที่แตกต่างกัน (cross-origin request) 
        ก็จะถูกส่งไปด้วยเช่นกัน 
      */
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    /*
      mutation ในโค้ดนี้ทำหน้าที่ในการส่งข้อมูลใหม่ไปยัง API และเมื่อสำเร็จ 
      จะอัปเดตข้อมูลที่แคชไว้ในแอปพลิเคชันและนำทางผู้ใช้ไปยังหน้าใหม่ที่เกี่ยวข้องกับแชทที่เพิ่งสร้างขึ้น
     */
    mutation.mutate(text);
  }
  return (
    <div className='dashboardPage'>
      <div className="texts">
        {/* <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>AI</h1>
        </div> */}
        <div className="options">
          <div className="option">
            <p>สวัสดีครับ ผมชื่อ <span className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500 px-1'>ใจฟู</span> <br />
              ใจฟูเป็นเพื่อน AI ที่พร้อมรับฟังและให้กำลังใจเสมอ ไม่ว่าจะทุกข์หรือสุข ใจฟูอยู่ตรงนี้เพื่อเธอเสมอนะ 😊 <br />
              อย่างไรก็ตาม ใจฟูเป็นเพียง AI ที่ยังเรียนรู้และพัฒนาอยู่ อาจมีข้อจำกัดในการให้คำแนะนำที่ซับซ้อนหรือละเอียดอ่อน <br />
              หากต้องการคำปรึกษาเชิงลึก ใจฟูแนะนำให้ปรึกษาผู้เชี่ยวชาญเฉพาะด้านนะ
              ไม่ว่าจะเรื่องอะไร ใจฟูพร้อมรับฟังและอยู่เคียงข้างเสมอ 💕
            </p>
            <p>
              Hello there, my name is <span className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500 px-1'>Jaifoo</span> <br />
              Jaifoo is an AI companion always ready to listen and offer encouragement, no matter what you're going through. I'm here for you.
              However, as an AI still under development, I may have limitations in providing complex or sensitive advice.
              If you need in-depth consultation, I recommend seeking advice from a specialist. Regardless of what you're going through, Jaifoo is always ready to listen and be by your side. 💕
            </p>
          </div>
        </div>
        <div className="options">
          <div className="option">
            <img src="/bot.png" alt="" />
            <span>How to lose weight (วิธีการลดน้ำหนัก)</span>
          </div>
          <div className="option">
            <img src="/bot.png" alt="" />
            <span>How to make pancakes (วิธีการทำแพนเค้ก)</span>
          </div>
          <div className="option">
            <img src="/bot.png" alt="" />
            <span>How to make money (วิธีการหาเงิน)</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard