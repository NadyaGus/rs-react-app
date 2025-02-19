import { configureStore } from '@reduxjs/toolkit';
import { jikanApi } from '../api/createApi';
import { cardListSlice } from '../components/cardList/cardListSlice';

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    searchResults: cardListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
