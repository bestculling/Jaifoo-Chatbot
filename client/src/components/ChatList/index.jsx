import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import "./ChatList.css"

const ChatList = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }),
  });

  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
            ? "Something went wrong!"
            : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      {/* <div className='upgrade'>
        <img src="/logo.png" alt="" />
        <div className='texts'>
          <span>Upgrade to AI Pro</span>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
        </div>
      </div> */}
    </div>
  )
}

export default ChatList