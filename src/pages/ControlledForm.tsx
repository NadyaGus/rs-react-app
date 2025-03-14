import { formSchema } from '@/shared/formHandlers/validateSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import formStyles from './styles/form.module.css';
import { InputError } from '@/components/inputError/InputError';
import { countriesData, genderData } from '@/shared/formHandlers/formsData';
import { FormType } from '@/shared/types/form';
import { convertToBase64 } from '@/shared/formHandlers/convertToBase64';
import { useAppDispatch } from '@/shared/store/store';
import { addForm, handlePasswordValue } from '@/shared/store/createFormsSlice';
import { PasswordStrength } from '@/components/passwordInput/passwordStrength';
import { useEffect } from 'react';

export const ControlledForm = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onChange',
    resolver: yupResolver(formSchema, { abortEarly: false, recursive: true }),
  });

  const handleSubmitForm = async (validatedData: FormType) => {
    if (validatedData) {
      if (validatedData.image instanceof File) {
        const fileBase64 = await convertToBase64(validatedData.image);
        dispatch(
          addForm({
            ...validatedData,
            image: fileBase64,
          })
        );
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
      <form
        className={formStyles.form}
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
      >
        <fieldset>
          <legend>Controlled Form</legend>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" {...register('name')} />
            <InputError error={errors.name?.message} />
          </label>

          <label htmlFor="age">
            Age:
            <input type="number" id="age" {...register('age')} />
            <InputError error={errors.age?.message} />
          </label>

          <label htmlFor="email">
            Email:
            <input type="text" id="email" {...register('email')} />
            <InputError error={errors.email?.message} />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              {...register('password')}
              onChange={(event) => {
                handlePassword(event);
              }}
            />
            <PasswordStrength error={errors.password?.message} />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            <InputError error={errors.confirmPassword?.message} />
          </label>

          <label htmlFor="gender">
            Gender:
            <select id="gender" {...register('gender')}>
              <option value="---">---</option>
              {genderData.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <InputError error={errors.gender?.message} />
          </label>

          <label htmlFor="terms">
            <div className={formStyles.terms}>
              <input type="checkbox" id="terms" {...register('terms')} />
              <span>I agree to the terms and conditions</span>
            </div>
            <InputError error={errors.terms?.message} />
          </label>

          <label htmlFor="image">
            Image:
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image')}
            />
            <InputError error={errors.image?.message} />
          </label>

          {/*TODO: add autocomplete */}
          <label htmlFor="country">
            Country:
            <select id="country" {...register('country')}>
              <option value="---">---</option>
              {countriesData.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <InputError error={errors.country?.message} />
          </label>

          {/* TODO: add disabled for button by TR*/}
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      <Link to="/">Go Home</Link>
    </>
  );
};
