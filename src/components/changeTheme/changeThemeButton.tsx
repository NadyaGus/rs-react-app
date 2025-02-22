import { useContext } from 'react';
import { themeContext } from '../../utils/theme';

const ButtonChangeTheme = () => {
  const theme = useContext(themeContext);

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
