import React from 'react';
import StepOne from './StepOne';
import { render, fireEvent } from '../../../utils/testProvider';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Onboarding StepOne', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText } = render(<StepOne />);

    const skipButton = await findByText(/Pular/i);

    fireEvent.press(skipButton);
    expect(mockedNavigate).toBeCalledWith('SignUp');

    getByText(/Bem vindo ao Rebalanceei/i);
    getByText(/Rebalanceeie seus ativos em sua carteira!/i);
    getByText(/É simples e fácil!/i);

    const nextButton = await findByText(/Próximo/i);

    fireEvent.press(nextButton);
    expect(mockedNavigate).toBeCalledWith('StepTwo');
  });
});
