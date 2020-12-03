import React, { useContext, useState, useCallback } from 'react';
import { Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { useLazyQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
import {
  Wrapper,
  Title,
  AddWalletContainer,
  Label,
  BackButtonContainer,
  BackButton,
  BackIcon,
  AddButtonContainer,
} from './styles';

import AddButton from '../../components/AddButton';
import ShadowBackdrop from '../../components/ShadowBackdrop';
import Loading from '../../components/Loading';
import TextError from '../../components/TextError';
import AddWalletModal from '../AddWalletModal';
import ListTicket from '../../components/ListTicket';
import ListItem from './ListItem';

interface IWalletProps {
  onClose(): void;
}

export interface IObjectWallet {
  _id: string;
  description: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  percentRentabilityWallet: number;
  percentPositionWallet: number;
  sumAmountAllWallet: number;
}

interface IDataWallet {
  getWalletByUser: IObjectWallet[];
}

const WalletModal = ({ onClose }: IWalletProps) => {
  const { color } = useContext(ThemeContext);
  const { handleSetWallet, wallet } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<String | null>(wallet);

  const [
    getWalletByUser,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IDataWallet>(GET_WALLET_BY_USER, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getWalletByUser();
    }, []),
  );

  const handleSelectWallet = useCallback(
    (walletID: string, walletName: string) => {
      setSelectedWallet(walletID);
      handleSetWallet(walletID, walletName);
      onClose();
    },
    [],
  );

  return queryLoading ? (
    <Loading />
  ) : (
    <>
      <ShadowBackdrop />
      <Wrapper>
        <Title accessibilityRole="header">Carteiras</Title>
        <ListTicket
          data={data?.getWalletByUser}
          extraData={!!queryLoading}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              handleSelectWallet={handleSelectWallet}
              selectedWallet={selectedWallet}
            />
          )}
        />
        {!!queryError && <TextError>{queryError?.message}</TextError>}

        <AddWalletContainer>
          <BackButtonContainer onPress={onClose}>
            <BackIcon>
              <AntDesign name="closecircleo" size={16} color={color.subtitle} />
            </BackIcon>
            <BackButton accessibilityRole="button">Fechar Modal</BackButton>
          </BackButtonContainer>

          <AddButtonContainer onPress={() => setOpenModal(true)}>
            <Label accessibilityRole="button">Adicionar Carteira</Label>
            <AddButton size={40} />
          </AddButtonContainer>
        </AddWalletContainer>
      </Wrapper>

      {openModal && (
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
      )}
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
