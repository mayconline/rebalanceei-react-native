import React, { useContext, useState, useMemo, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity, Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import {
  Wrapper,
  List,
  Content,
  Card,
  CardContent,
  CardTitleContainer,
  CardTicket,
  CardTitle,
  CardSubTitle,
  Grade,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import WalletModal from '../../modals/WalletModal';
import ListItem from './ListItem';

import { formatNumber, formatTicket } from '../../utils/format';

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
  const { color, gradient } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [filters, setFilters] = useState(initialFilter);
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'grade',
  );
  const { wallet, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const [
    getTicketsByWallet,
    { data, loading: queryLoading, error },
  ] = useLazyQuery<IDataTickets>(GET_TICKETS_BY_WALLET, {
    variables: { walletID: wallet, sort: selectedFilter },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getTicketsByWallet();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (!loading && !queryLoading && !wallet) setOpenModal(true);
    }, [wallet, loading, queryLoading]),
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

  const hasTickets =
    wallet && !queryLoading && !!data?.getTicketsByWallet?.length;

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
        {!hasTickets ? (
          <Empty />
        ) : (
          <>
            <SubHeader
              title="Meus Ativos"
              filters={filters}
              onPress={handleChangeFilter}
            />
            <List>
              <FlatList
                data={data?.getTicketsByWallet}
                extraData={!!queryLoading}
                keyExtractor={item => item._id}
                removeClippedSubviews={false}
                initialNumToRender={5}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={300}
                automaticallyAdjustContentInsets={false}
                style={{ flex: 0 }}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    color={color}
                    gradient={gradient}
                    handleOpenEditModal={handleOpenEditModal}
                  />
                )}
              />
            </List>
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
