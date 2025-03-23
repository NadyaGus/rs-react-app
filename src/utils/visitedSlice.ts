import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CountryData } from '../types/countryData';
import { getLocalStorageData, LS_KEY } from './getLocalStorageData';

interface VisitedSlice {
  data: CountryData[];
}

const initialState: VisitedSlice = {
  data: getLocalStorageData(),
};

export const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    toggleVisited: (state, action: PayloadAction<CountryData>) => {
      if (state.data.find((country) => country.cca3 === action.payload.cca3)) {
        state.data = state.data.filter(
          (country) => country.cca3 !== action.payload.cca3
        );
      } else {
        state.data.push(action.payload);
      }
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state.data));
      } catch (error) {
        console.error('Error saving visited data:', error);
      }
    },
  },
});

export const { toggleVisited } = visitedSlice.actions;
