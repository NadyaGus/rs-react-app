import { formSchema } from '@/shared/formHandlers/validateSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import formStyles from './styles/form.module.css';
import { InputError } from '@/components/inputError/InputError';
import { genderData } from '@/shared/formHandlers/formsData';
import { FormType } from '@/shared/types/form';
import { convertToBase64 } from '@/shared/formHandlers/convertToBase64';
import { useAppDispatch } from '@/shared/store/store';
import { addForm, handlePasswordValue } from '@/shared/store/createFormsSlice';
import { useEffect } from 'react';
import { PasswordStrength } from '@/components/passwordStrength/PasswordStrength';
import { InputCountryDatalist } from '@/components/inputCountryDatalist/inputCountryDatalist';

export const ControlledForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm<FormType>({
    mode: 'onChange',
    resolver: yupResolver(formSchema, { abortEarly: false, recursive: true }),
  });

  const handleSubmitForm = async (validatedData: FormType) => {
    if (validatedData) {
      if (validatedData.image instanceof FileList) {
        const fileBase64 = await convertToBase64(validatedData.image[0]);
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

  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    dispatch(handlePasswordValue(value));
    setTimeout(() => {
      trigger(['password', 'confirmPassword']);
    }, 0);
  };

  useEffect(() => {
    return () => {
      dispatch(handlePasswordValue(''));
    };
  }, [dispatch]);

  return (
    <>
      <form
        autoComplete="on"
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
            <input type="text" id="age" {...register('age')} />
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
              onInput={(event) => {
                handlePassword(event);
              }}
              {...register('password')}
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

          <InputCountryDatalist
            error={errors.country?.message}
            {...register('country')}
          />

          <button type="submit" disabled={Object.keys(errors).length > 0}>
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};
