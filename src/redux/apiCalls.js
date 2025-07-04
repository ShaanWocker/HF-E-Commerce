import { 
  loginFailure, 
  loginStart, 
  loginSuccess, 
  registerStart, 
  registerFailure, 
  registerSuccess, 
  logoutStart, 
  logoutSuccess, 
  logoutFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";


export const login = (user) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure());
        console.log(err);
    }
};

export const logout = () => async (dispatch) => {
    dispatch(logoutStart());
    try{
        const res = await publicRequest.post("/auth/logout");
        dispatch(logoutSuccess(res.data));
    }catch(err){
        dispatch(logoutFailure());
        console.log(err);
    }
};

export const register = (user) => async (dispatch) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post('/auth/register', user);
      dispatch(registerSuccess(res.data));
    } catch (err) {
      dispatch(registerFailure());
      console.log(err);
    }
};