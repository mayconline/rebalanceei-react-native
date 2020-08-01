import React, { useContext, useRef } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  SubHeader,
  List,
  Content,
  CardTitleContainer,
  Ticket,
  Title,
  FiltersContainer,
  Filter,
  TextFilter,
  Card,
  CardContent,
  CardTitle,
  SubTitleContant,
  CardSubTitle,
  AmountContainer,
  Amount,
  Variation,
  VariationContainer,
} from './styles';

import { FontAwesome5 } from '@expo/vector-icons';

import Header from '../../components/Header';
import { formatNumber } from '../../utils/format';

const CARD_LIST = [
  {
    title: 'Lojas Renner',
    ticket: 'LREN3',
    subTitle: 2000.0,
    amount: 40070.2454,
    financialCurrency: 'BRL',
    variation: 120.5,
  },

  {
    title: 'Engie',
    ticket: 'EGIE3',
    subTitle: 500.45,
    amount: 21087.2454,
    financialCurrency: 'BRL',
    percent: 0.95,
    variation: 70.2,
  },
  {
    title: 'Cshg Logistica',
    ticket: 'HGLG11',
    subTitle: 150.44,
    amount: 400.2454,
    financialCurrency: 'BRL',
    percent: 0.45,
    variation: 0.45,
  },
  {
    title: 'Alphabet Inc.',
    ticket: 'GOOG',
    subTitle: 12107.0,
    amount: 12107.0,
    financialCurrency: 'USD',
    percent: 1,
    variation: 0,
  },
  {
    title: 'Transmissão Paulista',
    ticket: 'TRPL4',
    subTitle: 400.02,
    amount: 200.2454,
    financialCurrency: 'BRL',
    percent: 0.85,
    variation: -4.5,
  },
  {
    title: 'Magazine Luiza SA.',
    ticket: 'MGLU3',
    subTitle: 4189.0214,
    amount: 1054.02,
    financialCurrency: 'BRL',
    percent: 1,
    variation: -40.2,
  },
];

const Rentability: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <Wrapper>
      <Header />
      <SubHeader>
        <Title>Rentabilidade</Title>
        <FiltersContainer>
          <ScrollView
            horizontal={true}
            centerContent={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef?.current?.scrollToEnd({ animated: true })
            }
          >
            <Filter>
              <TextFilter focused={false}>Ativo</TextFilter>
            </Filter>
            <Filter>
              <TextFilter focused={false}>Saldo Aplicado</TextFilter>
            </Filter>
            <Filter>
              <TextFilter focused={false}>Saldo Atual</TextFilter>
            </Filter>
            <Filter>
              <TextFilter focused={true}>Variação</TextFilter>
            </Filter>
          </ScrollView>
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
              <Card colors={gradient.lightToGray} variation={item.variation}>
                <CardContent>
                  <CardTitleContainer>
                    <Ticket>{item.ticket}</Ticket>
                    <CardTitle> - {item.title}</CardTitle>
                  </CardTitleContainer>
                  <SubTitleContant>
                    <CardSubTitle>
                      {formatNumber(item.subTitle, item.financialCurrency)}
                    </CardSubTitle>
                  </SubTitleContant>
                </CardContent>
                <AmountContainer>
                  <VariationContainer>
                    <Variation variation={item.variation}>
                      {item.variation}%
                    </Variation>
                    {item.variation !== 0 && (
                      <FontAwesome5
                        name={item.variation > 0 ? 'caret-up' : 'caret-down'}
                        size={16}
                        color={
                          item.variation > 0 ? color.success : color.danger
                        }
                      />
                    )}
                  </VariationContainer>

                  <Amount variation={item.variation}>
                    {formatNumber(item.amount, item.financialCurrency)}
                  </Amount>
                </AmountContainer>
              </Card>
            </Content>
          )}
        />
      </List>
    </Wrapper>
  );
};

export default Rentability;
