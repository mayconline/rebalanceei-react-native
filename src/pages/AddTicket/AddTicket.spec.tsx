import React from 'react';
import AddTicket, { CREATE_TICKET } from './index';
import { UPDATE_TICKET, DELETE_TICKET } from '../../components/EditTicket';
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

  it('should successfully edit ticket', async () => {
    const {
      findByA11yRole,
      getAllByA11yRole,
      getByA11yLabel,
      getByDisplayValue,
      goBack,
      setParams,
    } = render(
      <AddTicket />,
      [SUCCESSFUL_EDIT_TICKET, SUCCESSFUL_LIST_TICKETS],
      MOCKED_PARAMS,
    );

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Alterar Ativo']);

    getByA11yLabel(/Ativo Selecionado/i);
    getByDisplayValue(/SAPR4/i);

    getByA11yLabel(/Dê uma Nota/i);
    const inputGrade = getByDisplayValue(/6/i);
    fireEvent.changeText(inputGrade, '10');
    expect(inputGrade.props.value).toBe('10');

    getByA11yLabel(/Dê uma Nota/i);
    const inputAveragePrice = getByDisplayValue('R$ 5.42');
    fireEvent.changeText(inputAveragePrice, '4,30');
    expect(inputAveragePrice.props.value).toBe('R$ 4.30');

    getByA11yLabel(/Quantidade/i);
    const inputQuantity = getByDisplayValue(/174/i);
    fireEvent.changeText(inputQuantity, '200');
    expect(inputQuantity.props.value).toBe('200');

    const submitButton = getAllByA11yRole('button')[1];
    expect(submitButton).toHaveProperty('children', ['Alterar']);

    await act(async () => fireEvent.press(submitButton));

    expect(setParams).toHaveBeenCalledWith({ ticket: null });
    expect(goBack).toBeCalledTimes(1);
  });

  it('should successfully delete ticket', async () => {
    const { findAllByA11yRole, goBack, setParams } = render(
      <AddTicket />,
      [SUCCESSFUL_DELETE_TICKET, SUCCESSFUL_LIST_TICKETS],
      MOCKED_PARAMS,
    );

    const submitButton = await findAllByA11yRole('button');
    expect(submitButton[0]).toHaveProperty('children', ['Deletar']);

    await act(async () => fireEvent.press(submitButton[0]));

    expect(setParams).toHaveBeenCalledWith({ ticket: null });
    expect(goBack).toBeCalledTimes(1);
  });

  it('should throw error on create ticket', async () => {
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
      getAllByA11yRole,
      getByText,
      getByPlaceholderText,
    } = render(<AddTicket />, [INVALID_CREATE_TICKET]);

    const suggestButton = getAllByA11yRole('button')[0];
    await act(async () => fireEvent.press(suggestButton));

    const inputSuggestions = getByPlaceholderText(/RBLC3/i);
    fireEvent.changeText(inputSuggestions, 'SAPR4');

    await waitFor(() => {
      const itemList = getAllByA11yRole('button')[2];
      act(() => fireEvent.press(itemList));
    });

    const inputGrade = getByPlaceholderText(/0 a 100/i);
    fireEvent.changeText(inputGrade, '6');

    const inputAveragePrice = getByPlaceholderText(/Preço Médio de Compra/i);
    fireEvent.changeText(inputAveragePrice, '5,42');

    const inputQuantity = getByPlaceholderText(/9999/i);
    fireEvent.changeText(inputQuantity, '174');

    const submitButton = getAllByA11yRole('button')[1];
    expect(submitButton).toHaveProperty('children', ['Adicionar']);

    await act(async () => fireEvent.press(submitButton));

    await act(async () => getByText(/Ativo já existe na carteira./i));
  });

  it('should throw error on edit ticket', async () => {
    const { getByText, findAllByA11yRole } = render(
      <AddTicket />,
      [INVALID_EDIT_TICKET],
      MOCKED_PARAMS,
    );

    const submitButton = await findAllByA11yRole('button');
    expect(submitButton[1]).toHaveProperty('children', ['Alterar']);

    await act(async () => fireEvent.press(submitButton[1]));

    await act(async () => getByText(/Sem conexão com o banco de dados./i));
  });

  it('should throw error on delete ticket', async () => {
    const { getByText, findAllByA11yRole } = render(
      <AddTicket />,
      [INVALID_DELETE_TICKET],
      MOCKED_PARAMS,
    );

    const submitButton = await findAllByA11yRole('button');
    expect(submitButton[0]).toHaveProperty('children', ['Deletar']);

    await act(async () => fireEvent.press(submitButton[0]));

    await act(async () => getByText(/Sem conexão com o banco de dados./i));
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

const SUCCESSFUL_EDIT_TICKET = {
  request: {
    query: UPDATE_TICKET,
    variables: {
      _id: '5fa479c9f704ca0f84523c00',
      symbol: 'SAPR4.SA',
      name: 'Companhia de Saneamento do Paraná - SANEPAR',
      quantity: 200,
      averagePrice: 4.3,
      grade: 10,
    },
  },
  result: {
    data: {
      createTicket: {
        __typename: 'Ticket',
        _id: '5fa479c9f704ca0f84523c00',
      },
    },
  },
};

const SUCCESSFUL_DELETE_TICKET = {
  request: {
    query: DELETE_TICKET,
    variables: {
      _id: '5fa479c9f704ca0f84523c00',
      walletID: '5fa1d752a8c5892a48c69b35',
    },
  },
  result: {
    data: {
      deleteTicket: true,
    },
  },
};

const INVALID_CREATE_TICKET = {
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
    data: undefined,
    errors: [new GraphQLError('Ativo já existe na carteira.')],
  },
};

const INVALID_EDIT_TICKET = {
  request: {
    query: UPDATE_TICKET,
    variables: {
      _id: '5fa479c9f704ca0f84523c00',
      averagePrice: 5.42,
      grade: 6,
      name: 'Companhia de Saneamento do Paraná - SANEPAR',
      quantity: 174,
      symbol: 'SAPR4.SA',
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};

const INVALID_DELETE_TICKET = {
  request: {
    query: DELETE_TICKET,
    variables: {
      _id: '5fa479c9f704ca0f84523c00',
      walletID: '5fa1d752a8c5892a48c69b35',
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};
