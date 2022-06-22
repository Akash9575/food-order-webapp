import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user_id: 0,
  token: "",
  role: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    },
    getToken(state) {
      state.token = localStorage.getItem("token");
    },
    removeToken(state) {
      localStorage.clear();
      state.token = "";
      state.role = "";
    },
    checkLogin(state) {
      if (state.token) {
        const user_type = JSON.parse(localStorage.getItem("user"));
        state.role = user_type.role;
        state.user_id = user_type.id;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
