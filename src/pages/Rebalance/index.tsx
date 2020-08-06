import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
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
  SubTitleContant,
  CardSubTitle,
  CurrentPercent,
  TargetPercent,
  ProgressBar,
  AmountContainer,
  Amount,
  Status,
} from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
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

const initialFilter = [
  {
    name: 'Ativo',
    focused: false,
  },
  {
    name: 'Quantidade',
    focused: true,
  },
];

const Rebalance: React.FC = () => {
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
        title="Rebalancear"
        filters={filters}
        onPress={handleChangeFilter}
      />
      <List>
        <FlatList
          data={CARD_LIST}
          keyExtractor={item => item.ticket}
          renderItem={({ item }) => (
            <Content>
              <Card colors={gradient.lightToGray} status={item.status}>
                <CardContent>
                  <CardTitleContainer>
                    <CardTicket>{item.ticket}</CardTicket>
                    <CardTitle> - {item.title}</CardTitle>
                  </CardTitleContainer>
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
