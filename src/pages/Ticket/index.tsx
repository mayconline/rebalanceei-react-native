import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Modal } from 'react-native';
import { useAuth } from '../../contexts/authContext';
import { useLazyQuery, gql } from '@apollo/client';

import { Wrapper } from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import TextError from '../../components/TextError';
import WalletModal from '../../modals/WalletModal';
import ListTicket from '../../components/ListTicket';
import ListItem from './ListItem';

const initialFilter = [
  {
    name: 'symbol',
    focused: false,
  },
  {
    name: 'grade',
    focused: true,
  },
];

export interface ITickets {
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  grade: number;
}

interface IDataTickets {
  getTicketsByWallet: ITickets[];
}

const Ticket = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(initialFilter);
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'grade',
  );
  const { wallet } = useAuth();
  const [openModal, setOpenModal] = useState(!wallet ? true : false);

  const [
    getTicketsByWallet,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IDataTickets>(GET_TICKETS_BY_WALLET, {
    variables: { walletID: wallet, sort: selectedFilter },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getTicketsByWallet();
    }, []),
  );

  const handleChangeFilter = useCallback((filterName: string) => {
    setFilters(filters =>
      filters.map(filter => ({
        name: filter.name,
        focused: filterName !== filter.name ? false : true,
      })),
    );

    setSelectFilter(filterName);
  }, []);

  const hasTickets = !queryLoading && !!data?.getTicketsByWallet?.length;

  const handleOpenEditModal = useCallback((item: ITickets) => {
    navigation.setParams({ ticket: null });
    navigation.navigate('AddTicket', { ticket: item });
  }, []);

  return queryLoading ? (
    <Loading />
  ) : (
    <>
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
              title="Meus Ativos"
              filters={filters}
              onPress={handleChangeFilter}
            />
            <ListTicket
              data={data?.getTicketsByWallet}
              extraData={!!queryLoading}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <ListItem
                  item={item}
                  handleOpenEditModal={handleOpenEditModal}
                />
              )}
            />
          </>
        )}
      </Wrapper>

      {openModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          statusBarTranslucent={true}
        >
          <WalletModal onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export const GET_TICKETS_BY_WALLET = gql`
  query getTicketsByWallet($walletID: ID!, $sort: SortTickets!) {
    getTicketsByWallet(walletID: $walletID, sort: $sort) {
      _id
      symbol
      name
      quantity
      averagePrice
      grade
    }
  }
`;

export default Ticket;
