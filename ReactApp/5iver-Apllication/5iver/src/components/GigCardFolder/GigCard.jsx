import "./GigCard.css";
import { useNavigate } from "react-router";


function GigCard(props) {
  const navigate = useNavigate();
  return (
    <div 
    className="gig-card"
    onClick={()=> navigate(`/gig/${props.id}`)}
    >
      <div className="gig-image">
      <img src={props.image} alt={props.title} />
      </div>

      <div className="gig-info">
        <h3>{props.title}</h3>
        <p className="seller">{props.seller}</p>

        <div className="gig-footer">
          <span className="price">${props.price}</span>
          <div 
              className={`favorite-icon ${props.isFavorite ? "active" : ""}`}
              onClick={(e) => {
              e.stopPropagation();
              props.onToggleFavorite(props.id)}}>
              {props.isFavorite ? "❤️" : "🤍"}        
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default GigCard;
