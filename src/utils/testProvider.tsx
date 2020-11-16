import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import themes from '../themes';

export const testProvider = (children: JSX.Element, mocks = []) => {
  const renderUtils = render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
    </MockedProvider>,
  );

  return { ...renderUtils };
};

export * from '@testing-library/react-native';
export { testProvider as render };
