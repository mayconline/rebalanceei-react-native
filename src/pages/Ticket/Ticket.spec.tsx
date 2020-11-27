import React from 'react';
import Ticket, { GET_TICKETS_BY_WALLET } from './index';
import { GET_WALLET_BY_USER } from '../../modals/WalletModal';
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
      getByA11yLabel,
      getAllByA11yLabel,
      findByText,
      getByText,
    } = render(<Ticket />, [SUCCESSFUL_LIST_TICKETS], true);

    const title = await findByA11yRole('header');
    expect(title).toHaveProperty('children', ['Meus Ativos']);

    getByText('SAPR4');
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
        {
          __typename: 'Ticket',
          _id: '5fa47a89f704ca0f84523c05',
          averagePrice: 17.14,
          grade: 5,
          name: 'Magazine Luiza S.A.',
          quantity: 80,
          symbol: 'MGLU3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47aa9f704ca0f84523c06',
          averagePrice: 38.2,
          grade: 5,
          name: 'Lojas Renner S.A.',
          quantity: 20,
          symbol: 'LREN3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47ad3f704ca0f84523c07',
          averagePrice: 24.43,
          grade: 5,
          name: 'Fleury S.A.',
          quantity: 40,
          symbol: 'FLRY3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47af9f704ca0f84523c08',
          averagePrice: 21.48,
          grade: 5,
          name: 'Weg SA',
          quantity: 15,
          symbol: 'WEGE3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47b18f704ca0f84523c09',
          averagePrice: 4.03,
          grade: 5,
          name: 'Klabin S.A.',
          quantity: 141,
          symbol: 'KLBN4.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa48238f704ca0f84523c15',
          averagePrice: 25.23,
          grade: 5,
          name: 'Raia Drogasil S.A.',
          quantity: 30,
          symbol: 'RADL3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47b37f704ca0f84523c0a',
          averagePrice: 135.2,
          grade: 4,
          name: 'Ggr Covipe Renda Fundo Investimento Imobiliario',
          quantity: 4,
          symbol: 'GGRC11.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47b5bf704ca0f84523c0b',
          averagePrice: 150.91,
          grade: 4,
          name: 'CSHG Real Estate - Fundo de Investimento Imobiliario - FII',
          quantity: 4,
          symbol: 'HGRE11.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47b95f704ca0f84523c0c',
          averagePrice: 103.57,
          grade: 4,
          name: 'Xp Malls Fundo Investimentos Imobiliarios',
          quantity: 6,
          symbol: 'XPML11.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47bbdf704ca0f84523c0d',
          averagePrice: 189.91,
          grade: 4,
          name: 'Cshg Logistica - Fundo De Investimento Imobiliario',
          quantity: 6,
          symbol: 'HGLG11.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47bf6f704ca0f84523c0e',
          averagePrice: 21.96,
          grade: 4,
          name: 'Multiplan Empreendimentos Imobiliários S.A.',
          quantity: 29,
          symbol: 'MULT3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47c1ff704ca0f84523c0f',
          averagePrice: 19.43,
          grade: 4,
          name: 'IRB-Brasil Resseguros S.A.',
          quantity: 43,
          symbol: 'IRBR3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47c41f704ca0f84523c10',
          averagePrice: 13,
          grade: 4,
          name: 'Banco Inter S.A.',
          quantity: 20,
          symbol: 'BIDI4.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47c5cf704ca0f84523c11',
          averagePrice: 10.94,
          grade: 4,
          name: 'Trisul S.A.',
          quantity: 38,
          symbol: 'TRIS3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47c78f704ca0f84523c12',
          averagePrice: 44.08,
          grade: 4,
          name: 'Localiza Rent a Car S.A.',
          quantity: 13,
          symbol: 'RENT3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fbfd9be76e3673568267a86',
          averagePrice: 0,
          grade: 4,
          name:
            'Fundo Investimento Imobiliario Iridium Recebiveis Imobiliarios',
          quantity: 0,
          symbol: 'IRDM11.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47c98f704ca0f84523c13',
          averagePrice: 7.84,
          grade: 0,
          name: 'Grendene S.A.',
          quantity: 7,
          symbol: 'GRND3.SA',
        },
        {
          __typename: 'Ticket',
          _id: '5fa47cb2f704ca0f84523c14',
          averagePrice: 16.3,
          grade: 0,
          name: 'Odontoprev S.A.',
          quantity: 6,
          symbol: 'ODPV3.SA',
        },
      ],
    },
  },
};

const INVALID_LIST_TICKETS = {
  request: {
    query: GET_TICKETS_BY_WALLET,
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};

const EMPTY_LIST_TICKETS = {
  request: {
    query: GET_TICKETS_BY_WALLET,
  },
  result: {
    data: {
      getWalletByUser: [],
    },
  },
};
