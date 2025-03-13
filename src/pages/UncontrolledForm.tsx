import { useRef } from 'react';
import { Link } from 'react-router';

import formStyles from './form.module.css';

export const UncontrolledForm = () => {
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLSelectElement>(null);
  const terms = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLSelectElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      name: name.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      gender: gender.current?.value,
      terms: terms.current?.checked,
      image: image.current?.files,
      country: country.current?.value,
    });
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>

      <form className={formStyles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" name="name" ref={name} />
        </label>

        <label htmlFor="age">
          Age:
          <input type="number" id="age" name="age" ref={age} />
        </label>

        <label htmlFor="email">
          Email:
          <input type="email" id="email" name="email" ref={email} />
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" id="password" name="password" ref={password} />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            ref={confirmPassword}
          />
        </label>

        <label htmlFor="gender">
          Gender:
          <select id="gender" name="gender" ref={gender} defaultValue="-">
            <option value="---">---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label htmlFor="terms">
          <div className={formStyles.terms}>
            <input type="checkbox" id="terms" name="terms" ref={terms} />
            <span>I agree to the terms and conditions</span>
          </div>
        </label>

        <label htmlFor="image">
          Image:
          <input type="file" id="image" name="image" ref={image} />
        </label>

        <label htmlFor="country">
          Country:
          <select
            id="country"
            name="country"
            ref={country}
            autoComplete="country"
          >
            <option value="blr">Belarus</option>
            <option value="rus">Russian Federation</option>
            <option value="pol">Poland</option>
            <option value="ukr">Ukraine</option>
            <option value="geo">Georgia</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link to="/">Go Home</Link>
    </>
  );
};
