import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps } from '../../types/cardTypes';

interface FavoritesState {
  favorites: CardProps[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<CardProps>) => {
      if (state.favorites.includes(action.payload)) return;
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<CardProps>) => {
      state.favorites = state.favorites.filter(
        (card) => card.mal_id !== action.payload.mal_id
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export { favoritesSlice };
