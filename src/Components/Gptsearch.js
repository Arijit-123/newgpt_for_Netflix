import React from 'react'
import Gptsearchbar from './Gptsearchbar'
import { IMG_URL } from '../utils/constants'
import Gptmoviesuggestions from './Gptmoviesuggestions'

function Gptsearch() {
  return (
    <>
   
    <div className='fixed -z-10'>
    <img className=' object-cover w-screen h-screen ' src={IMG_URL}></img>
    
</div>
 <div className='pt-[20%] md:pt-[10%]'>
      <Gptsearchbar/>
   <Gptmoviesuggestions/>
   </div>
    </>
  )
}

export default Gptsearch
