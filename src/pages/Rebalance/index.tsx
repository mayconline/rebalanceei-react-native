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
  Variation,
  VariationContainer,
} from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';

import {
  formatNumber,
  formatStatus,
  formatTicket,
  formatPercent,
} from '../../utils/format';

import { FontAwesome5 } from '@expo/vector-icons';

const initialFilter = [
  {
    name: 'symbol',
    focused: false,
  },
  {
    name: 'currentPercent',
    focused: false,
  },
  {
    name: 'gradePercent',
    focused: false,
  },
  {
    name: 'targetAmount',
    focused: false,
  },
  {
    name: 'targetPercent',
    focused: true,
  },
];

interface IRebalances {
  _id: string;
  symbol: string;
  longName: string;
  status: string;
  currentAmount: number;
  gradePercent: number;
  currentPercent: number;
  targetPercent: number;
  targetAmount: number;
}

interface IDataTickets {
  rebalances: IRebalances[];
}

const Rebalance: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'targetPercent',
  );
  const { wallet } = useAuth();

  const [rebalances, { data, loading: queryLoading, error }] = useLazyQuery<
    IDataTickets
  >(REBALANCES, {
    variables: { walletID: wallet, sort: selectedFilter },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      rebalances();
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

  const hasTickets = wallet && !queryLoading && !!data?.rebalances?.length;

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
            title="Rebalancear"
            filters={filters}
            onPress={handleChangeFilter}
          />
          <List>
            <FlatList
              data={data?.rebalances}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <Content>
                  <Card colors={gradient.lightToGray} status={item.status}>
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
                          <CurrentPercent>
                            {` % Atual: ${item.currentPercent.toFixed(0)} %`}
                          </CurrentPercent>
                          <TargetPercent status={item.status}>
                            {` % Ideal: ${item.gradePercent.toFixed(0)} %`}
                          </TargetPercent>
                        </CardSubTitle>
                        <ProgressBar
                          styleAttr="Horizontal"
                          indeterminate={false}
                          progress={1 - item.targetPercent / 100}
                          color={color.blue}
                        />
                      </SubTitleContant>
                    </CardContent>
                    <AmountContainer>
                      <VariationContainer>
                        <Variation variation={item.targetPercent}>
                          {formatPercent(item.targetPercent)}
                        </Variation>
                        {item.targetPercent !== 0 && (
                          <FontAwesome5
                            name={
                              item.targetPercent > 0 ? 'caret-up' : 'caret-down'
                            }
                            size={16}
                            color={
                              item.targetPercent > 0
                                ? color.success
                                : color.danger
                            }
                          />
                        )}
                      </VariationContainer>
                      <Amount status={item.status}>
                        {formatNumber(item.targetAmount)}
                      </Amount>
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

const REBALANCES = gql`
  query rebalances($walletID: ID!, $sort: SortRebalance!) {
    rebalances(walletID: $walletID, sort: $sort) {
      _id
      symbol
      longName
      status
      currentAmount
      gradePercent
      currentPercent
      targetPercent
      targetAmount
    }
  }
`;

export default Rebalance;
