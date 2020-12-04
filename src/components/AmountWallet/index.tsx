import React, { useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useLazyQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
import {
  Wrapper,
  Card,
  WalletContainer,
  PreviousContainer,
  PreviousTitle,
  PreviousAmount,
  CurrentContainer,
  CurrentTitle,
  CurrentAmountContainer,
  CurrentAmount,
  VariationAmount,
} from './styles';

import { formatNumber, formatPercent } from '../../utils/format';
import TextError from '../TextError';

interface IWallet {
  _id: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  percentRentabilityWallet: number;
}

interface IDataTickets {
  getWalletById: IWallet;
}

const AmountWallet = () => {
  const { color, gradient } = useContext(ThemeContext);

  const { wallet } = useAuth();

  const [
    getWalletById,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IDataTickets>(GET_WALLET_BY_ID, {
    variables: { _id: wallet },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      getWalletById();
    }, [wallet]),
  );

  const isPositive = data && data?.getWalletById?.percentRentabilityWallet > 0;

  return queryLoading ? (
    <ActivityIndicator size="small" color={color.bgHeaderEmpty} />
  ) : (
    <Wrapper>
      {!!queryError && (
        <TextError isTabs={true}>{queryError?.message}</TextError>
      )}
      <Card colors={gradient.lightToGray} isPositive={isPositive}>
        <WalletContainer>
          <PreviousContainer>
            <PreviousTitle>Saldo Aplicado</PreviousTitle>
            <PreviousAmount
              accessibilityLabel="Saldo aplicado na carteira"
              accessibilityValue={{ now: data?.getWalletById?.sumCostWallet }}
            >
              {data && formatNumber(data.getWalletById.sumCostWallet)}
            </PreviousAmount>
          </PreviousContainer>
          <CurrentContainer>
            <CurrentTitle>Saldo Atual</CurrentTitle>
            <CurrentAmountContainer>
              <CurrentAmount
                accessibilityLabel="Saldo atual da carteira"
                accessibilityValue={{
                  now: data?.getWalletById?.sumAmountWallet,
                }}
              >
                {data && formatNumber(data?.getWalletById?.sumAmountWallet)}
              </CurrentAmount>

              <VariationAmount
                accessibilityLabel="Percentual de variação da carteira"
                accessibilityValue={{
                  now: data?.getWalletById?.percentRentabilityWallet,
                }}
                isPositive={isPositive}
              >
                {data &&
                  formatPercent(data?.getWalletById?.percentRentabilityWallet)}
              </VariationAmount>
            </CurrentAmountContainer>
          </CurrentContainer>
        </WalletContainer>
      </Card>
    </Wrapper>
  );
};

export const GET_WALLET_BY_ID = gql`
  query getWalletById($_id: ID!) {
    getWalletById(_id: $_id) {
      _id
      sumCostWallet
      sumAmountWallet
      percentRentabilityWallet
    }
  }
`;

export default React.memo(AmountWallet);
