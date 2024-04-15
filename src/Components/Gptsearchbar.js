import React, { useRef } from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import lang from './Languageconstant'
import OpenAI from 'openai';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/Gptslice';

function Gptsearchbar() {
const searchtext=useRef(null)

console.log("searchtext", searchtext);

const dispatch=useDispatch();
const searchMovieTMDB= async(movie)=>{
const data= await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);

const json= await data.json();

return json.results
}

  const onclickgptsearchclick=async()=>{
console.log("results", searchtext.current.value);
const gptQuery="Act as a movie recommendation system and suggest some movies for the query" + searchtext.current.value+".Only give 5 recommendation for the movies, make it comma separated like the example result given ahead Example: Gadar, Sholay, Herapheri, Golmal, Kashmir Files."



  const gptResults = await openai.chat.completions.create({
    messages: [{ role: 'user', content: gptQuery }],
    model: 'gpt-3.5-turbo',
  });

  if(!gptResults.choices){
//write error
  }
  const gptmovies=gptResults?.choices?.[0]?.message.content.split(",");
console.log("newgetmovies", gptmovies);


const newdata=gptmovies.map((movie)=>searchMovieTMDB(movie));

const TMDBResult= await Promise.all(newdata);

console.log("TMDBresults", TMDBResult);

dispatch(addGptMovieResult({movieName:gptmovies, movieResults:TMDBResult}));
  }




  const langkey=useSelector((store)=>store.config.lang) 
  return (
    <div>
      <div className='pt-[10%] flex justify-center'>
     {/* Gpt search bar 
     Gpt movie suggestions */}
     
     <form onSubmit={(e)=>e.preventDefault()} className='w-full mt-28 bg-black grid grid-cols-12 md:w-1/2 md:mt-0'>
      <input ref={searchtext} type='text' className='  p-4 m-4 col-span-9' placeholder={lang[langkey].getSearchplaceholder}/> 
      <button className='py-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={onclickgptsearchclick}>{lang[langkey].search}</button>
     </form>
    </div>
    </div>
  )
}

export default Gptsearchbar



