import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import themes from '../themes';

interface IMocks {
  request: {
    query: any;
    variables?: Object;
  };
  result: {
    data: Object;
  };
}

export const testProvider = (
  children: JSX.Element,
  mocks: Array<IMocks> = [],
) => {
  const renderUtils = render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
    </MockedProvider>,
  );

  return { ...renderUtils };
};

export * from '@testing-library/react-native';
export { testProvider as render };
