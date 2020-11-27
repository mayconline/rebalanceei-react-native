import React from 'react';
import Welcome from './index';
import { render, fireEvent } from '../../../utils/testProvider';

describe('Welcome Page', () => {
  it('should display correct page view', async () => {
    const { getByText, findByText, navigate } = render(<Welcome />);

    getByText(/Seja Bem Vindo/i);
    getByText(/Rebalanceei/i);

    const button = await findByText(/Entrar/i);

    fireEvent.press(button);
    expect(navigate).toBeCalledWith('StepOne');
  });
});
