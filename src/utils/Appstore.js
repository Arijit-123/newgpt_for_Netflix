import {configureStore} from "@reduxjs/toolkit" 
import userReducer from "./userslice";
import moviesReducer from "./movieSlice";
import gptReducer from "./Gptslice";
import configreducer from "./configSlice"
const appstore= configureStore({
reducer:{

    user:userReducer,
    movies:moviesReducer,
    gpt:gptReducer,
    config:configreducer
},

});

export default appstore;