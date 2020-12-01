import React from 'react';
import Ticket, { GET_TICKETS_BY_WALLET } from './index';
import { render, fireEvent, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    wallet: '5fa1d752a8c5892a48c69b35',
  }),
}));

describe('Ticket Tab', () => {
  it('should successfully list tickets', async () => {
    const {
      findByA11yRole,
      getAllByA11yRole,
      getAllByA11yLabel,
      setParams,
      navigate,
    } = render(<Ticket />, [SUCCESSFUL_LIST_TICKETS]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Meus Ativos']);

    const listItems = getAllByA11yRole('button');
    expect(listItems).toHaveLength(5);

    const symbolItemOne = getAllByA11yLabel(/Código do Ativo/i)[0];
    expect(symbolItemOne).toHaveProperty('children', ['SAPR4']);

    const nameItemOne = getAllByA11yLabel(/Nome do Ativo/i)[0];
    expect(nameItemOne).toHaveProperty('children', [
      ' ',
      '- ',
      'Companhia de Saneamento do Paraná - SANEPAR',
    ]);

    const quantityItemOne = getAllByA11yLabel(
      /Quantidade e Preço Médio do Ativo/i,
    )[0];
    expect(quantityItemOne).toHaveProperty('children', [
      '174',
      'x ',
      'R$ 5.42',
    ]);

    const gradeItemOne = getAllByA11yLabel(
      /Nota para o peso do ativo esperado pela carteira/i,
    )[0];
    expect(gradeItemOne).toHaveProperty('children', ['6']);

    act(() => fireEvent.press(listItems[0]));
    expect(setParams).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('AddTicket', {
      ticket: {
        __typename: 'Ticket',
        _id: '5fa479c9f704ca0f84523c00',
        averagePrice: 5.42,
        grade: 6,
        name: 'Companhia de Saneamento do Paraná - SANEPAR',
        quantity: 174,
        symbol: 'SAPR4.SA',
      },
    });
  });

  it('should render empty component', async () => {
    const { findByA11yRole, getByA11yRole, navigate } = render(<Ticket />, [
      EMPTY_LIST_TICKETS,
    ]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', [
      'Adicione um ativo dando uma nota para ele.',
    ]);

    const subTitle = getByA11yRole('text');
    expect(subTitle).toHaveProperty('children', [
      'Usaremos essa nota para calcular a % ideal desse ativo nessa carteira.',
    ]);

    const addButton = getByA11yRole('button');
    expect(addButton).toHaveProperty('children', ['Adicionar Ativo']);

    act(() => fireEvent.press(addButton));

    expect(navigate).toHaveBeenCalledWith('AddTicket');
  });

  it('should throw error', async () => {
    const { findByText } = render(<Ticket />, [INVALID_LIST_TICKETS]);

    await findByText(/Sem conexão com o banco de dados./i);
  });
});

const SUCCESSFUL_LIST_TICKETS = {
  request: {
    query: GET_TICKETS_BY_WALLET,
    variables: { walletID: '5fa1d752a8c5892a48c69b35', sort: 'grade' },
  },
  result: {
    data: {
      getTicketsByWallet: [
        {
          __typename: 'Ticket',
          _id: '5fa479c9f704ca0f84523c00',
          averagePrice: 5.42,
          grade: 6,
          name: 'Companhia de Saneamento do Paraná - SANEPAR',
          quantity: 174,
          symbol: 'SAPR4.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa479f7f704ca0f84523c01',
          averagePrice: 54.76,
          grade: 6,
          name: 'Porto Seguro S.A.',
          quantity: 14,
          symbol: 'PSSA3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47a1ff704ca0f84523c02',
          averagePrice: 11.36,
          grade: 6,
          name: 'Itausa Investimentos ITAU SA',
          quantity: 78,
          symbol: 'ITSA4.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47a4bf704ca0f84523c03',
          averagePrice: 42.44,
          grade: 6,
          name: 'Engie Brasil Energia S.A.',
          quantity: 19,
          symbol: 'EGIE3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47a6df704ca0f84523c04',
          averagePrice: 19.98,
          grade: 6,
          name:
            'CTEEP - Companhia de Transmissão de Energia Elétrica Paulista S.A.',
          quantity: 45,
          symbol: 'TRPL4.SA',
        },
      ],
    },
  },
};

const INVALID_LIST_TICKETS = {
  request: {
    query: GET_TICKETS_BY_WALLET,
    variables: { walletID: '5fa1d752a8c5892a48c69b35', sort: 'grade' },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};

const EMPTY_LIST_TICKETS = {
  request: {
    query: GET_TICKETS_BY_WALLET,
    variables: { walletID: '5fa1d752a8c5892a48c69b35', sort: 'grade' },
  },
  result: {
    data: {
      getWalletByUser: [],
    },
  },
};
