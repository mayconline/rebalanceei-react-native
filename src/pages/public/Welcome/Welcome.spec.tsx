import React from 'react';
import Welcome from './index';
import { render, fireEvent } from '../../../utils/testProvider';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Welcome Page', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText } = render(<Welcome />);

    getByText(/Seja Bem Vindo/i);
    getByText(/Rebalanceei/i);

    const button = await findByText(/Entrar/i);

    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('StepOne');
  });
});
