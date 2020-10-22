import React, { useContext, useState, useEffect, useMemo } from 'react';
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
import WalletModal from '../../components/WalletModal';
import { formatNumber, formatTicket } from '../../utils/format';

const CARD_LIST = [
  {
    title: 'Lojas Renner',
    ticket: 'LREN3',
    subTitle: '30x PM R$ 40.00',
    grade: 10,
  },
  {
    title: 'Wege',
    ticket: 'WEGE3',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Itausa',
    ticket: 'ITSA4',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Engie',
    ticket: 'EGIE3',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Transmisão Paulista',
    ticket: 'TRPL4',
    subTitle: '30x PM R$ 70.00',
    grade: 10,
  },
  {
    title: 'Hedge Grifo Logistica',
    ticket: 'HGLG11',
    subTitle: '30x PM R$ 70.00',
    grade: 5,
  },
  {
    title: 'Hedge Grifo Shopping',
    ticket: 'HGBS11',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
  {
    title: 'Google',
    ticket: 'GOOG',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
  {
    title: 'Amazon BDR',
    ticket: 'AMZN34',
    subTitle: '30x PM R$ 70.00',
    grade: 3,
  },
];

const initialFilter = [
  {
    name: 'Ativo',
    focused: false,
  },
  {
    name: 'Nota',
    focused: true,
  },
];

interface ITickets {
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  grade: number;
}

interface IWalletID {
  _id: string;
  description: string;
  ticket: ITickets[];
}

interface IDataTickets {
  getWalletById: IWalletID;
}

const Ticket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const { wallet, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const { data, loading: queryLoading, error } = useQuery<IDataTickets>(
    GET_WALLET_BY_ID,
    {
      variables: { _id: wallet },
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
  };

  const hasTickets =
    wallet && !queryLoading && !!data?.getWalletById?.ticket?.length;

  return (
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
                data={data?.getWalletById?.ticket}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <Content>
                    <TouchableOpacity>
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
    </>
  );
};

export const GET_WALLET_BY_ID = gql`
  query getWalletById($_id: ID!) {
    getWalletById(_id: $_id) {
      _id
      description
      ticket {
        _id
        symbol
        name
        quantity
        averagePrice
        grade
      }
    }
  }
`;

export default Ticket;
