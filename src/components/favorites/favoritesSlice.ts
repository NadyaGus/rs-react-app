import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps } from '../../shared/types/cardTypes';

export interface FavoritesState {
  favorites: CardProps[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<CardProps>) => {
      if (
        state.favorites.find((card) => card.mal_id === action.payload.mal_id)
      ) {
        state.favorites = state.favorites.filter(
          (card) => card.mal_id !== action.payload.mal_id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export { favoritesSlice };
