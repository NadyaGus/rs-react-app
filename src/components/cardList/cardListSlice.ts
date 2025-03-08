import { createSlice } from '@reduxjs/toolkit';
import { CardProps } from '../../types/cardTypes';

export interface CardListSlice {
  cardList: CardProps[];
  isLoading: boolean;
}

const initialState: CardListSlice = {
  cardList: [],
  isLoading: false,
};

const cardListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    setCardList(state, action) {
      state.cardList = action.payload;
    },
  },
});

export const { setCardList } = cardListSlice.actions;
export { cardListSlice };
export type CardListState = ReturnType<typeof cardListSlice.reducer>;
