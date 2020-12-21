import React from 'react';
import WalletModal, { GET_WALLET_BY_USER } from './index';
import { render, fireEvent, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

const mockedOnClose = jest.fn();
const mockedHandleSetWallet = jest.fn();

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    handleSetWallet: mockedHandleSetWallet,
  }),
}));

describe('Wallet Modal', () => {
  beforeEach(() => {
    mockedOnClose.mockClear();
  });

  it('should successfully list wallet', async () => {
    const {
      findByA11yRole,
      getAllByA11yRole,
      getByA11yLabel,
      getAllByA11yLabel,
      getByText,
    } = render(<WalletModal onClose={mockedOnClose} />, [
      SUCCESSFUL_LIST_WALLET,
    ]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Carteiras']);

    const radioGroup = getAllByA11yRole('radio');
    expect(radioGroup).toHaveLength(2);

    const radioOptionOne = getByA11yLabel('Nova cart');
    const currentAmountOne = getAllByA11yLabel('Valor atual da carteira')[0];
    expect(currentAmountOne).toHaveProperty('children', ['R$ 5807.40']);

    const currentPercentOne = getAllByA11yLabel(
      'Percentual de valorização da carteira',
    )[0];
    expect(currentPercentOne).toHaveProperty('children', [' (+1.6%)']);

    const currentPercentAmountOne = getAllByA11yLabel(
      'Porcentagem atual do valor alocado na carteira',
    )[0];
    expect(currentPercentAmountOne).toHaveProperty('children', ['99%']);

    const radioOptionTwo = getByA11yLabel('MINHA CARTEIRA ADM');
    const currentAmountTwo = getAllByA11yLabel('Valor atual da carteira')[1];
    expect(currentAmountTwo).toHaveProperty('children', ['R$ 70.10']);

    const currentPercentTwo = getAllByA11yLabel(
      'Percentual de valorização da carteira',
    )[1];
    expect(currentPercentTwo).toHaveProperty('children', [' (+13.1%)']);

    const currentPercentAmounTwo = getAllByA11yLabel(
      'Porcentagem atual do valor alocado na carteira',
    )[1];
    expect(currentPercentAmounTwo).toHaveProperty('children', ['1%']);

    expect(radioOptionOne.props.accessibilityState.selected).toBeFalsy();
    expect(radioOptionTwo.props.accessibilityState.selected).toBeFalsy();

    const buttons = getAllByA11yRole('button');
    expect(buttons).toHaveLength(4);

    act(() => fireEvent.press(radioOptionOne));
    expect(mockedHandleSetWallet).toHaveBeenCalledWith(
      '5fa1d752a8c5892a48c69b35',
      'Nova cart',
    );
    expect(radioOptionOne.props.accessibilityState.selected).toBeTruthy();
    expect(radioOptionTwo.props.accessibilityState.selected).toBeFalsy();

    act(() => fireEvent.press(radioOptionTwo));
    expect(mockedHandleSetWallet).toHaveBeenCalledWith(
      '5faea26914131f13ecb37538',
      'MINHA CARTEIRA ADM',
    );
    expect(radioOptionOne.props.accessibilityState.selected).toBeFalsy();
    expect(radioOptionTwo.props.accessibilityState.selected).toBeTruthy();

    const editOptionOne = getByA11yLabel('Editar carteira Nova cart');
    act(() => fireEvent.press(editOptionOne));

    getByText('Alterar Carteira');
  });

  it('should buttons work correctly', async () => {
    const { getAllByA11yRole, getByText } = render(
      <WalletModal onClose={mockedOnClose} />,
      [EMPTY_LIST_WALLET],
    );

    const addButton = getAllByA11yRole('button')[1];
    expect(addButton).toHaveProperty('children', ['Adicionar Carteira']);

    act(() => fireEvent.press(addButton));
    getByText(/Criar Nova Carteira/i);

    const closeButton = getAllByA11yRole('button')[0];
    expect(closeButton).toHaveProperty('children', ['Fechar Modal']);

    act(() => fireEvent.press(closeButton));
    expect(mockedOnClose).toHaveBeenCalledTimes(1);
  });

  it('should throw error', async () => {
    const { findByText } = render(<WalletModal onClose={mockedOnClose} />, [
      INVALID_LIST_WALLET,
    ]);

    await findByText(/Sem conexão com o banco de dados./i);
  });
});

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

const INVALID_LIST_WALLET = {
  request: {
    query: GET_WALLET_BY_USER,
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};

const EMPTY_LIST_WALLET = {
  request: {
    query: GET_WALLET_BY_USER,
  },
  result: {
    data: {
      getWalletByUser: [],
    },
  },
};
