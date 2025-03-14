import { useCallback, useEffect, useState } from 'react';
import { passwordSchema } from '@/shared/formHandlers/validateSchemas';
import { ValidationError } from 'yup';
import clsx from 'clsx';
import styles from './password.module.css';
import { useAppSelector } from '@/shared/store/store';
import { InputError } from '../inputError/InputError';

export const PasswordStrength = ({ error }: { error?: string }) => {
  const [errors, setErrors] = useState<Record<string, string[]> | null>();
  const [isEmpty, setIsEmpty] = useState(true);
  const password = useAppSelector((state) => state.forms.password);

  const checkStrength = useCallback((password: string) => {
    if (password === '') {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }

    passwordSchema
      .validate({ password }, { abortEarly: false })
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
  }, []);

  useEffect(() => {
    checkStrength(password);
  }, [password, checkStrength]);

  return (
    <>
      <div
        className={clsx(
          styles.passwordStrength,
          !isEmpty && styles.passwordStrengthActive
        )}
      >
        <div
          className={clsx(
            styles.progress,
            errors?.password.length &&
              ' ' + styles[`length${errors.password.length}`]
          )}
        ></div>
      </div>
      <div className={styles.passwordText}>
        {isEmpty ? '' : errors?.password[0] || 'Password is strong'}
      </div>
      <InputError error={error} />
    </>
  );
};
