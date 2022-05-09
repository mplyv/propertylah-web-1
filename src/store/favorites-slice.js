import { createSlice } from "@reduxjs/toolkit";

const initialFavoritesState = {
  favIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoritesState,
  reducers: {
    addToFavorites(state, { payload }) {
      // add to array
      const { id } = payload;
      state.favIds.push(id);
    },
    removeFromFavorites(state, { payload }) {
      // remove from array
      const { id } = payload;
      state.favIds.push(id);
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;
