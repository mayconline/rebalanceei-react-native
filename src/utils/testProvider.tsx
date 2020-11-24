import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import themes from '../themes';
import { DocumentNode, GraphQLError } from 'graphql';
import { NavigationContext } from '@react-navigation/native';

interface IMocks {
  request: {
    query: DocumentNode;
    variables?: Object;
  };
  result: {
    data?: Object;
    errors?: GraphQLError[];
  };
}

const mockNavContext: any = {
  isFocused: () => true,
  addListener: jest.fn(() => jest.fn()),
};

export const testProvider = (
  children: JSX.Element,
  mocks: Array<IMocks> = [],
  isPrivate: boolean = false,
) => {
  const renderUtils = isPrivate
    ? render(
        <MockedProvider mocks={mocks}>
          <ThemeProvider theme={themes.light}>
            <NavigationContext.Provider value={mockNavContext}>
              {children}
            </NavigationContext.Provider>
          </ThemeProvider>
        </MockedProvider>,
      )
    : render(
        <MockedProvider mocks={mocks}>
          <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
        </MockedProvider>,
      );

  return { ...renderUtils };
};

export * from '@testing-library/react-native';
export { testProvider as render };
