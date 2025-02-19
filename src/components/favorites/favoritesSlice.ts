import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: number[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (state.favorites.includes(action.payload)) return;
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export { favoritesSlice };
