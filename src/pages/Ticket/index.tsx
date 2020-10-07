import React, { useContext, useState, useEffect } from 'react';
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
import WalletModal, { GET_WALLET_BY_USER } from '../../components/WalletModal';

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
  quantity: number;
  averagePrice: number;
  grade: number;
}

interface ICurrentTickets {
  ticket: ITickets[];
  description: string;
}

interface IDataTickets {
  getTicketsByWallet: ITickets[];
}

const Ticket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const { user, wallet, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [currentTickets, setCurrentTickets] = useState<ICurrentTickets>(
    {} as ICurrentTickets,
  );

  const hasTickets = false;

  const { data, error } = useQuery<IDataTickets>(GET_TICKET_BY_WALLET, {
    variables: { walletID: wallet },
  });

  console.log(data?.getTicketsByWallet);

  useEffect(() => {
    if (!loading && !wallet) setOpenModal(true);
  }, [wallet, loading]);

  const handleChangeFilter = (filterName: string) => {
    setFilters(filters =>
      filters.map(filter => ({
        name: filter.name,
        focused: filterName !== filter.name ? false : true,
      })),
    );
  };

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
                data={CARD_LIST}
                keyExtractor={item => item.ticket}
                renderItem={({ item }) => (
                  <Content>
                    <TouchableOpacity>
                      <Card colors={gradient.lightToGray} ticket={item.ticket}>
                        <MaterialCommunityIcons
                          name="circle-edit-outline"
                          size={28}
                          color={color.blue}
                        />
                        <CardContent>
                          <CardTitleContainer>
                            <CardTicket>{item.ticket}</CardTicket>
                            <CardTitle> - {item.title}</CardTitle>
                          </CardTitleContainer>
                          <CardSubTitle>{item.subTitle}</CardSubTitle>
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

const GET_TICKET_BY_WALLET = gql`
  query getTicketsByWallet($walletID: ID!) {
    getTicketsByWallet(walletID: $walletID) {
      _id
      symbol
      quantity
      averagePrice
      grade
    }
  }
`;

export default Ticket;
