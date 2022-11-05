import React from 'react'
import Favourites from './Favourites';
import RemoveFavourites from './RemoveFavourites';
const Movielist = (props) => {
    const favouritesComp= props.favouritesComp;
  return (
    <>
    {props.movies.map((movie, index)=> 
    <div className='img-container d-flex justify-content-start m-3'>
        <img src={movie.Poster} alt="Poster"></img>
        <div onClick={()=>props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
            <Favourites/>
            <RemoveFavourites/>
        </div>
    </div>)}
    </>
  )
}

export default Movielist;