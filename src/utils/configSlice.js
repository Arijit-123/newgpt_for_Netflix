import {createSlice} from '@reduxjs/toolkit'
const configSlice=createSlice({
    name:"config",
    initialState:{
        lang:"en",

    },
    reducers:{
Changelanguage:(state, action)=>{
    state.lang=action.payload;

},

    },
})


export const {Changelanguage}=configSlice.actions
export default configSlice.reducer;
