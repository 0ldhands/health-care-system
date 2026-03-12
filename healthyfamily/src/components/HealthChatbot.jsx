import { useState, useRef, useEffect } from "react";
import { getBotReply } from "./chatbotLogic";
import "./HealthChatbot.css";
import robot from "../assets/robot.png";

export default function HealthChatbot() {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg = {
            sender: "user",
            text: input,
            time: getTime()
        };

        const botData = getBotReply(input);

        const botMsg = {
            sender: "bot",
            text: botData.message,
            helpline: botData.helpline,
            firstAid: botData.firstAid,
            time: getTime()
        };

        setMessages(prev => [...prev, userMsg, botMsg]);
        setInput("");
    };

    return (
        <>

            <div className="chatbot-float" onClick={() => setOpen(!open)}>
                <img src={robot} alt="robot" />
            </div>

            {open && (
                <div className="chatbot-box">

                    <div className="chatbot-header">
                        Care Buddy ❤︎
                        <span onClick={() => setOpen(false)}>✖</span>
                    </div>

                    <div className="chat-area">
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.sender === "user" ? "user" : "bot"}>
                                <p>{msg.text}</p>

                                {msg.helpline &&
                                    msg.helpline.map((h, idx) => <p key={idx}>{h}</p>)}

                                {msg.firstAid && <p>🩹 {msg.firstAid}</p>}
                                {/* <span className="time">{msg.time}</span> */}

                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    <div className="input-area">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask me..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>➤</button>
                    </div>

                </div>
            )}

        </>
    );
}
