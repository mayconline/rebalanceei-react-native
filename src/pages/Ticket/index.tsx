import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
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

const Ticket: React.FC = () => {
  const { color } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <Content>
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

        <Card>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={28}
            color={color.blue}
          />
          <CardContent>
            <CardTitle>Lojas Renner (LREN3)</CardTitle>
            <CardSubTitle>30x PM: R$ 40.00</CardSubTitle>
          </CardContent>
          <Grade>10</Grade>
        </Card>

        <Card>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={28}
            color={color.blue}
          />
          <CardContent>
            <CardTitle>Lojas Renner (LREN3)</CardTitle>
            <CardSubTitle>30x PM: R$ 40.00</CardSubTitle>
          </CardContent>
          <Grade>10</Grade>
        </Card>
      </Content>
    </Wrapper>
  );
};

export default Ticket;
