import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Movielist from './components/Movielist';
import Title from "./components/Title";
import Search from "./components/Search";
import Favourites from "./components/Favourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("top 10")
  const [favourites, setFavourites] = useState([])

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=2ba08919`

    const response = await fetch(url);
    const responseJson = await response.json()

    console.log(responseJson);
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }

  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites)
  }, [])



  const saveToLocalStorage = (items) =>{
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items))
  }



  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourites)=> favourites.imdbId !== movie.imdbId
    );
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList);
  };


  return (
    <div className='container-fluid movie-list'>

      

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Title heading="10X Movies" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <Movielist movies={movies} handleFavouritesClick={addFavouriteMovie} favouritesComp={Favourites} />
      </div>


      <div className="row d-flex align-items-center mt-4 mb-4">
        <Title heading="Favourites" />
      </div>
      <div className="row">
        <Movielist movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouritesComp={RemoveFavourites} />
      </div>

    </div>
  );
}

export default App;
