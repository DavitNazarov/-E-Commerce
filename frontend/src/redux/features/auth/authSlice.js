import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientails: (store, action) => {
      store.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const exparation = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("exparation time", exparation);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setCredientails, logout } = authSlice.actions;
export default authSlice.reducer;
