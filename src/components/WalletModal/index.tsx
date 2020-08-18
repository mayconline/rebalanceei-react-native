import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

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
  onClose?(): void;
}

const WalletModal: React.FC<WalletProps> = ({ onClose }) => {
  const { color } = useContext(ThemeContext);
  const [selectWallet, setSelectWallet] = useState(WALLET_LIST);

  const handleSelectWallet = (walletID: string) => {
    setSelectWallet(wallets =>
      wallets.map(wallet => ({
        ...wallet,
        checked: walletID !== wallet.id ? false : true,
      })),
    );
  };

  return (
    <>
      <ShadowBackdrop />
      <Wrapper>
        <Title>Carteiras</Title>

        <FlatList
          data={selectWallet}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <Card onPress={() => handleSelectWallet(item.id)}>
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
                  <CurrentPercent>{item.currentWalletPercent} %</CurrentPercent>
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

          <AddButtonContainer>
            <Label>Adicionar Carteira</Label>
            <AddButton size={40} />
          </AddButtonContainer>
        </AddWalletContainer>
      </Wrapper>
    </>
  );
};

export default WalletModal;
