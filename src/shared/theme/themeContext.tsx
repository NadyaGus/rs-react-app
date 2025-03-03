'use client';

import { ReactNode, useState } from 'react';
import { ThemeContext, ThemeContextType } from './theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={'App' + ' ' + theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
