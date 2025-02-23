import { createContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const themeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export { themeContext };
export type { ThemeContextType };
