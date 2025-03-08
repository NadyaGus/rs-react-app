import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';

const ButtonChangeTheme = () => {
  const theme = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        theme.setTheme(theme.theme === 'light' ? 'dark' : 'light');
      }}
    >
      Change theme
    </button>
  );
};

export { ButtonChangeTheme };
