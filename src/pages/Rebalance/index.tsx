import React, { useContext, useState, useCallback } from 'react';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useLazyQuery, gql } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { Wrapper } from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import TextError from '../../components/TextError';
import ListTicket from '../../components/ListTicket';
import ListItem from './ListItem';

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

export interface IRebalances {
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

  const [
    rebalances,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IDataTickets>(REBALANCES, {
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
      {!!queryError && (
        <TextError isTabs={true}>{queryError?.message}</TextError>
      )}
      {!hasTickets ? (
        <Empty />
      ) : (
        <>
          <SubHeader
            title="Rebalancear"
            filters={filters}
            onPress={handleChangeFilter}
          />
          <ListTicket
            data={data?.rebalances}
            extraData={!!queryLoading}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <ListItem item={item} />}
          />
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
