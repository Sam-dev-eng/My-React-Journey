import React from "react";
import './App.css'
import MovieList from "./components/MovieList"
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox";
import Favorites  from "./components/Favorites";
function App() {
  const [movies,setMovies] = React.useState([]);
  const [searchValue,setSearchValue] = React.useState('')
  const [favorites, setFavorites] = React.useState([])


  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
    const isFavorite = prev.some((fav) => fav.imdbID === movie.imdbID);
    
    if (isFavorite) {
      return prev.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      return [...prev, movie];
    }
  });
};





  const getMovieRequest = async (searchValue)=>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8862701c`
    const response = await fetch(url);
    // convert the response to a json s
    const responseJson = await response.json();
    if (responseJson){
      setMovies(responseJson.Search);
    }
    
  }

  React.useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])
  return (
    

    <>
        <div className="container-fluid">
          <header>
            <MovieListHeading heading="Movie"/>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
          </header>
          <div className="RowMovies">
            <MovieList 
            movies={movies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            />
          </div>
          <div className="favorites">

             <Favorites 
             favorites={favorites}
             onToggleFavorite={toggleFavorite}
             />

          </div>
         
        </div>
    </>
  )
}

export default App
