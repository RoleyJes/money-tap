import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = customerSlice.actions;

export default customerSlice.reducer;
