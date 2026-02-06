import React from "react";
import MovieCard from "./MovieCard";

const MovieList = (props)=>{
    return (
        <>
            {props.movies?.map((movie,index)=> <MovieCard
                key={index}
                movie = {movie}
                isFavorite={props.favorites.some((fav) => fav.imdbID === movie.imdbID)}
                onToggleFavorite = {props.onToggleFavorite}
               />
               
        )}
        </>
    )
}
export default MovieList;