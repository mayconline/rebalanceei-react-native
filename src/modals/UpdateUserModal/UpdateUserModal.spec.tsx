import React from 'react';
import { Alert } from 'react-native';
import UpdateUserModal, { UPDATE_USER, GET_USER_BY_TOKEN } from './index';
import { render, fireEvent, waitFor, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

const mockedOnClose = jest.fn();
const mockedHandleSignOut = jest.fn();
const mockedAlert = (Alert.alert = jest.fn());

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    handleSignOut: mockedHandleSignOut,
  }),
}));

describe('Update User Modal', () => {
  it('should successfully update user', async () => {
    const {
      findByA11yRole,
      getAllByA11yRole,
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
    } = render(<UpdateUserModal onClose={mockedOnClose} />, [
      SUCCESSFUL_GET_USER_BY_TOKEN,
      SUCCESSFUL_UPDATE_USER,
      SUCCESSFUL_GET_USER_BY_TOKEN,
    ]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Alterar Usuário']);

    getByText(/E-mail/i);
    const inputEmail = getByPlaceholderText(/meuemail@teste.com.br/i);
    expect(inputEmail.props.defaultValue).toBe('test@test.com');

    fireEvent.changeText(inputEmail, 'testeupdate@teste.com');
    getByDisplayValue('testeupdate@teste.com');

    getByText(/Senha/i);
    const inputPassword = getByPlaceholderText('Caso queira alterar');
    fireEvent.changeText(inputPassword, '1234');
    getByDisplayValue('1234');

    const submitButton = getAllByA11yRole('button')[1];
    expect(submitButton).toHaveProperty('children', ['Alterar']);

    await act(async () => fireEvent.press(submitButton));

    await waitFor(() => expect(mockedOnClose).toHaveBeenCalledTimes(1));
  });

  it('should successfully disabled user', async () => {
    const { findAllByA11yRole } = render(
      <UpdateUserModal onClose={mockedOnClose} />,
      [
        SUCCESSFUL_GET_USER_BY_TOKEN,
        SUCCESSFUL_DISABLED_USER,
        SUCCESSFUL_GET_USER_BY_TOKEN,
      ],
    );

    const disabledButton = await findAllByA11yRole('button');
    expect(disabledButton[0]).toHaveProperty('children', ['Desativar']);

    await act(async () => fireEvent.press(disabledButton[0]));

    expect(mockedAlert).toHaveBeenCalledTimes(1);
    expect(mockedAlert.mock.calls[0][0]).toBe('Desativar Conta');
    expect(mockedAlert.mock.calls[0][1]).toBe(
      'Se você continuar, sua conta será desativada e perderá o acesso a ela.',
    );

    await act(async () => mockedAlert.mock.calls[0][2][1].onPress());

    await waitFor(() => expect(mockedHandleSignOut).toHaveBeenCalledTimes(1));
  });

  it('should throw error when update user', async () => {
    const {
      findAllByA11yRole,
      getByText,
      getByPlaceholderText,
    } = render(<UpdateUserModal onClose={mockedOnClose} />, [
      SUCCESSFUL_GET_USER_BY_TOKEN,
      INVALID_UPDATE_USER,
    ]);

    const submitButton = await findAllByA11yRole('button');

    const inputEmail = getByPlaceholderText(/meuemail@teste.com.br/i);
    fireEvent.changeText(inputEmail, 'testeupdate@teste.com');

    await act(async () => fireEvent.press(submitButton[1]));

    await act(async () =>
      waitFor(() => getByText(/Sem conexão com o banco de dados./i)),
    );
  });

  it('should throw error when get user by token', async () => {
    const { getByText } = render(<UpdateUserModal onClose={mockedOnClose} />, [
      INVALID_GET_USER_BY_TOKEN,
    ]);

    await act(async () =>
      waitFor(() => getByText(/Sem conexão com o banco de dados./i)),
    );
  });
});

const SUCCESSFUL_UPDATE_USER = {
  request: {
    query: UPDATE_USER,
    variables: {
      email: 'testeupdate@teste.com',
      password: '1234',
    },
  },
  result: {
    data: {
      updateUser: {
        _id: '5fa1d103a8c5892a48c69b31',
        email: 'testeupdate@teste.com',
        active: true,
        checkTerms: true,
        __typename: 'User',
      },
    },
  },
};

const SUCCESSFUL_GET_USER_BY_TOKEN = {
  request: {
    query: GET_USER_BY_TOKEN,
  },
  result: {
    data: {
      getUserByToken: {
        _id: '5fa1d103a8c5892a48c69b31',
        email: 'test@test.com',
        role: 'USER',
        checkTerms: true,
        active: true,
        __typename: 'User',
      },
    },
  },
};

const SUCCESSFUL_DISABLED_USER = {
  request: {
    query: UPDATE_USER,
    variables: {
      active: false,
    },
  },
  result: {
    data: {
      updateUser: {
        _id: '5fa1d103a8c5892a48c69b31',
        email: 'testeupdate@teste.com',
        active: false,
        checkTerms: true,
        __typename: 'User',
      },
    },
  },
};

const INVALID_UPDATE_USER = {
  request: {
    query: UPDATE_USER,
    variables: {
      email: 'testeupdate@teste.com',
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};

const INVALID_GET_USER_BY_TOKEN = {
  request: {
    query: GET_USER_BY_TOKEN,
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};
