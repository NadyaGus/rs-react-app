import { number, object, string, mixed } from 'yup';
import {
  allowImageFormat,
  countriesData,
  genderData,
  maxFileSize,
} from './formsData';

const requiredMessage = 'This field is required';

export const formSchema = object({
  name: string()
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only latin letters and spaces')
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .required(requiredMessage),
  age: number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number'),
  email: string().email('Invalid email').required(requiredMessage),
  password: string().required(requiredMessage),
  confirmPassword: string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required(requiredMessage),
  gender: string().oneOf(genderData, 'Indicate your gender'),
  terms: string()
    .oneOf(['on', 'true'], 'You must accept the terms and conditions')
    .required(requiredMessage),
  image: mixed()
    .test('noFile', 'No file selected', (value) => {
      if (!value) return false;
      if (value instanceof File) {
        if (value.size === 0) return false;
      }
      if (value instanceof FileList) {
        if (value.length === 0) return false;
      }

      return true;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      // TODO: check file size validation
      if (!value) return false;
      if (value instanceof File) {
        return value.size <= maxFileSize;
      }
      if (value instanceof FileList) {
        if (value.length === 0) return false;
        return value[0].size <= maxFileSize;
      }
    })
    .test('fileFormat', 'Invalid file format', (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return allowImageFormat.includes(value.type.split('/')[1]);
      }
      if (value instanceof FileList) {
        if (value.length === 0) return false;
        return allowImageFormat.includes(value[0].type.split('/')[1]);
      }
    })
    .required(requiredMessage),
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
