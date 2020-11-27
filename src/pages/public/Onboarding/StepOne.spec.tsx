import React from 'react';
import StepOne from './StepOne';
import { render, fireEvent } from '../../../utils/testProvider';

describe('Onboarding StepOne', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText, navigate } = render(<StepOne />);

    const skipButton = await findByText(/Pular/i);

    fireEvent.press(skipButton);
    expect(navigate).toBeCalledWith('SignUp');

    getByText(/Bem vindo ao Rebalanceei/i);
    getByText(/Rebalanceeie seus ativos em sua carteira!/i);
    getByText(/É simples e fácil!/i);

    const nextButton = await findByText(/Próximo/i);

    fireEvent.press(nextButton);
    expect(navigate).toBeCalledWith('StepTwo');
  });
});
