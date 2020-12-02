import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import themes from '../themes';
import { DocumentNode, GraphQLError } from 'graphql';
import {
  NavigationContext,
  NavigationRouteContext,
} from '@react-navigation/native';

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

export const testProvider = (
  children: JSX.Element,
  mocks: Array<IMocks> = [],
  params?: object,
) => {
  const setParams = jest.fn(jest.fn());
  const navigate = jest.fn(jest.fn());
  const goBack = jest.fn(jest.fn);

  const mockNavContext: any = {
    isFocused: () => true,
    addListener: jest.fn(() => jest.fn()),
  };

  const renderUtils = render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={themes.light}>
        <NavigationContext.Provider
          value={{ setParams, navigate, goBack, ...mockNavContext }}
        >
          <NavigationRouteContext.Provider
            value={{ params, key: 'mocked_key', name: 'mocked_name' }}
          >
            {children}
          </NavigationRouteContext.Provider>
        </NavigationContext.Provider>
      </ThemeProvider>
    </MockedProvider>,
  );

  return {
    ...renderUtils,
    setParams,
    navigate,
    goBack,
  };
};

export * from '@testing-library/react-native';
export { testProvider as render };
