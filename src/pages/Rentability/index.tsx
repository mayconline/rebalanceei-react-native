import React, { useState, useCallback } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useLazyQuery, gql } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { Wrapper } from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import AmountWallet from '../../components/AmountWallet';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';
import TextError from '../../components/TextError';
import ListTicket from '../../components/ListTicket';
import ListItem from './ListItem';

const initialFilter = [
  {
    name: 'symbol',
  },
  {
    name: 'costAmount',
  },
  {
    name: 'currentAmount',
  },
  {
    name: 'variationPercent',
  },
];

export interface IGetRentability {
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

const Rentability = () => {
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'currentAmount',
  );

  const { wallet } = useAuth();

  const [
    getRentability,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IDataTickets>(GET_RENTABILITY, {
    variables: { walletID: wallet, sort: selectedFilter },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getRentability();
    }, [selectedFilter]),
  );

  const handleChangeFilter = useCallback((filterName: string) => {
    setSelectFilter(filterName);
  }, []);

  const hasTickets = wallet && !queryLoading && !!data?.getRentability?.length;

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
            title="Variação da carteira"
            filters={initialFilter}
            selectedFilter={selectedFilter}
            onPress={handleChangeFilter}
          />
          <ListTicket
            data={data?.getRentability}
            extraData={!!queryLoading}
            keyExtractor={item => item._id}
            ListHeaderComponent={<AmountWallet />}
            renderItem={({ item }) => <ListItem item={item} />}
          />
        </>
      )}
    </Wrapper>
  );
};

export const GET_RENTABILITY = gql`
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
