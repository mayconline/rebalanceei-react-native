import React from 'react';

import {
  Wrapper,
  WalletContainer,
  PreviousContainer,
  PreviousTitle,
  PreviousAmount,
  CurrentContainer,
  CurrentTitle,
  CurrentAmount,
  VariationAmount,
} from './styles';

import { formatNumber } from '../../utils/format';

const AmountWallet: React.FC = () => {
  return (
    <Wrapper>
      <WalletContainer>
        <PreviousContainer>
          <PreviousTitle>Saldo Aplicado Mockado</PreviousTitle>
          <PreviousAmount>{formatNumber(10900.0, 'BRL')}</PreviousAmount>
        </PreviousContainer>
        <CurrentContainer>
          <CurrentTitle>Saldo Atual</CurrentTitle>
          <CurrentAmount>
            {formatNumber(712351.08, 'BRL')}
            <VariationAmount> (+5.21%)</VariationAmount>
          </CurrentAmount>
        </CurrentContainer>
      </WalletContainer>
    </Wrapper>
  );
};

export default AmountWallet;
