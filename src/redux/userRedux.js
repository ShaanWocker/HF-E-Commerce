import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
         currentUser: null,
         isFetching: false,
         error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching  = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logoutStart:(state)=>{
          state.isFetching=true;
        },
        logoutSuccess:(state)=>{
            state.isFetching=false;
            state.currentUser = null;        
        },
        logoutFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.error = false;
          },
          registerSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
          },
          registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },
    },
})

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logoutStart, logoutSuccess, logoutFailure } = userSlice.actions;
export default userSlice.reducer;
