import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { contactApi } from "./api/contactApi";
import authSlice from "./services/authSlice";
import contactSlice from "./services/contactSlice";
import stateSlice from "./services/stateSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    authSlice: authSlice,
    contactSlice: contactSlice,
    stateSlice: stateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
});
