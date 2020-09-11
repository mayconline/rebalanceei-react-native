import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import {
  useFonts,
  TitilliumWeb_400Regular,
  TitilliumWeb_600SemiBold,
} from '@expo-google-fonts/titillium-web';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import themes, { themeMode, Theme } from './themes';
import { AuthProvider } from './contexts/authContext';

import Routes from './routes';

const App: React.FC = () => {
  const deviceTheme = useColorScheme() as themeMode;
  const theme: Theme = themes[deviceTheme] ?? themes.light;

  let [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style={'inverted'} />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
