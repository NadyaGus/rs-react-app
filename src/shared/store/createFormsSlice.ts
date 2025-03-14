import { FormType } from '@/shared/types/form';
import { createSlice } from '@reduxjs/toolkit';

export const createFormListSlice = createSlice({
  name: 'forms',
  initialState: {
    form: Array<FormType>(),
  },
  reducers: {
    addForm: (state, action) => {
      state.form.push(action.payload);
    },
  },
});

export const { addForm } = createFormListSlice.actions;
