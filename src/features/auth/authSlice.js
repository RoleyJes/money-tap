import { createSlice } from "@reduxjs/toolkit";

export const storedUser = JSON.parse(localStorage.getItem("moneyTapUser"));

const initialState = {
  user: storedUser || null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    restoreSession(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, startLoading, stopLoading, restoreSession, logout } =
  authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   username: "",

// };

// const customerSlice = createSlice({
//   name: "customer",
//   initialState,
//   reducers: {
//     updateName(state, action) {
//       state.username = action.payload;
//     },
//   },
// });

// export const { updateName } = customerSlice.actions;

// export default customerSlice.reducer;
