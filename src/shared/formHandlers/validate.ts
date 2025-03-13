import { number, object, string, ref, mixed } from 'yup';
import {
  allowImageFormat,
  countriesData,
  genderData,
  maxFileSize,
} from './formsData';

const requiredMessage = 'This field is required';

export const formSchema = object({
  name: string()
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only latin letters and spaces')
    .required(requiredMessage),
  age: number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number'),
  email: string().email('Invalid email').required(requiredMessage),
  password: string().required(requiredMessage),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required(requiredMessage),
  gender: string().oneOf(genderData, 'Invalid gender'),
  terms: string().oneOf(['on'], 'You must accept the terms and conditions'),
  image: mixed()
    .test('noFile', 'No file selected', (value) => {
      if (!value || !(value instanceof File) || value.size === 0) return false;
      return true;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value || !(value instanceof FileList)) return true;
      if (value.length === 0) return true;
      return value[0].size <= maxFileSize;
    })
    .test('fileFormat', 'Invalid file format', (value) => {
      if (!value || !(value instanceof FileList)) return true;
      if (value.length === 0) return true;
      return allowImageFormat.includes(value[0].type.split('/')[1]);
    }),
  country: string()
    .oneOf(countriesData, 'Invalid country')
    .required(requiredMessage),
});
