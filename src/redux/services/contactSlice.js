import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  searchTerm: "",
  selectedImage: "",
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
    setSelectedImage: (state, { payload }) => {
      state.selectedImage = payload;
    },
  },
});

export const { addContacts, setSearchTerm, setSelectedImage } =
  contactSlice.actions;
export default contactSlice.reducer;
