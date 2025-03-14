import { useRef, useState } from 'react';
import { InputError } from '../inputError/InputError';
import { passwordSchema } from '@/shared/formHandlers/validateSchemas';
import { ValidationError } from 'yup';
import clsx from 'clsx';
import styles from './password.module.css';

type PasswordInputProps = {
  error?: string;
};

export const PasswordInput = ({ error }: PasswordInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>();
  const [isFirstTouch, setFirstTouch] = useState(true);

  const checkStrength = () => {
    setFirstTouch(false);
    console.log('checkStrength', ref.current?.value);
    passwordSchema
      .validate({ password: ref.current?.value }, { abortEarly: false })
      .then(() => {
        setErrors(null);
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          const validationErrors: Record<string, string[]> = {};
          error.inner.forEach((error: ValidationError) => {
            if (error.path) {
              if (!validationErrors[error.path]) {
                validationErrors[error.path] = [];
              }
              validationErrors[error.path].push(error.message);
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  return (
    <label
      className={clsx(
        styles.passwordContainer,
        !isFirstTouch && styles.passwordStrengthActive
      )}
      htmlFor="password"
    >
      Password
      <input
        type="password"
        name="password"
        id="password"
        ref={ref}
        onChange={() => checkStrength()}
      />
      {isFirstTouch && <InputError error={error} />}
      <div
        className={clsx(
          styles.passwordStrength,
          !isFirstTouch && styles.passwordStrengthActive
        )}
      >
        <div
          className={clsx(
            styles.progress,
            errors?.password.length &&
              ' ' + styles[`length${errors.password.length}`]
          )}
        ></div>
        <div className={styles.passwordText}>
          {errors?.password[0] || 'Password is strong'}
        </div>
      </div>
    </label>
  );
};
