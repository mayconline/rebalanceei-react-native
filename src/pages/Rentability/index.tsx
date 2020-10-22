import React, { useContext, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
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
  CardSubTitleLegend,
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
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

import { formatNumber, formatPercent, formatTicket } from '../../utils/format';

const initialFilter = [
  {
    name: 'symbol',
    focused: false,
  },
  {
    name: 'costAmount',
    focused: false,
  },
  {
    name: 'currentAmount',
    focused: false,
  },
  {
    name: 'variationPercent',
    focused: true,
  },
];

interface IGetRentability {
  _id: string;
  symbol: string;
  longName: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  costAmount: number;
  currentAmount: number;
  variationAmount: number;
  variationPercent: number;
}

interface IDataTickets {
  getRentability: IGetRentability[];
}

const Rentability: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'variationPercent',
  );

  const { wallet } = useAuth();

  const [getRentability, { data, loading: queryLoading, error }] = useLazyQuery<
    IDataTickets
  >(GET_RENTABILITY, {
    variables: { walletID: wallet, sort: selectedFilter },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getRentability();
    }, [selectedFilter]),
  );

  const handleChangeFilter = (filterName: string) => {
    setFilters(filters =>
      filters.map(filter => ({
        name: filter.name,
        focused: filterName !== filter.name ? false : true,
      })),
    );

    setSelectFilter(filterName);
  };

  const hasTickets = wallet && !queryLoading && !!data?.getRentability?.length;

  return queryLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header />
      {!hasTickets ? (
        <Empty />
      ) : (
        <>
          <SubHeader
            title="Variação da carteira"
            filters={filters}
            onPress={handleChangeFilter}
          >
            <AmountWallet />
            <Divider />
          </SubHeader>
          <List>
            <FlatList
              data={data?.getRentability}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <Content>
                  <Card
                    colors={gradient.lightToGray}
                    variation={item.variationPercent}
                  >
                    <CardContent>
                      <CardTitleContainer>
                        <CardTicket>{formatTicket(item.symbol)}</CardTicket>
                        <CardTitle numberOfLines={1} ellipsizeMode="tail">
                          {' '}
                          - {formatTicket(item.longName)}
                        </CardTitle>
                      </CardTitleContainer>
                      <SubTitleContant>
                        <CardSubTitle>
                          {formatNumber(item.costAmount)}
                        </CardSubTitle>
                        <CardSubTitleLegend>Saldo aplicado</CardSubTitleLegend>
                      </SubTitleContant>
                    </CardContent>
                    <AmountContainer>
                      <VariationContainer>
                        <Variation variation={item.variationPercent}>
                          {formatPercent(item.variationPercent)}
                        </Variation>
                        {item.variationPercent !== 0 && (
                          <FontAwesome5
                            name={
                              item.variationPercent > 0
                                ? 'caret-up'
                                : 'caret-down'
                            }
                            size={16}
                            color={
                              item.variationPercent > 0
                                ? color.success
                                : color.danger
                            }
                          />
                        )}
                      </VariationContainer>
                      <Amount variation={item.variationPercent}>
                        {formatNumber(item.currentAmount)}
                      </Amount>
                      <CardSubTitleLegend>Saldo atual</CardSubTitleLegend>
                    </AmountContainer>
                  </Card>
                </Content>
              )}
            />
          </List>
        </>
      )}
    </Wrapper>
  );
};

const GET_RENTABILITY = gql`
  query getRentability($walletID: ID!, $sort: SortRentability!) {
    getRentability(walletID: $walletID, sort: $sort) {
      _id
      symbol
      longName
      sumCostWallet
      sumAmountWallet
      costAmount
      currentAmount
      variationAmount
      variationPercent
    }
  }
`;

export default Rentability;
