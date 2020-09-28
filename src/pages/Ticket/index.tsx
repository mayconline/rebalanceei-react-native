import React, { useContext, useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
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
import AddWalletModal from '../../components/AddWalletModal';

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

const Ticket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilter);
  const { user, wallet, handleSetWallet } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useQuery(GET_WALLET_BY_USER, {
    variables: { userID: user },
  });

  const hasWallet = !loading && !!data?.getWalletByUser?.length;
  const WalletID = !loading && data?.getWalletByUser[0]?._id;
  const hasTicket = !loading && !!data?.getWalletByUser[0]?.ticket?.length;

  console.log({ hasWallet, hasTicket, WalletID });

  useEffect(() => {
    if (!loading && !hasWallet) setOpenModal(true);
  }, [hasWallet, loading]);

  useEffect(() => {
    if (hasWallet) handleSetWallet(WalletID);
  }, [WalletID]);

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
        {!hasTicket ? (
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
        <AddWalletModal onClose={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};

const GET_WALLET_BY_USER = gql`
  query getWalletByUser($userID: ID!) {
    getWalletByUser(userID: $userID) {
      _id
      description
      sumCostWallet
      sumAmountWallet
      sumGradeWallet
      user {
        _id
        email
      }
      ticket {
        _id
        symbol
        quantity
        averagePrice
        grade
      }
    }
  }
`;

export default Ticket;
