import "./Chats.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { findChat, getMessages } from "../../api/Chat";
import Avatar from "../../assets/Avatar.png";
import { connectWebSocket, sendMessageWs } from "../../api/WebSocketClient";


export default function Chat() {
  const { chatId } = useParams();
  

  const [newMessage,setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis,setShowEmojis] = useState(false);
  const [otherUser, setOtherUser] = useState("");
  const emojis = ["😀", "😂", "😍", "👍", "🔥", "😢", "🎉"];
  const token = sessionStorage.getItem("token");




  const handleEmojiClicks =(emoji)=>{
    setNewMessage((prev)=> prev + emoji);
    setShowEmojis(false);
  }

  const user = { id: sessionStorage.getItem("id") };


  const handleOtherUser = async () => {
    const res = await findChat(chatId);
    console.log(res);
    setOtherUser(res.data.data.otherUser)
  }

  const messagesEndRef = useRef(null);
  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])


  const fetchMessages = async () => {
    try {
      const res = await getMessages(chatId);
      //console.log(res.data.data.messages);
      const formatted = res.data?.data?.messages?.map((msg) => ({
        id: msg.id,
        senderId: msg.senderId,
        text: msg.content,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };


  const handleTyping = () => {
    setIsTyping(true);
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };


  useEffect(() => {
    fetchMessages();
    handleOtherUser();
    connectWebSocket(token, (incommingMessage) => {
     // console.log(incommingMessage.message);
      const formattedMessage = {
        id: incommingMessage.message.id,
        senderId: incommingMessage.message.senderId,
        text: incommingMessage.message.content,
        time: new Date(incommingMessage.message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      };
      setMessages((prev)=> [...prev,formattedMessage])
    });
    return () => {
      
    };
  }, [chatId]);

  const handleSendMessage =  (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const payload = {
      chatId,
      receiverId: otherUser.id,
      content : newMessage,
    };

    sendMessageWs(payload);

    setMessages((prev) => [
      ...prev, {
        id: Date.now(),
        senderId: user.id,
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    ])
    setNewMessage("");
  };


  return (
    <div className="chat-page">
      <div className="chat-header">
        <img src={otherUser.profileImage || Avatar} alt={otherUser.fullName} />
        <div>
          <h4>{otherUser.fullName}</h4>
          <span>Online</span>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === user.id ? "own" : ""}`}
          >
            <p>{msg.text}</p>
            <span>{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isTyping && (
        <div className="typing-indicator">
          {otherUser.fullName} is typing...
        </div>
      )}

      {showEmojis && (
        <div className="emoji-picker">
          {emojis.map((emoji) => (
            <span key={emoji} onClick={() => handleEmojiClicks(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}
      <div className="chat-input-wrapper">
        <form className="chat-input" onSubmit={handleSendMessage}>
          <button
            type="button"
            className="emoji-btn"
            onClick={() => setShowEmojis((prev) => !prev)}
          >
            😊
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
          />
          <button type="submit" disabled={!newMessage.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
