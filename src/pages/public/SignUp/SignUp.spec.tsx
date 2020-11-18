import React from 'react';
import { Alert } from 'react-native';
import SignUp, { CREATE_USER } from './index';
import { render, fireEvent, waitFor, act } from '../../../utils/testProvider';
import * as Terms from '../../../utils/Terms';

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();
const mockedHandleSignIn = jest.fn();
const mockedAlert = (Alert.alert = jest.fn());
const mockedTerms = jest.spyOn(Terms, 'getTerms');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockedGoBack,
    navigate: mockedNavigate,
  }),
}));

jest.mock('../../../contexts/authContext', () => ({
  useAuth: () => ({
    handleSignIn: mockedHandleSignIn,
  }),
}));

describe('SignUp Page', () => {
  it('should successfully create user', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
      getByA11yRole,
      findByA11yRole,
    } = render(<SignUp />, [SUCCESSFUL_CREATE_USER]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Criar Conta']);

    const submitButton = getByA11yRole('button');
    expect(submitButton).toHaveProperty('children', ['Criar Conta']);

    fireEvent.press(submitButton);

    getByText(/E-mail/i);
    const inputEmail = getByPlaceholderText(/meuemail@teste.com.br/i);
    fireEvent.changeText(inputEmail, 'test@test.com');
    getByDisplayValue('test@test.com');

    getByText(/Senha/i);
    const inputPassword = getByPlaceholderText('********');
    fireEvent.changeText(inputPassword, '123');
    getByDisplayValue('123');

    getByText(/Aceito os Termos de Uso e Política de Privacidade/i);

    const switchTerms = getByA11yRole('switch');
    expect(switchTerms).toBeTruthy();

    fireEvent.press(submitButton);

    expect(mockedAlert).toHaveBeenCalledTimes(1);
    expect(mockedAlert.mock.calls[0][0]).toBe('Termos de Uso');
    expect(mockedAlert.mock.calls[0][1]).toBe(
      'É preciso aceitar os termos de uso para utilizar o app.',
    );

    act(() => mockedAlert.mock.calls[0][2][1].onPress());

    fireEvent.press(submitButton);

    await waitFor(() =>
      expect(mockedHandleSignIn).toHaveBeenCalledWith({
        __typename: 'createUser',
        id: 'id_created',
        token: 'token_created',
      }),
    );
  });

  it('should links work correctly', async () => {
    const { getByText, getByA11yRole, getByA11yLabel, findByTestId } = render(
      <SignUp />,
    );

    const termsLink = getByText(
      /Aceito os Termos de Uso e Política de Privacidade/i,
    );
    fireEvent.press(termsLink);
    expect(mockedTerms).toHaveBeenCalledTimes(1);

    const iconPasswordButton = getByA11yLabel('Ver Senha');
    await findByTestId('eye-with-line');
    fireEvent.press(iconPasswordButton);
    await findByTestId('eye');

    const loginLink = getByText(/Já possui uma conta\?/i);
    fireEvent.press(loginLink);
    expect(mockedNavigate).toHaveBeenCalledWith('Login');

    const iconBackButton = getByA11yRole('imagebutton');
    expect(iconBackButton).toBeTruthy();
    fireEvent.press(iconBackButton);
    await waitFor(() => expect(mockedGoBack).toHaveBeenCalledTimes(1));
  });
});

const SUCCESSFUL_CREATE_USER = {
  request: {
    query: CREATE_USER,
    variables: {
      email: 'test@test.com',
      password: '123',
      checkTerms: true,
    },
  },
  result: {
    data: {
      createUser: {
        id: 'id_created',
        token: 'token_created',
        __typename: 'createUser',
      },
    },
  },
};
