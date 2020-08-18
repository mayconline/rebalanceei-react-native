import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components/native';

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
  BackButton,
  AddButton,
} from './styles';
import Divider from '../Divider';
import PayButton from '../PayButton';

const WALLET_LIST = [
  {
    id: '1',
    name: 'Ações',
    currentWalletAmount: '10521.00',
    currentWalletPercent: '70.5',
    variationWalletAmount: '7.1',
    checked: true,
  },
  {
    id: '2',
    name: 'Fundos Imobiliários',
    currentWalletAmount: '5231.03',
    currentWalletPercent: '70.5',
    variationWalletAmount: '3.1',
    checked: false,
  },
];

const WalletModal: React.FC = ({ onClose }) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Title>Carteiras</Title>

      <FlatList
        data={WALLET_LIST}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <Card>
              <CardTitleContainer>
                <WalletTitle>{item.name}</WalletTitle>
                <CardSubTitle>
                  <CurrentAmount>R$ {item.currentWalletAmount}</CurrentAmount>
                  <VariationPercent>
                    {' '}
                    (+{item.variationWalletAmount})
                  </VariationPercent>
                </CardSubTitle>
              </CardTitleContainer>

              <PercentWallet>
                <PercentTitle>% da Carteira</PercentTitle>
                <CurrentPercent>{item.currentWalletPercent}</CurrentPercent>
              </PercentWallet>
            </Card>
            <Divider />
          </>
        )}
      />

      <AddWalletContainer>
        <TouchableOpacity>
          <BackButton onPress={onClose}>Voltar</BackButton>
        </TouchableOpacity>
        <AddButton>
          <Label>Adicionar Carteira</Label>
          <PayButton size={40} />
        </AddButton>
      </AddWalletContainer>
    </Wrapper>
  );
};

export default WalletModal;
