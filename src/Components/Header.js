import React,{useEffect} from 'react'
import { addUsers } from '../utils/userslice';
import { auth } from '../utils/firebase'
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { removeuser } from '../utils/userslice';
import { LOGO, SUPPORTED_LANGUAGES, USER } from '../utils/constants';
import { toggleGptSearchView } from '../utils/Gptslice';
import { Changelanguage } from '../utils/configSlice';

function Header() {


const dispatch=useDispatch();
  const navigate=useNavigate();
const user=useSelector((store)=>store.user);

console.log("users from header", user);
  function handlesignout(){

    
    signOut(auth).then(() => {
      // Sign-out successful.

      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
    
  }


  useEffect(() => {
 const unsubscribe=   onAuthStateChanged(auth,(user)=>{
      console.log("show user", user);
      if(user){
        const {uid,email,displayName,photoURL}=user;
        dispatch(addUsers({uid:uid,email:email,displayName:displayName, photoURL:photoURL}));
        navigate("/browse");
      }
      else{
  dispatch(removeuser());
  navigate("/");
      }
    })

    return()=>unsubscribe();
    }, [])

   function handlelanguageChange(e){
    dispatch(Changelanguage(e.target.value))
   }


    function handlegptsearchclick(){
dispatch(toggleGptSearchView());
    }


  return (
<div className='absolute w-screen bg-gradient-to-b from-black  z-30 flex flex-col justify-between md:bg-black  md:flex-row md:justify-between'>
      <img className='w-44 mx-auto md:mx-0' src={LOGO}></img>

<div className='mx-auto md:mx-0'>
      {user?
<div className='flex'>
<select className='bg-gray-500 text-white py-2 h-12 mt-4' onChange={handlelanguageChange}>
{SUPPORTED_LANGUAGES.map((lang)=>(
  <>
   
      <option value={lang.identifier}>
{lang.name}
      </option>
   
  </>
))}
</select>


<button className='bg-purple-800 text text-white flex ml-5 py-2 px-4 m-2 h-12 rounded-sm mt-4 mr-4' onClick={handlegptsearchclick}><img className='w-8 mr-2' src='https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg'></img>GPT Search</button>
      <img className='w-12 mt-4  h-12' src={USER}></img>


      <button className='ml-4 mr-2 font font-bold text text-white'  onClick={handlesignout}>Sign out</button>
      </div>:""
      }
      </div>
    </div>
  )
}

export default Header
