import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  role: '',
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action){
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.role = action.payload.user.role;
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
