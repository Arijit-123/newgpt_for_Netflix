import { createSlice } from "@reduxjs/toolkit";
const gptslice=createSlice({

    name:"gpt",
    initialState:{
        showgptsearch:false,
        movieResults:null,
        movieName:null
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showgptsearch=!state.showgptsearch;
        },

        addGptMovieResult:(state, action)=>{
            const {movieName, movieResults}=action.payload;
            state.movieResults=movieResults;
            state.movieName=movieName;
        }
    },
});

export const {toggleGptSearchView, addGptMovieResult} = gptslice.actions;
export default gptslice.reducer;