import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  searchTerm: "",
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    addContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { addContacts , setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
