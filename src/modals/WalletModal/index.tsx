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
import { AntDesign } from '@expo/vector-icons';
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
  BackIcon,
  AddButtonContainer,
  WalletRadioSelect,
} from './styles';

import Divider from '../../components/Divider';
import AddButton from '../../components/AddButton';
import ShadowBackdrop from '../../components/ShadowBackdrop';
import AddWalletModal from '../AddWalletModal';
import Loading from '../../components/Loading';

import { formatNumber, formatPercent } from '../../utils/format';

interface WalletProps {
  onClose(): void;
}

interface IObjectWallet {
  _id: string;
  description: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  percentRentabilityWallet: number;
  percentPositionWallet: number;
  sumAmountAllWallet: number;
  checked?: boolean;
}

interface IDataWallet {
  getWalletByUser: IObjectWallet[];
}

const WalletModal: React.FC<WalletProps> = ({ onClose }) => {
  const { color } = useContext(ThemeContext);
  const { handleSetWallet, wallet } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectWallet, setSelectWallet] = useState<IObjectWallet[] | undefined>(
    [] as IObjectWallet[],
  );

  const [
    getWalletByUser,
    { data, loading: queryLoading, error },
  ] = useLazyQuery<IDataWallet>(GET_WALLET_BY_USER, {
    fetchPolicy: 'no-cache',
  });

  useFocusEffect(
    useCallback(() => {
      getWalletByUser();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (data) {
        let checkedWallet = data?.getWalletByUser?.map(wallets => ({
          ...wallets,
          checked: wallet === wallets._id,
        }));

        setSelectWallet(checkedWallet);
      }
    }, [data]),
  );

  const handleSelectWallet = (walletID: string, walletName: string) => {
    setSelectWallet(wallets =>
      wallets?.map(wallet => ({
        ...wallet,
        checked: walletID === wallet._id,
      })),
    );

    handleSetWallet(walletID, walletName);
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
              <Card
                onPress={() => handleSelectWallet(item._id, item.description)}
              >
                <CardTitleContainer>
                  <WalletTitle numberOfLines={1} ellipsizeMode="tail">
                    {item.description}
                  </WalletTitle>
                  <CardSubTitle>
                    <CurrentAmount>
                      {formatNumber(item.sumAmountWallet)}
                    </CurrentAmount>
                    <VariationPercent value={item.percentRentabilityWallet}>
                      {formatPercent(item.percentRentabilityWallet)}
                    </VariationPercent>
                  </CardSubTitle>
                </CardTitleContainer>

                <PercentWallet>
                  <PercentTitle>% da Carteira</PercentTitle>
                  <CurrentPercent>
                    {`${item.percentPositionWallet.toFixed(0)}%`}
                  </CurrentPercent>
                </PercentWallet>

                <WalletRadioSelect selected={item.checked} />
              </Card>

              <Divider />
            </>
          )}
        />

        <AddWalletContainer>
          <BackButtonContainer onPress={onClose}>
            <BackIcon>
              <AntDesign name="closecircleo" size={16} color={color.subtitle} />
            </BackIcon>
            <BackButton>Fechar Modal</BackButton>
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
  query getWalletByUser {
    getWalletByUser {
      _id
      description
      sumCostWallet
      sumAmountWallet
      percentRentabilityWallet
      percentPositionWallet
      sumAmountAllWallet
    }
  }
`;

export default WalletModal;
