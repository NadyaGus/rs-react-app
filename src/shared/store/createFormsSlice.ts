import { FormType } from '@/shared/types/form';
import { createSlice } from '@reduxjs/toolkit';

export const createFormListSlice = createSlice({
  name: 'forms',
  initialState: {
    form: Array<FormType>(),
    password: '',
  },
  reducers: {
    addForm: (state, action) => {
      state.form.push(action.payload);
    },
    handlePasswordValue: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { addForm, handlePasswordValue } = createFormListSlice.actions;
