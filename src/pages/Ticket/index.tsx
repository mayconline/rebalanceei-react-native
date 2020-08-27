import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  List,
  Content,
  Card,
  CardContent,
  CardTitleContainer,
  CardTicket,
  CardTitle,
  CardSubTitle,
  Grade,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

const CARD_LIST = [
  {
    title: 'Lojas Renner',
    ticket: 'LREN3',
    subTitle: '30x PM R$ 40.00',
    grade: 10,
  },
  {
    title: 'Wege',
    ticket: 'WEGE3',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Itausa',
    ticket: 'ITSA4',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Engie',
    ticket: 'EGIE3',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Transmisão Paulista',
    ticket: 'TRPL4',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Hedge Grifo Logistica',
    ticket: 'HGLG11',
    subTitle: '30x PM R$ 70.00',
    grade: 5,
  },
  {
    title: 'Hedge Grifo Shopping',
    ticket: 'HGBS11',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
  {
    title: 'Google',
    ticket: 'GOOG',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
  {
    title: 'Amazon BDR',
    ticket: 'AMZN34',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
];

const initialFilter = [
  {
    name: 'Ativo',
    focused: false,
  },
  {
    name: 'Nota',
    focused: true,
  },
];

const Ticket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);

  const handleChangeFilter = (filterName: string) => {
    setFilters(filters =>
      filters.map(filter => ({
        name: filter.name,
        focused: filterName !== filter.name ? false : true,
      })),
    );
  };

  return (
    <Wrapper>
      <Header />
      <SubHeader
        title="Meus Ativos"
        filters={filters}
        onPress={handleChangeFilter}
      />
      <List>
        <FlatList
          data={CARD_LIST}
          keyExtractor={item => item.ticket}
          renderItem={({ item }) => (
            <Content>
              <TouchableOpacity>
                <Card colors={gradient.lightToGray} ticket={item.ticket}>
                  <MaterialCommunityIcons
                    name="circle-edit-outline"
                    size={28}
                    color={color.blue}
                  />
                  <CardContent>
                    <CardTitleContainer>
                      <CardTicket>{item.ticket}</CardTicket>
                      <CardTitle> - {item.title}</CardTitle>
                    </CardTitleContainer>
                    <CardSubTitle>{item.subTitle}</CardSubTitle>
                  </CardContent>
                  <Grade>{item.grade}</Grade>
                </Card>
              </TouchableOpacity>
            </Content>
          )}
        />
      </List>
    </Wrapper>
  );
};

export default Ticket;
