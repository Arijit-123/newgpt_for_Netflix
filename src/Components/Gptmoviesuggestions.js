import React from 'react'
import {useSelector} from 'react-redux'
import Movielist from './Movielist';

function Gptmoviesuggestions() {

  const {movieResults, movieName}= useSelector((store)=>store.gpt);
  if(!movieName) return null;
  return (
    <div className='bg-black   text-white p-4 m-4 bg-opacity-70'>
    <div>
      {movieName.map((movie,index)=>(
        <>
        <Movielist key={movie} title={movie} movies={movieResults[index]}/>
        </>
      ))}

     
    </div>
      
      {movieName}
    </div>
  )
}

export default Gptmoviesuggestions
