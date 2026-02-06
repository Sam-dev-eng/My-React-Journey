import "./ChatList.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getUserChats } from "../../api/Chat";
import avatar from "../../assets/Avatar.png";

export default function ChatList() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await getUserChats(sessionStorage.getItem("id"));
      setChats(res.data.data.userChats);
      console.log(res.data.data);
            

    } catch (err) {
      console.error("Failed to load chats", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading chats...</p>;

  return (
    <div className="chat-list">
      <h2>Messages</h2>

      {chats.length === 0 && <p>No conversations yet</p>}

      {chats?.map((chat) => {
        return (
          <div
            key={chat.chat.id}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat?.chat?.id}`)}
          >
            <img
              src={chat.otherUser?.profileImage || avatar}
              alt={chat.otherUser?.fullName || "User"}
            />

            <div className="chat-info">
              <strong>{chat.otherUser?.fullName || "Unknown"}</strong>
              <p>{chat.chat.lastMessage || "No messages yet"}</p>
            </div>

            <span>
              {chat.chat.lastMessage
                ? new Date(chat.chat.lastMessageAt).toLocaleTimeString()
                : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
