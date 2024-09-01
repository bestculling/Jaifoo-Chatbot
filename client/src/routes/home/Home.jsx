import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TypeAnimation } from "react-type-animation";
import "./Home.css"

const Home = () => {
    const [typingStatus, setTypingStatus] = useState("human1");
    return (
        <div className="homepage">
            <img src="/orbital.png" alt="" className="orbital" />
            <div className="left">
                <h1>JAIFOO</h1>
                <h1 style={{ fontSize: "80px" }}>Chatbot AI</h1>
                <h2>Unleash the Power of Intelligent Conversations</h2>
                <h3>
                Transform your ideas into reality with Jaifoo, the cutting-edge AI chatbot powered by Google Generative AI.
                </h3>
                <Link to="/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/bot.png" alt="" className="bot" />
                    <div className="chat">
                        <img
                            src={
                                typingStatus === "human1"
                                    ? "/human1.jpeg"
                                    : typingStatus === "human2"
                                        ? "/human2.jpeg"
                                        : "bot.png"
                            }
                            alt=""
                        />
                        <TypeAnimation
                            sequence={[
                                "เราสร้างความคิดสร้างสรรค์ไร้ขีดจำกัด",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "เราทำให้ความคิดของคุณกลายเป็นจริง",
                                2000,
                                () => {
                                    setTypingStatus("human2");
                                },
                                "เราเชื่อมต่อความคิดสร้างสรรค์ของคุณเข้ากับโลก",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "มาร่วมสร้างสิ่งใหม่ๆ ด้วย TLM",
                                2000,
                                () => {
                                    setTypingStatus("human1");
                                },
                            ]}
                            wrapper="span"
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo.png" alt="" />
                <div className="links">
                    <Link to="/">Terms of Service</Link>
                    <span>|</span>
                    <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default Home