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
  SubTitleContant,
  CardSubTitle,
  CurrentPercent,
  TargetPercent,
  ProgressBar,
  AmountContainer,
  Amount,
  Status,
} from './styles';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import { formatNumber, formatStatus } from '../../utils/format';

const CARD_LIST = [
  {
    title: 'Lojas Renner',
    ticket: 'LREN3',
    subTitle: '+40.5%',
    amount: 40070.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.6,
  },
  {
    title: 'Transmissão Paulista',
    ticket: 'TRPL4',
    subTitle: '+10.5%',
    amount: 10.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.85,
  },
  {
    title: 'Engie',
    ticket: 'EGIE3',
    subTitle: '+0.5%',
    amount: 210.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.95,
  },
  {
    title: 'Cshg Logistica',
    ticket: 'HGLG11',
    subTitle: '+50.5%',
    amount: 400.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.45,
  },
  {
    title: 'Alphabet Inc.',
    ticket: 'GOOG',
    subTitle: '+0%',
    amount: 0,
    status: 'KEEP',
    financialCurrency: 'USD',
    percent: 1,
  },
  {
    title: 'Magazine Luiza SA.',
    ticket: 'MGLU3',
    subTitle: '-2.3%',
    amount: -300.78124,
    status: 'ANALIZE',
    financialCurrency: 'BRL',
    percent: 1,
  },
];

const Rebalance: React.FC = () => {
  const { color } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <SubHeader>
        <Title>Rebalancear</Title>
        <FiltersContainer>
          <Filter>
            <TextFilter focused={false}>Ativo</TextFilter>
          </Filter>
          <Filter>
            <TextFilter focused={true}>Quantidade</TextFilter>
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
                <CardContent>
                  <CardTitle>
                    {item.title} ({item.ticket})
                  </CardTitle>
                  <SubTitleContant>
                    <CardSubTitle>
                      <CurrentPercent>% Atual</CurrentPercent>
                      <TargetPercent status={item.status}>
                        {item.subTitle}
                      </TargetPercent>
                    </CardSubTitle>
                    <ProgressBar
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={item.percent}
                      color={color.blue}
                    />
                  </SubTitleContant>
                </CardContent>
                <AmountContainer>
                  <Amount status={item.status}>
                    {formatNumber(item.amount, item.financialCurrency)}
                  </Amount>
                  <Status status={item.status}>
                    {formatStatus(item.status)}
                  </Status>
                </AmountContainer>
              </Card>
            </Content>
          )}
        />
      </List>
    </Wrapper>
  );
};

export default Rebalance;
