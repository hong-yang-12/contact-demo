import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   contacts: [],
  openSidebar: true,
};

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    controlSidebar: (state, { payload }) => {
      state.openSidebar = payload;
    },
  },
});

export const { controlSidebar } = stateSlice.actions;
export default stateSlice.reducer;
