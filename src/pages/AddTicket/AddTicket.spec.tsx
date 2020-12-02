import React from 'react';
import AddTicket, { CREATE_TICKET } from './index';
import { GET_TICKETS_BY_WALLET } from '../Ticket';
import { render, fireEvent, act, waitFor } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

jest.mock('../../contexts/authContext', () => ({
  useAuth: () => ({
    wallet: '5fa1d752a8c5892a48c69b35',
  }),
}));

describe('AddTicket Tab', () => {
  it('should successfully create ticket', async () => {
    apiMock.onGet('/autoc?').reply(200, {
      ResultSet: {
        Query: 'sapr4',
        Result: [
          {
            symbol: 'SAPR4.SA',
            name: 'Companhia de Saneamento do Paraná - SANEPAR',
            exch: 'SAO',
            type: 'S',
            exchDisp: 'São Paulo',
            typeDisp: 'Ação',
          },
        ],
      },
    });

    const {
      findByA11yRole,
      getAllByA11yRole,

      getByText,

      getByPlaceholderText,
      getByDisplayValue,

      debug,
    } = render(<AddTicket />, [
      SUCCESSFUL_CREATE_TICKET,
      SUCCESSFUL_LIST_TICKETS,
    ]);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Adicionar Ativo']);

    const submitButton = getAllByA11yRole('button')[1];
    expect(submitButton).toHaveProperty('children', ['Adicionar']);

    await act(async () => fireEvent.press(submitButton));

    const suggestButton = getAllByA11yRole('button')[0];
    expect(suggestButton).toHaveProperty('children', [
      'Busque e Selecione um Ativo',
    ]);

    getByText(/Ativo Selecionado/i);
    const inputSelectedTicket = getByPlaceholderText(
      /Nenhum ativo selecionado/i,
    );

    await act(async () => fireEvent.press(suggestButton));

    getByText(/Pesquise e Selecione um Ativo/i);
    const inputSuggestions = getByPlaceholderText(/RBLC3/i);
    fireEvent.changeText(inputSuggestions, 'SAPR4');
    getByDisplayValue('SAPR4');

    await waitFor(() => {
      const itemList = getAllByA11yRole('button')[2];
      expect(itemList).toHaveProperty('children', [
        'SAPR4.SA',
        '- ',
        'Companhia de Saneamento do Paraná - SANEPAR',
      ]);

      act(() => fireEvent.press(itemList));
    });

    getByText(/Dê uma Nota/i);
    const inputGrade = getByPlaceholderText(/0 a 100/i);
    fireEvent.changeText(inputGrade, '6');
    getByDisplayValue('6');

    getByText(/Preço Médio/i);
    const inputAveragePrice = getByPlaceholderText(/Preço Médio de Compra/i);
    fireEvent.changeText(inputAveragePrice, '5,42');
    getByDisplayValue('R$ 5.42');

    getByText(/Quantidade/i);
    const inputQuantity = getByPlaceholderText(/9999/i);
    fireEvent.changeText(inputQuantity, '174');
    getByDisplayValue('174');

    expect(inputSelectedTicket.props.value).toBe('SAPR4');

    await act(async () => fireEvent.press(submitButton));
  });
});

const MOCKED_PARAMS = {
  ticket: {
    __typename: 'Ticket',
    _id: '5fa479c9f704ca0f84523c00',
    averagePrice: 5.42,
    grade: 6,
    name: 'Companhia de Saneamento do Paraná - SANEPAR',
    quantity: 174,
    symbol: 'SAPR4.SA',
  },
};

const SUCCESSFUL_CREATE_TICKET = {
  request: {
    query: CREATE_TICKET,
    variables: {
      walletID: '5fa1d752a8c5892a48c69b35',
      symbol: 'SAPR4.SA',
      name: 'Companhia de Saneamento do Paraná - SANEPAR',
      quantity: 174,
      averagePrice: 5.42,
      grade: 6,
    },
  },
  result: {
    data: {
      createTicket: {
        __typename: 'Ticket',
        _id: '5fa479c9f704ca0f84523c00',
        averagePrice: 5.42,
        grade: 6,
        name: 'Companhia de Saneamento do Paraná - SANEPAR',
        quantity: 174,
        symbol: 'SAPR4.SA',
      },
    },
  },
};

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
