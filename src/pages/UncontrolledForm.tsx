import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { formSchema } from '@/shared/formHandlers/validateSchemas';
import { ValidationError } from 'yup';
import { InputError } from '@/components/inputError/InputError';
import { genderData } from '@/shared/formHandlers/formsData';
import { useAppDispatch } from '@/shared/store/store';
import { addForm, handlePasswordValue } from '@/shared/store/createFormsSlice';
import { convertToBase64 } from '@/shared/formHandlers/convertToBase64';
import formStyles from './styles/form.module.css';
import { PasswordStrength } from '@/components/passwordStrength/PasswordStrength';
import { InputCountryDatalist } from '@/components/inputCountryDatalist/inputCountryDatalist';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const terms = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (!formData.has('terms')) {
      formData.set('terms', 'off');
    }

    const data = Object.fromEntries(formData);
    try {
      const validatedData = await formSchema.validate(data, {
        abortEarly: false,
      });
      setErrors({});
      return validatedData;
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((error: ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
        return null;
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const validatedData = await validateForm(event);
    if (validatedData) {
      if (validatedData.image instanceof File) {
        const fileBase64 = await convertToBase64(validatedData.image);
        dispatch(
          addForm({
            ...validatedData,
            image: fileBase64,
          })
        );
        navigate('/');
      }
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(handlePasswordValue(value));
  };

  useEffect(() => {
    return () => {
      dispatch(handlePasswordValue(''));
    };
  }, [dispatch]);

  return (
    <>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Uncontrolled Form</legend>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" name="name" />
            <InputError error={errors.name} />
          </label>

          <label htmlFor="age">
            Age:
            <input type="text" id="age" name="age" />
            <InputError error={errors.age} />
          </label>

          <label htmlFor="email">
            Email:
            <input type="text" id="email" name="email" />
            <InputError error={errors.email} />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              onChange={(event) => {
                handlePassword(event);
              }}
            />
            <PasswordStrength error={errors.password} />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <InputError error={errors.confirmPassword} />
          </label>

          <label htmlFor="gender">
            Gender:
            <select id="gender" name="gender">
              <option value="---">---</option>
              {genderData.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <InputError error={errors.gender} />
          </label>

          <label htmlFor="terms">
            <div className={formStyles.terms}>
              <input type="checkbox" id="terms" name="terms" ref={terms} />
              <span>I agree to the terms and conditions</span>
            </div>
            <InputError error={errors.terms} />
          </label>

          <label htmlFor="image">
            Image:
            <input type="file" id="image" name="image" accept="image/*" />
            <InputError error={errors.image} />
          </label>

          <InputCountryDatalist error={errors.country} />

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
