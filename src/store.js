import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./slices/artworks";

const reducer = {
  artworks: artworksReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
