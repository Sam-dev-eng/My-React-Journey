import Favorites from "../../components/Favorites";
import gigs from "../../components/Gigs"
import React from "react"
import "./FavoritePage.css"


function FavoritePage(){

    const [favorites,setFavorites] = React.useState(() => {
        const saved = sessionStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
        });


    const favoriteGigs = gigs().filter((gig)=>(
        favorites.includes(gig.id)
    ));

    const toggleFavorite = (gigId)=>{
        setFavorites((prev)=>{
            const isFavorite = prev.includes(gigId);
            if(isFavorite)return prev.filter((id) => id !== gigId);
            else return [...prev,gigId];
            }   
        )
    }

    React.useEffect(() => {
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
        }, [favorites]);
    



    return(
        <>
            <div className="favorite-grid">
                <Favorites
                favorites={favoriteGigs}
                onToggleFavorite={toggleFavorite}
            />
            </div>
            
        </>
    )
}
export default FavoritePage;