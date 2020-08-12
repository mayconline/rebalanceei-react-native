import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  List,
  Content,
  CardTitleContainer,
  CardTicket,
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
import SubHeader from '../../components/SubHeader';
import AmountWallet from '../../components/AmountWallet';
import Divider from '../../components/Divider';

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

const initialFilter = [
  {
    name: 'Ativo',
    focused: false,
  },
  {
    name: 'Saldo Aplicado',
    focused: false,
  },
  {
    name: 'Saldo Atual',
    focused: false,
  },
  {
    name: 'Variação',
    focused: true,
  },
];

const Rentability: React.FC = () => {
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
        title="Rentabilidade"
        filters={filters}
        onPress={handleChangeFilter}
      >
        <AmountWallet />
        <Divider />
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
                    <CardTicket>{item.ticket}</CardTicket>
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
