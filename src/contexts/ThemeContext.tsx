import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ITheme } from '@fluentui/react';

export type ThemeType = 'default' | 'dark' | 'teal';

interface ThemeContextType {
  currentTheme: ThemeType;
  theme: ITheme;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ITheme = createTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
});

const darkTheme: ITheme = createTheme({
  palette: {
    themePrimary: '#4a90e2',
    themeLighterAlt: '#020609',
    themeLighter: '#0a1825',
    themeLight: '#132d46',
    themeTertiary: '#265a8c',
    themeSecondary: '#3782cd',
    themeDarkAlt: '#5d9de5',
    themeDark: '#79aee9',
    themeDarker: '#a0c6ef',
    neutralLighterAlt: '#282828',
    neutralLighter: '#313131',
    neutralLight: '#3f3f3f',
    neutralQuaternaryAlt: '#484848',
    neutralQuaternary: '#4f4f4f',
    neutralTertiaryAlt: '#6d6d6d',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#1f1f1f',
  },
});

const tealTheme: ITheme = createTheme({
  palette: {
    themePrimary: '#008080',
    themeLighterAlt: '#f0f9f9',
    themeLighter: '#c7e7e7',
    themeLight: '#9ad3d3',
    themeTertiary: '#4da6a6',
    themeSecondary: '#1a8080',
    themeDarkAlt: '#007373',
    themeDark: '#006161',
    themeDarker: '#004747',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
});

const themes: Record<ThemeType, ITheme> = {
  default: defaultTheme,
  dark: darkTheme,
  teal: tealTheme,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (themeName: ThemeType) => {
    setCurrentTheme(themeName);
    localStorage.setItem('appTheme', themeName);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
