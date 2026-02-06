import React from "react"



const MovieCard = (props)=>{
  

    return (
        <div  className="image-container">
                
                <img src={props.movie.Poster} alt ={props.movie.Title}/>    
                <div className="overlay">
                    <button className="play-button">▶ Play</button>
                    <div
                        className={`favorite-icon ${props.isFavorite ? "active" : ""}`}
                        onClick={() => props.onToggleFavorite(props.movie)}>
                        {props.isFavorite ? "❤️" : "🤍"}
                    </div>
                </div>  
                
            </div>
    )

}

export default MovieCard;





