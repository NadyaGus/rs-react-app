'use client';
import { useContext } from 'react';
import { ThemeContext } from '../../shared/theme/theme';

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
