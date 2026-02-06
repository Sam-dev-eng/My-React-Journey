
import MovieCard from "./MovieCard"


const Favorites = (props)=>{
 
    return(
        <>
            {props.favorites?.map((movie)=> <MovieCard
                movie = {movie}
                isFavorite={props.favorites.some((fav) => fav.imdbID === movie.imdbID)}
                onToggleFavorite = {props.onToggleFavorite}
               />               
        )}
        </>
    )

}
export default Favorites;