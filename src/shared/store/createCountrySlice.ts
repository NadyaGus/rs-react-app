import { createSlice } from '@reduxjs/toolkit';
import { countriesData } from '../formHandlers/formsData';

export const createCountrySlice = createSlice({
  name: 'country',
  initialState: {
    country: countriesData,
  },
  reducers: {},
});
