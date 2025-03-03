import { configureStore } from '@reduxjs/toolkit';
import { jikanApi } from '../../api/createApi';
import { favoritesSlice } from '../../components/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
    favorites: favoritesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
