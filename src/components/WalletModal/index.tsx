import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { FlatList, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
import {
  Wrapper,
  Title,
  Card,
  CardTitleContainer,
  WalletTitle,
  CardSubTitle,
  CurrentAmount,
  VariationPercent,
  PercentWallet,
  PercentTitle,
  CurrentPercent,
  AddWalletContainer,
  Label,
  BackButtonContainer,
  BackButton,
  AddButtonContainer,
  WalletRadioSelect,
} from './styles';

import Divider from '../Divider';
import AddButton from '../AddButton';
import ShadowBackdrop from '../ShadowBackdrop';
import AddWalletModal from '../AddWalletModal';
import Loading from '../Loading';

const WALLET_LIST = [
  {
    id: '1',
    name: 'Ações',
    currentWalletAmount: '10521.00',
    currentWalletPercent: '50',
    variationWalletAmount: '7.1',
    checked: true,
  },
  {
    id: '2',
    name: 'Fundos Imobiliários',
    currentWalletAmount: '5231.03',
    currentWalletPercent: '20',
    variationWalletAmount: '3.1',
    checked: false,
  },
  {
    id: '3',
    name: 'Reits',
    currentWalletAmount: '5231.03',
    currentWalletPercent: '9.77',
    variationWalletAmount: '3.1',
    checked: false,
  },
  {
    id: '4',
    name: 'Stocks',
    currentWalletAmount: '5231.03',
    currentWalletPercent: '10.23',
    variationWalletAmount: '3.1',
    checked: false,
  },
];

interface WalletProps {
  onClose(): void;
}

interface IObjectWallet {
  _id: string;
  description: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  percentRentabilityWallet: number;
  checked?: boolean;
}

interface IDataWallet {
  getWalletByUser: IObjectWallet[];
}

const WalletModal: React.FC<WalletProps> = ({ onClose }) => {
  const { color } = useContext(ThemeContext);
  const { user, handleSetWallet, wallet } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const { data, loading: queryLoading, error } = useQuery<IDataWallet>(
    GET_WALLET_BY_USER,
    {
      variables: { userID: user },
      fetchPolicy: 'cache-and-network',
    },
  );

  const hasWallet = !!data?.getWalletByUser?.length;
  // const WalletID: any = !loading && !!data && data?.getWalletByUser[0]?._id;

  const INITIAL_WALLET = useMemo(() => {
    return data?.getWalletByUser?.map(wallets => ({
      ...wallets,
      checked: wallet !== wallets._id ? false : true,
    }));
  }, [data]);

  const [selectWallet, setSelectWallet] = useState<IObjectWallet[] | undefined>(
    [] as IObjectWallet[],
  );

  useMemo(() => {
    setSelectWallet(INITIAL_WALLET);
  }, [INITIAL_WALLET, data]);

  useMemo(() => {
    if (!queryLoading && !hasWallet) setOpenModal(true);
  }, [queryLoading]);

  const handleSelectWallet = (walletID: string) => {
    setSelectWallet(wallets =>
      wallets?.map(wallet => ({
        ...wallet,
        checked: walletID !== wallet._id ? false : true,
      })),
    );

    handleSetWallet(walletID);
  };

  return queryLoading ? (
    <Loading />
  ) : (
    <>
      <ShadowBackdrop />
      <Wrapper>
        <Title>Carteiras</Title>
        <FlatList
          data={selectWallet}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <>
              <Card onPress={() => handleSelectWallet(item._id)}>
                <CardTitleContainer>
                  <WalletTitle>{item.description}</WalletTitle>
                  <CardSubTitle>
                    <CurrentAmount>R$ {item.sumAmountWallet}</CurrentAmount>
                    {/*<VariationPercent>{'1%'}</VariationPercent>*/}
                  </CardSubTitle>
                </CardTitleContainer>

                <PercentWallet>
                  <PercentTitle>% da Carteira</PercentTitle>
                  {/*<CurrentPercent>{'10%'}</CurrentPercent>*/}
                </PercentWallet>

                <WalletRadioSelect selected={item.checked} />
              </Card>

              <Divider />
            </>
          )}
        />

        <AddWalletContainer>
          <BackButtonContainer onPress={onClose}>
            <Entypo
              name="chevron-small-left"
              size={16}
              color={color.subtitle}
            />
            <BackButton>Voltar</BackButton>
          </BackButtonContainer>

          <AddButtonContainer onPress={() => setOpenModal(true)}>
            <Label>Adicionar Carteira</Label>
            <AddButton size={40} />
          </AddButtonContainer>
        </AddWalletContainer>
      </Wrapper>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        statusBarTranslucent={true}
      >
        <AddWalletModal
          onClose={() => setOpenModal(false)}
          beforeModalClose={onClose}
        />
      </Modal>
    </>
  );
};

export const GET_WALLET_BY_USER = gql`
  query getWalletByUser($userID: ID!) {
    getWalletByUser(userID: $userID) {
      _id
      description
      sumCostWallet
      sumAmountWallet
      percentRentabilityWallet
    }
  }
`;

export default WalletModal;
