import { InferType } from 'yup';
import { formSchema } from '../formHandlers/validateSchemas';
import { createSlice } from '@reduxjs/toolkit';

type FormItem = InferType<typeof formSchema>;

export const createFormListSlice = createSlice({
  name: 'forms',
  initialState: {
    form: Array<FormItem>(),
  },
  reducers: {
    addForm: (state, action) => {
      state.form.push(action.payload);
    },
  },
});

export const { addForm } = createFormListSlice.actions;
