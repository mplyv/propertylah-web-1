import { createSlice } from "@reduxjs/toolkit";

const initialFavoritesState = {
  favIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoritesState,
  reducers: {
    addToFavorites(state, { payload }) {
      if (state.favIds.includes(payload)) return;
      state.favIds.push(payload);
    },
    removeFromFavorites(state, { payload }) {
      if (!state.favIds.includes(payload)) return;
      state.favIds = state.favIds.filter((favId) => favId !== payload);
    },
    // for use with thunks
    saveFavorites(state, { payload }) {
      state.favIds = [...payload];
    },
    clearFavorites(state) {
      state.favIds = [];
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;
