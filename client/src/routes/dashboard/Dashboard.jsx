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
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
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