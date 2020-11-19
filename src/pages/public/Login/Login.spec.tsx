import React from 'react';
import Login, { LOGIN } from './index';
import { render, fireEvent, waitFor, act } from '../../../utils/testProvider';
import { GraphQLError } from 'graphql';

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();
const mockedHandleSignIn = jest.fn();

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

describe('Login Page', () => {
  it('should successfully login user', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
      getByA11yRole,
      findByA11yRole,
    } = render(<Login />, [INVALID_LOGIN_USER, SUCCESSFUL_LOGIN_USER]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Bem Vindo de Volta']);

    const submitButton = getByA11yRole('button');
    expect(submitButton).toHaveProperty('children', ['Entrar']);

    act(() => fireEvent.press(submitButton));

    getByText(/E-mail/i);
    const inputEmail = getByPlaceholderText(/meuemail@teste.com.br/i);
    fireEvent.changeText(inputEmail, 'test@test.com');
    getByDisplayValue('test@test.com');

    getByText(/Senha/i);
    const inputPassword = getByPlaceholderText('********');
    fireEvent.changeText(inputPassword, '1234');
    getByDisplayValue('1234');

    act(() => fireEvent.press(submitButton));
    await act(async () =>
      waitFor(() => getByText(/Usuário ou Senha não existe./i)),
    );

    fireEvent.changeText(inputPassword, '123');
    getByDisplayValue('123');

    await act(async () =>
      waitFor(() => {
        const loginButton = getByText('Entrar');
        fireEvent.press(loginButton);
      }),
    );

    expect(mockedHandleSignIn).toHaveBeenCalledWith({
      __typename: 'User',
      _id: 'id_logged',
      token: 'token_logged',
    });
  });

  it('should links work correctly', async () => {
    const { getByText, getByA11yRole } = render(<Login />);

    const signUpLink = getByText(/Ainda não possui uma conta\?/i);
    act(() => fireEvent.press(signUpLink));
    expect(mockedNavigate).toHaveBeenCalledWith('SignUp');

    const iconBackButton = getByA11yRole('imagebutton');
    expect(iconBackButton).toBeTruthy();
    act(() => fireEvent.press(iconBackButton));

    await waitFor(() => expect(mockedGoBack).toHaveBeenCalledTimes(1));
  });
});

const SUCCESSFUL_LOGIN_USER = {
  request: {
    query: LOGIN,
    variables: {
      email: 'test@test.com',
      password: '123',
    },
  },
  result: {
    data: {
      login: {
        _id: 'id_logged',
        token: 'token_logged',
        __typename: 'User',
      },
    },
  },
};

const INVALID_LOGIN_USER = {
  request: {
    query: LOGIN,
    variables: {
      email: 'test@test.com',
      password: '1234',
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Usuário ou Senha não existe.')],
  },
};
