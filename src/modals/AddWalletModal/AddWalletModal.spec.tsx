import React from 'react';
import AddWalletModal, { CREATE_WALLET } from './index';
import { DELETE_WALLET, UPDATE_WALLET } from '../../components/EditWallet';
import { render, fireEvent, waitFor, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';
import { GET_WALLET_BY_USER } from '../WalletModal';

const mockedhandleResetEditWallet = jest.fn();
const mockedbeforeModalClose = jest.fn();
const mockedOnClose = jest.fn();
const mockedHandleSetWallet = jest.fn();

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    handleSetWallet: mockedHandleSetWallet,
  }),
}));

describe('Add Wallet Modal', () => {
  beforeEach(() => {
    mockedHandleSetWallet.mockClear();
    mockedhandleResetEditWallet.mockClear();
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
      [SUCCESSFUL_CREATE_WALLET, SUCCESSFUL_LIST_WALLET],
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

  it('should successfully update wallet', async () => {
    const {
      findByA11yRole,
      getAllByA11yRole,
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
    } = render(
      <AddWalletModal
        beforeModalClose={mockedbeforeModalClose}
        onClose={mockedOnClose}
        handleResetEditWallet={mockedhandleResetEditWallet}
        walletData={{
          _id: 'id_wallet',
          description: 'My Wallet',
        }}
      />,
      [SUCCESSFUL_UPDATE_WALLET, SUCCESSFUL_LIST_WALLET],
    );

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Alterar Carteira']);

    getByText(/Nome da Carteira/i);
    const inputWallet = getByPlaceholderText(/Minha Nova Carteira/i);
    getByDisplayValue('My Wallet');

    fireEvent.changeText(inputWallet, 'My Edit Wallet');
    getByDisplayValue('My Edit Wallet');

    const submitButton = getAllByA11yRole('button')[1];
    expect(submitButton).toHaveProperty('children', ['Alterar']);

    act(() => fireEvent.press(submitButton));

    await waitFor(() =>
      expect(mockedhandleResetEditWallet).toHaveBeenCalledTimes(1),
    );
  });

  it('should successfully delete wallet', async () => {
    const { findAllByA11yRole } = render(
      <AddWalletModal
        beforeModalClose={mockedbeforeModalClose}
        onClose={mockedOnClose}
        handleResetEditWallet={mockedhandleResetEditWallet}
        walletData={{
          _id: 'id_wallet',
          description: 'My Wallet',
        }}
      />,
      [SUCCESSFUL_DELETE_WALLET, SUCCESSFUL_LIST_WALLET],
    );

    const submitButton = await findAllByA11yRole('button');
    expect(submitButton[0]).toHaveProperty('children', ['Deletar']);

    await act(async () => fireEvent.press(submitButton[0]));

    await waitFor(() =>
      expect(mockedhandleResetEditWallet).toHaveBeenCalledTimes(1),
    );
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

const SUCCESSFUL_UPDATE_WALLET = {
  request: {
    query: UPDATE_WALLET,
    variables: {
      _id: 'id_wallet',
      description: 'My Edit Wallet',
    },
  },
  result: {
    data: {
      updateWallet: {
        _id: 'id_wallet',
        description: 'My Edit Wallet',
        __typename: 'Wallet',
      },
    },
  },
};

const SUCCESSFUL_LIST_WALLET = {
  request: {
    query: GET_WALLET_BY_USER,
  },
  result: {
    data: {
      getWalletByUser: [
        {
          __typename: 'Wallet',
          _id: '5fa1d752a8c5892a48c69b35',
          description: 'Nova cart',
          percentPositionWallet: 98.80731603572947,
          percentRentabilityWallet: 1.59902029391182,
          sumAmountAllWallet: 5877.5,
          sumAmountWallet: 5807.4,
          sumCostWallet: 5716,
        },
        {
          __typename: 'Wallet',
          _id: '5faea26914131f13ecb37538',
          description: 'MINHA CARTEIRA ADM',
          percentPositionWallet: 1.192683964270523,
          percentRentabilityWallet: 13.06451612903225,
          sumAmountAllWallet: 5877.5,
          sumAmountWallet: 70.1,
          sumCostWallet: 62,
        },
      ],
    },
  },
};

const SUCCESSFUL_DELETE_WALLET = {
  request: {
    query: DELETE_WALLET,
    variables: {
      _id: 'id_wallet',
    },
  },
  result: {
    data: {
      deleteWallet: true,
    },
  },
};
