import { useParams, Link, useNavigate} from "react-router";
import Navbar from "../../components/navBarfolder/NavBar";
import "./GigDetails.css"
import { useEffect, useState } from "react";
import api from "../../api/axios"
import { startChat } from "../../api/Chat";
import Avatar from "../../assets/Avatar.png";
// const URL = import.meta.env.FIVER_URL;



function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState("");

  const fetchGigDetails = async () => {
    //setLoading(true)
    try {
      const res = await api.get(`/gigs/viewGigDetails/${id}`);
      setGig(res?.data?.data);
      //console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      //setLoading(false);
    }
  };

  const messageSeller = async  () => {
      try {
        const res = await startChat(gig?.user?.id);
        console.log(res.data.data);
        const chatId = res.data.data.id;
        navigate(`/chat/${chatId}`);
      } catch (err) {
        console.error(err);
      }
    }


  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  //const gig = gigs().find((g) => g.id === Number(id));

  if (!gig) return <p>Gig not found</p>;

  return (
    <>
      {/* <Navbar isAuthenticated={true} role="client" /> */}
      <div className="gig-details-page">
        <h1 className="gig-title">{gig?.title}</h1>
        <div className="seller-row">
          <Link to={`/user/${gig?.user?.id}`}>
            <img
              src={gig?.user?.profileImage || Avatar}
              alt={gig?.user?.fullName}
            />
          </Link>
          <strong>{gig?.user?.fullName}</strong>
          <p className="seller-meta">
            {gig?.user?.level} • ⭐ {gig?.user?.rating}
          </p>
          <button className="message-btn" onClick={messageSeller}>
            Message Seller
          </button>
        </div>

        <div className="gig-media">
          <img src={gig?.image} alt={gig?.gigTitle} />
        </div>

        <div className="gig-description">
          <h3>About this gig</h3>
          <p>{gig?.gigDescriptions}</p>
          <button className="message-btn" onClick={messageSeller}>
            Message Seller
          </button>
        </div>

        <div className="gig-reviews">
          <h3>Reviews</h3>
          {gig.feedBacks?.map((message) => (
            <h1 key={message.user.id}>{message.feedback}</h1>
          ))}
        </div>
      </div>
    </>
  );
}

export default GigDetails;


{/* <div className="seller-info">
          <Link to={`/user/${gig.user.id}`}>
            <img src={gig.user.avatar} alt={gig.user.name} />
            <span>{gig.user.name}</span>
          </Link>
        </div> */}

        