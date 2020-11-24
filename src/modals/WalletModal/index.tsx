import React, { useContext, useState, useCallback } from 'react';
import { FlatList, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { useLazyQuery, gql } from '@apollo/client';
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
import Loading from '../../components/Loading';
import TextError from '../../components/TextError';
import AddWalletModal from '../AddWalletModal';

import { formatNumber, formatPercent } from '../../utils/format';

interface IWalletProps {
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
    fetchPolicy: 'no-cache',
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
        <FlatList
          data={data?.getWalletByUser}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <>
              <Card
                onPress={() => handleSelectWallet(item._id, item.description)}
                accessibilityRole="radio"
                accessibilityLabel={item.description}
                accessibilityState={{ selected: item._id === selectedWallet }}
              >
                <CardTitleContainer>
                  <WalletTitle numberOfLines={1} ellipsizeMode="tail">
                    {item.description}
                  </WalletTitle>
                  <CardSubTitle>
                    <CurrentAmount
                      accessibilityLabel="Valor atual da carteira"
                      accessibilityValue={{ now: item.sumAmountWallet }}
                    >
                      {formatNumber(item.sumAmountWallet)}
                    </CurrentAmount>
                    <VariationPercent
                      value={item.percentRentabilityWallet}
                      accessibilityLabel="Percentual de valorização da carteira"
                      accessibilityValue={{
                        now: item.percentRentabilityWallet,
                      }}
                    >
                      {formatPercent(item.percentRentabilityWallet)}
                    </VariationPercent>
                  </CardSubTitle>
                </CardTitleContainer>

                <PercentWallet>
                  <PercentTitle>% da Carteira</PercentTitle>
                  <CurrentPercent
                    accessibilityLabel="Porcentagem atual do valor alocado na carteira"
                    accessibilityValue={{
                      now: item.percentPositionWallet,
                    }}
                  >
                    {`${item.percentPositionWallet.toFixed(0)}%`}
                  </CurrentPercent>
                </PercentWallet>

                <WalletRadioSelect selected={item._id === selectedWallet} />
              </Card>
              <Divider />
            </>
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
