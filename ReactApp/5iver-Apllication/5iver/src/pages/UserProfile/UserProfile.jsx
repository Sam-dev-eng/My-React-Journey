import { useParams,useNavigate } from "react-router";
import Navbar from "../../components/navBarfolder/NavBar";
import GigCard from "../../components/GigCardFolder/GigCard";
import "./UserProfile.css"
import { useEffect, useState } from "react";
import api from "../../api/axios"
import { startChat } from "../../api/Chat";
import Avatar from "../../assets/Avatar.png";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userGigs, setUserGigs] = useState("");
  const [user, setUser] = useState("");


  const fetchUserGigs = async () => {
    try {
      const res = await api.get(
        `/gigs/findGigByUserId`,
        {
          params :{
            id,
            page: 0,
            size: 10

          }
        }
      )
      setUserGigs(res.data.data.content);
      setUser(res.data.data.content[0].user);
    } catch (err) {
      console.error(err);

    }
  }

  const messageSeller = async  () => {
    try {
      const res = await startChat(user.id);
      const chatId = res.data.data.id;
      navigate(`/chat/${chatId}`);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
   fetchUserGigs()
 },[id])

  if (!user) return <p>User not found</p>;

  return (
    <>
      <Navbar isAuthenticated={true} role="client" />
      <div className="user-profile">
        <div className="user-header">
          <img src={user.image || Avatar} alt={user.fullName} />
          <div className="user-info">
            <h2>{user.fullName}</h2>
            <p>{user.bio}</p>
            <button className="message-btn" onClick={messageSeller}>
              Message Seller
            </button>
          </div>
        </div>

        <div className="user-gigs">
          <h3>Gigs by {user.fullName}</h3>

          <div className="gig-grid">
            {userGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
