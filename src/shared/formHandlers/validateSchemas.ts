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
    .required(requiredMessage)
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().oneOf(genderData, 'Indicate your gender'),
  terms: string().oneOf(['on'], 'You must accept the terms and conditions'),
  image: mixed()
    .test('noFile', 'No file selected', (value) => {
      if (!value || !(value instanceof File) || value.size === 0) return false;
      return true;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      // TODO: check file size validation
      if (!value || !(value instanceof File)) return false;
      if (value.size === 0) return false;
      return value.size <= maxFileSize;
    })
    .test('fileFormat', 'Invalid file format', (value) => {
      if (!value || !(value instanceof File)) return false;
      if (value.size === 0) return false;
      return allowImageFormat.includes(value.type.split('/')[1]);
    }),
  country: string()
    .oneOf(countriesData, 'Invalid country')
    .required(requiredMessage),
});

export const passwordSchema = object({
  password: string()
    .matches(/[\d]/, "Password don't contain any number")
    .matches(/[A-Z]/, "Password don't contain at least one uppercase letter")
    .matches(/[a-z]/, "Password don't contain at least one lowercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password don't contain at least one special character"
    ),
});
