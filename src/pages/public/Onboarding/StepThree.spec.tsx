import React from 'react';
import StepThree from './StepThree';
import { render, fireEvent } from '../../../utils/testProvider';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Onboarding StepThree', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText } = render(<StepThree />);

    const skipButton = await findByText(/Pular/i);

    fireEvent.press(skipButton);
    expect(mockedNavigate).toBeCalledWith('SignUp');

    getByText(/Acompanhe de perto sua carteira/i);
    getByText(
      /Veja a variação de seus ativos e rebalanceeie eles como desejar!/i,
    );

    const nextButton = await findByText(/Vamos Começar/i);

    fireEvent.press(nextButton);
    expect(mockedNavigate).toBeCalledWith('SignUp');
  });
});
