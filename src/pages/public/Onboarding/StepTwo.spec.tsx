import React from 'react';
import StepTwo from './StepTwo';
import { render, fireEvent } from '../../../utils/testProvider';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Onboarding StepTwo', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText } = render(<StepTwo />);

    const skipButton = await findByText(/Pular/i);

    fireEvent.press(skipButton);
    expect(mockedNavigate).toBeCalledWith('SignUp');

    getByText(/Adicione seus ativos e dê notas a eles/i);
    getByText(
      /Usamos elas para verificar a % ideal de cada ativo baseado em suas preferências!/i,
    );

    const nextButton = await findByText(/Próximo/i);

    fireEvent.press(nextButton);
    expect(mockedNavigate).toBeCalledWith('StepThree');
  });
});
