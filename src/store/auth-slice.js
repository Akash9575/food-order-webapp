import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action){
      console.log(action)
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
    },
    getToken(state) {
      state.token = localStorage.getItem("token");
    },
    removeToken(state){
      state.token = localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    checkLogin(state) {
      if (state.token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
