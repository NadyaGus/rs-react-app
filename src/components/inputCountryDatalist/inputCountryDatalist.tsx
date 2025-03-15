import { useAppSelector } from '@/shared/store/store';
import { InputError } from '../inputError/InputError';

type InputCountryDatalistProps = {
  error?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const InputCountryDatalist = ({
  error,
  ...props
}: InputCountryDatalistProps) => {
  const countriesData = useAppSelector((state) => state.country.country);

  return (
    <>
      <label htmlFor="country">Country: </label>
      <input
        type="text"
        list="countryList"
        id="country"
        name="country"
        {...props}
      />
      <datalist id="countryList">
        {countriesData.map((country, i) => (
          <option key={i} value={country} label={country} />
        ))}
      </datalist>
      <InputError error={error} />
    </>
  );
};
