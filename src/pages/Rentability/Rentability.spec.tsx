import React from 'react';
import Rentability, { GET_RENTABILITY } from './index';
import { GET_WALLET_BY_ID } from '../../components/AmountWallet';
import { act, render } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    wallet: '5fa1d752a8c5892a48c69b35',
  }),
}));

describe('Rentability Tab', () => {
  it('should successfully list rentability', async () => {
    const {
      findByA11yRole,
      getAllByA11yLabel,
      findByA11yLabel,
    } = render(<Rentability />, [
      SUCCESSFUL_GET_WALLET_BY_ID,
      SUCCESSFUL_LIST_RENTABILITY,
    ]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Variação da carteira']);

    const symbolItemOne = getAllByA11yLabel(/Código do Ativo/i)[0];
    expect(symbolItemOne).toHaveProperty('children', ['MGLU3']);

    const nameItemOne = getAllByA11yLabel(/Nome do Ativo/i)[0];
    expect(nameItemOne).toHaveProperty('children', [
      ' ',
      '- ',
      'Magazine Luiza S',
    ]);

    const costItemOne = getAllByA11yLabel(/Saldo aplicado no ativo/i)[0];
    expect(costItemOne).toHaveProperty('children', ['R$ 1371.20']);

    const variationPercentItemOne = getAllByA11yLabel(
      /Porcentagem de variação do ativo/i,
    )[0];
    expect(variationPercentItemOne).toHaveProperty('children', [' (+36.8%)']);
    expect(variationPercentItemOne.props.style[0].color).toBe('#75BF72');

    const currentAmountItemOne = getAllByA11yLabel(/Saldo atual do ativo/i)[0];
    expect(currentAmountItemOne).toHaveProperty('children', ['R$ 1876.00']);
    expect(currentAmountItemOne.props.style[0].color).toBe('#75BF72');

    await act(async () => {
      const walletCost = findByA11yLabel(/Saldo aplicado na carteira/i);
      expect((await walletCost).props.children).toBe('R$ 16900.63');
      expect((await walletCost).props.style[0].color).toBe('#0D1F3C');
    });

    await act(async () => {
      const walletCurrentAmount = findByA11yLabel(/Saldo atual da carteira/i);
      expect((await walletCurrentAmount).props.children).toBe('R$ 18816.10');
      expect((await walletCurrentAmount).props.style[0].color).toBe('#0D1F3C');
    });

    await act(async () => {
      const walletVariation = findByA11yLabel(
        /Percentual de variação da carteira/i,
      );
      expect((await walletVariation).props.children).toBe(' (+11.3%)');
      expect((await walletVariation).props.style[0].color).toBe('#75BF72');
    });

    const symbolItemTwo = getAllByA11yLabel(/Código do Ativo/i)[1];
    expect(symbolItemTwo).toHaveProperty('children', ['PSSA3']);

    const nameItemTwo = getAllByA11yLabel(/Nome do Ativo/i)[1];
    expect(nameItemTwo).toHaveProperty('children', [
      ' ',
      '- ',
      'Porto Seguro S',
    ]);

    const costItemTwo = getAllByA11yLabel(/Saldo aplicado no ativo/i)[1];
    expect(costItemTwo).toHaveProperty('children', ['R$ 1158.30']);

    const variationPercentItemTwo = getAllByA11yLabel(
      /Porcentagem de variação do ativo/i,
    )[1];
    expect(variationPercentItemTwo).toHaveProperty('children', [' (-11.9%)']);
    expect(variationPercentItemTwo.props.style[0].color).toBe('#f44336');

    const currentAmountItemTwo = getAllByA11yLabel(/Saldo atual do ativo/i)[1];
    expect(currentAmountItemTwo).toHaveProperty('children', ['R$ 1019.92']);
    expect(currentAmountItemTwo.props.style[0].color).toBe('#f44336');
  });

  it('should throw error', async () => {
    const { findByText } = render(<Rentability />, [INVALID_LIST_RENTABILITY]);

    await findByText(/Sem conexão com o banco de dados./i);
  });
});

const SUCCESSFUL_GET_WALLET_BY_ID = {
  request: {
    query: GET_WALLET_BY_ID,
    variables: { _id: '5fa1d752a8c5892a48c69b35' },
  },
  result: {
    data: {
      getWalletById: {
        __typename: 'Wallet',
        _id: '5fa1d752a8c5892a48c69b35',
        percentRentabilityWallet: 11.34117485561191,
        sumAmountWallet: 18816.1,
        sumCostWallet: 16900.629999999997,
      },
    },
  },
};

const SUCCESSFUL_LIST_RENTABILITY = {
  request: {
    query: GET_RENTABILITY,
    variables: { walletID: '5fa1d752a8c5892a48c69b35', sort: 'currentAmount' },
  },
  result: {
    data: {
      getRentability: [
        {
          __typename: 'Rentability',
          _id: '5fa47a89f704ca0f84523c05',
          costAmount: 1371.2,
          currentAmount: 1876,
          longName: 'Magazine Luiza S.A.',
          sumAmountWallet: 18824.290000000008,
          sumCostWallet: 16900.629999999997,
          symbol: 'MGLU3.SA',
          variationAmount: 504.79999999999995,
          variationPercent: 36.81446907817969,
        },
        {
          __typename: 'Rentability',
          _id: '5fa479f7f704ca0f84523c01',
          costAmount: 1158.3,
          currentAmount: 1019.92,
          longName: 'Porto Seguro S.A.',
          sumAmountWallet: 18824.290000000008,
          sumCostWallet: 16900.629999999997,
          symbol: 'PSSA3.SA',
          variationAmount: -138.38,
          variationPercent: -11.94681861348528,
        },
      ],
    },
  },
};

const INVALID_LIST_RENTABILITY = {
  request: {
    query: GET_RENTABILITY,
    variables: { walletID: '5fa1d752a8c5892a48c69b35', sort: 'currentAmount' },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};
