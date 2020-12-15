import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  TitilliumWeb_400Regular,
  TitilliumWeb_600SemiBold,
} from '@expo-google-fonts/titillium-web';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, AppRegistry } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import themes, { themeMode, Theme } from './themes';
import { AuthProvider } from './contexts/authContext';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo';

import Routes from './routes';

const App = () => {
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
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style={'inverted'} />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('Rebalanceei', () => App);

export default App;
