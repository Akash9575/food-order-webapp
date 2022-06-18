import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
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
        console.log(state.isLoggedIn)
      }
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
