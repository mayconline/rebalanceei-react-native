import React from 'react';
import AddWalletModal, { CREATE_WALLET } from './index';
import { render, fireEvent, waitFor, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

const mockedHandleSetWallet = jest.fn();
const mockedbeforeModalClose = jest.fn();
const mockedOnClose = jest.fn();

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    handleSetWallet: mockedHandleSetWallet,
  }),
}));

describe('Add Wallet Modal', () => {
  beforeEach(() => {
    mockedHandleSetWallet.mockClear();
  });

  it('should successfully create wallet', async () => {
    const {
      findByA11yRole,
      getByA11yRole,
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
    } = render(
      <AddWalletModal
        beforeModalClose={mockedbeforeModalClose}
        onClose={mockedOnClose}
      />,
      [SUCCESSFUL_CREATE_WALLET],
    );

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Criar Nova Carteira']);

    const submitButton = getByA11yRole('button');
    expect(submitButton).toHaveProperty('children', ['Adicionar Carteira']);

    act(() => fireEvent.press(submitButton));

    getByText(/Nome da Carteira/i);
    const inputWallet = getByPlaceholderText(/Minha Nova Carteira/i);
    fireEvent.changeText(inputWallet, 'My New Wallet');
    getByDisplayValue('My New Wallet');

    act(() => fireEvent.press(submitButton));

    await waitFor(() =>
      expect(mockedHandleSetWallet).toHaveBeenCalledWith(
        'id_wallet',
        'My New Wallet',
      ),
    );
  });

  it('should not allow create wallet', async () => {
    const {
      getByA11yRole,
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
    } = render(
      <AddWalletModal
        beforeModalClose={mockedbeforeModalClose}
        onClose={mockedOnClose}
      />,
      [INVALID_CREATE_WALLET],
    );

    getByText(/Nome da Carteira/i);
    const inputWallet = getByPlaceholderText(/Minha Nova Carteira/i);
    fireEvent.changeText(inputWallet, 'My New Wallet 3');
    getByDisplayValue('My New Wallet 3');

    const submitButton = getByA11yRole('button');
    act(() => fireEvent.press(submitButton));

    await act(async () =>
      waitFor(() => getByText(/Wallets são limitadas a 2 quantidades./i)),
    );

    expect(mockedHandleSetWallet).not.toHaveBeenCalled();
  });

  it('should links work correctly', async () => {
    const { getByA11yRole } = render(
      <AddWalletModal
        beforeModalClose={mockedbeforeModalClose}
        onClose={mockedOnClose}
      />,
    );

    const iconBackButton = getByA11yRole('imagebutton');
    expect(iconBackButton).toBeTruthy();
    act(() => fireEvent.press(iconBackButton));

    await waitFor(() => expect(mockedOnClose).toHaveBeenCalledTimes(1));
  });
});

const SUCCESSFUL_CREATE_WALLET = {
  request: {
    query: CREATE_WALLET,
    variables: {
      description: 'My New Wallet',
    },
  },
  result: {
    data: {
      createWallet: {
        _id: 'id_wallet',
        description: 'My New Wallet',
        __typename: 'Wallet',
      },
    },
  },
};

const INVALID_CREATE_WALLET = {
  request: {
    query: CREATE_WALLET,
    variables: {
      description: 'My New Wallet 3',
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Wallets são limitadas a 2 quantidades.')],
  },
};
