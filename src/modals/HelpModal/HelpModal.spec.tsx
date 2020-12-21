import React from 'react';
import HelpModal, { GET_QUESTIONS } from './index';
import { render, fireEvent, waitFor, act } from '../../utils/testProvider';
import { GraphQLError } from 'graphql';

const mockedOnClose = jest.fn();

describe('HelpModal', () => {
  it('should successfully list questions', async () => {
    const { findByText, getByText } = render(
      <HelpModal onClose={mockedOnClose} />,
      [SUCCESSFUL_LIST_QUESTIONS],
    );

    const ask = await findByText(/Como faço para adicionar um ativo ?/i);
    act(() => fireEvent.press(ask));

    getByText(
      /Clicando no botão azul de \(\+\) no meio das abas, abrirá uma aba para que seja cadastrado os ativos, é preciso clicar em pesquisar ativo, e procurar pelo codigo dele, e após clicar em adicionar, e continuar preenchendo as informações de Nota, Quantidade e Preço Médio./i,
    );
  });

  it('should throw error', async () => {
    const { findByText } = render(<HelpModal onClose={mockedOnClose} />, [
      INVALID_LIST_QUESTIONS,
    ]);

    await findByText(/Sem conexão com o banco de dados./i);
  });
});

const SUCCESSFUL_LIST_QUESTIONS = {
  request: {
    query: GET_QUESTIONS,
  },
  result: {
    data: {
      questions: [
        {
          _id: '5fe10802361e4f25c446c5f2',
          ask: 'Como faço para adicionar um ativo ?',
          answer:
            'Clicando no botão azul de (+) no meio das abas, abrirá uma aba para que seja cadastrado os ativos, é preciso clicar em pesquisar ativo, e procurar pelo codigo dele, e após clicar em adicionar, e continuar preenchendo as informações de Nota, Quantidade e Preço Médio.',
        },
        {
          _id: '5fe108403edb9f3ce0f19e56',
          ask: 'Como adicionar um ativo internacional ?',
          answer:
            'Da mesma forma que um ativo nacional, porém convertendo o valor em Dolar para Reais antes de adicionar o ativo na aba Ativos.',
        },
      ],
    },
  },
};

const INVALID_LIST_QUESTIONS = {
  request: {
    query: GET_QUESTIONS,
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Sem conexão com o banco de dados.')],
  },
};
