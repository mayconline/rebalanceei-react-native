import React, { useContext, useState, useMemo } from 'react';
import { FlatList, TouchableOpacity, Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useQuery, gql } from '@apollo/client';
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
import WalletModal from '../../components/WalletModal';
import EditTicketModal from '../../components/EditTicketModal';

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

const Ticket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const [selectedFilter, setSelectFilter] = useState<string | undefined>(
    'grade',
  );
  const { wallet, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({} as ITickets);

  const { data, loading: queryLoading, error } = useQuery<IDataTickets>(
    GET_TICKETS_BY_WALLET,
    {
      variables: { walletID: wallet, sort: selectedFilter },
      fetchPolicy: 'cache-and-network',
    },
  );

  useMemo(() => {
    if (!loading && !wallet) setOpenModal(true);
  }, [wallet]);

  const handleChangeFilter = (filterName: string) => {
    setFilters(filters =>
      filters.map(filter => ({
        name: filter.name,
        focused: filterName !== filter.name ? false : true,
      })),
    );

    setSelectFilter(filterName);
  };

  const hasTickets =
    wallet && !queryLoading && !!data?.getTicketsByWallet?.length;

  const handleOpenEditModal = (item: ITickets) => {
    setSelectedWallet(item);
    setOpenEditModal(true);
  };

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
                keyExtractor={item => item._id}
                initialNumToRender={data?.getTicketsByWallet.length}
                renderItem={({ item }) => (
                  <Content>
                    <TouchableOpacity onPress={() => handleOpenEditModal(item)}>
                      <Card
                        colors={gradient.lightToGray}
                        ticket={formatTicket(item.symbol)}
                      >
                        <MaterialCommunityIcons
                          name="circle-edit-outline"
                          size={28}
                          color={color.blue}
                        />
                        <CardContent>
                          <CardTitleContainer>
                            <CardTicket>{formatTicket(item.symbol)}</CardTicket>
                            <CardTitle numberOfLines={1} ellipsizeMode="tail">
                              {' '}
                              - {formatTicket(item.name)}
                            </CardTitle>
                          </CardTitleContainer>
                          <CardSubTitle>
                            {item.quantity}x {formatNumber(item.averagePrice)}
                          </CardSubTitle>
                        </CardContent>
                        <Grade>{item.grade}</Grade>
                      </Card>
                    </TouchableOpacity>
                  </Content>
                )}
              />
            </List>
          </>
        )}
      </Wrapper>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        statusBarTranslucent={true}
      >
        <WalletModal onClose={() => setOpenModal(false)} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openEditModal}
        statusBarTranslucent={true}
      >
        <EditTicketModal
          onClose={() => setOpenEditModal(false)}
          tickets={selectedWallet}
        />
      </Modal>
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
