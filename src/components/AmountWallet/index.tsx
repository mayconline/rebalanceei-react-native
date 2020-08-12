import React from 'react';

import {
  Wrapper,
  WalletContainer,
  Title,
  PreviousContainer,
  PreviousTitle,
  PreviousAmount,
  CurrentContainer,
  CurrentTitle,
  CurrentAmount,
} from './styles';

import { formatNumber } from '../../utils/format';

const AmountWallet: React.FC = () => {
  return (
    <Wrapper>
      <Title>Carteira</Title>
      <WalletContainer>
        <PreviousContainer>
          <PreviousTitle>Saldo Aplicado</PreviousTitle>
          <PreviousAmount>{formatNumber(10900.0, 'BRL')}</PreviousAmount>
        </PreviousContainer>
        <CurrentContainer>
          <CurrentTitle>Saldo Atual</CurrentTitle>
          <CurrentAmount>{formatNumber(712351.08, 'BRL')}</CurrentAmount>
        </CurrentContainer>
      </WalletContainer>
    </Wrapper>
  );
};

export default AmountWallet;
