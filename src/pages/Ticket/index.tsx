import React from 'react';

import { Wrapper, Content, Text } from './styles';

import Header from '../../components/Header';

const Ticket: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <Text>Meus Ativos</Text>
      </Content>
    </Wrapper>
  );
};

export default Ticket;
