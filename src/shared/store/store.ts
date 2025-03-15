import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { createFormListSlice } from './createFormsSlice';
import { createCountrySlice } from './createCountrySlice';

export const store = configureStore({
  reducer: {
    forms: createFormListSlice.reducer,
    country: createCountrySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
