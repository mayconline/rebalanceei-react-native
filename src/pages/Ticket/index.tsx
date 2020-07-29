import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  SubHeader,
  List,
  Content,
  Title,
  FiltersContainer,
  Filter,
  TextFilter,
  Card,
  CardContent,
  CardTitle,
  CardSubTitle,
  Grade,
} from './styles';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/Header';

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
    grade: 10,
  },
  {
    title: 'Hedge Grifo Shopping',
    ticket: 'HGBS11',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
];

const Ticket: React.FC = () => {
  const { color } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <SubHeader>
        <Title>Meus Ativos</Title>
        <FiltersContainer>
          <Filter>
            <TextFilter focused={false}>Ativo</TextFilter>
          </Filter>
          <Filter>
            <TextFilter focused={true}>Nota</TextFilter>
          </Filter>
          <FontAwesome5
            name="sort-amount-up"
            size={24}
            color={color.subtitle}
          />
        </FiltersContainer>
      </SubHeader>
      <List>
        <FlatList
          data={CARD_LIST}
          keyExtractor={item => item.ticket}
          renderItem={({ item }) => (
            <Content>
              <Card>
                <MaterialCommunityIcons
                  name="circle-edit-outline"
                  size={28}
                  color={color.blue}
                />
                <CardContent>
                  <CardTitle>
                    {item.title} ({item.ticket})
                  </CardTitle>
                  <CardSubTitle>{item.subTitle}</CardSubTitle>
                </CardContent>
                <Grade>{item.grade}</Grade>
              </Card>
            </Content>
          )}
        />
      </List>
    </Wrapper>
  );
};

export default Ticket;
