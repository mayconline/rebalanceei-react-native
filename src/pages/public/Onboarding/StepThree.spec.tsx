import React from 'react';
import StepThree from './StepThree';
import { render, fireEvent } from '../../../utils/testProvider';

describe('Onboarding StepThree', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText, navigate } = render(<StepThree />);

    const skipButton = await findByText(/Pular/i);

    fireEvent.press(skipButton);
    expect(navigate).toBeCalledWith('SignUp');

    getByText(/Acompanhe de perto sua carteira/i);
    getByText(
      /Veja a variação de seus ativos e rebalanceeie eles como desejar!/i,
    );

    const nextButton = await findByText(/Vamos Começar/i);

    fireEvent.press(nextButton);
    expect(navigate).toBeCalledWith('SignUp');
  });
});
