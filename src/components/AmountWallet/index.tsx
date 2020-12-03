import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { useQuery, gql } from '@apollo/client';
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
  CurrentAmount,
  VariationAmount,
} from './styles';

import { formatNumber, formatPercent } from '../../utils/format';

interface IWallet {
  _id: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  percentRentabilityWallet: number;
}

interface IDataTickets {
  getWalletById: IWallet;
}

const AmountWallet: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);

  const { wallet } = useAuth();

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery<IDataTickets>(GET_WALLET_BY_ID, {
    variables: { _id: wallet },
    fetchPolicy: 'cache-and-network',
  });

  const isPositive =
    data && data?.getWalletById?.percentRentabilityWallet > 0 ? true : false;

  return queryLoading ? (
    <ActivityIndicator size="small" color={color.bgHeaderEmpty} />
  ) : (
    <Wrapper>
      <Card colors={gradient.lightToGray} isPositive={isPositive}>
        <WalletContainer>
          <PreviousContainer>
            <PreviousTitle>Saldo Aplicado</PreviousTitle>
            <PreviousAmount>
              {data && formatNumber(data.getWalletById.sumCostWallet)}
            </PreviousAmount>
          </PreviousContainer>
          <CurrentContainer>
            <CurrentTitle>Saldo Atual</CurrentTitle>
            <CurrentAmount>
              {data && formatNumber(data?.getWalletById?.sumAmountWallet)}
              <VariationAmount isPositive={isPositive}>
                {data &&
                  formatPercent(data?.getWalletById?.percentRentabilityWallet)}
              </VariationAmount>
            </CurrentAmount>
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

export default AmountWallet;
