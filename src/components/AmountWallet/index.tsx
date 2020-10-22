import React from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
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

import { formatNumber, formatPercent } from '../../utils/format';
import Loading from '../Loading';

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
  const { wallet } = useAuth();

  const { data, loading: queryLoading, error } = useQuery<IDataTickets>(
    GET_WALLET_BY_ID,
    {
      variables: { _id: wallet },
      fetchPolicy: 'cache-and-network',
    },
  );
  return queryLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <WalletContainer>
        <PreviousContainer>
          <PreviousTitle>Saldo Aplicado</PreviousTitle>
          <PreviousAmount>
            {formatNumber(data?.getWalletById?.sumCostWallet)}
          </PreviousAmount>
        </PreviousContainer>
        <CurrentContainer>
          <CurrentTitle>Saldo Atual</CurrentTitle>
          <CurrentAmount>
            {formatNumber(data?.getWalletById?.sumAmountWallet)}
            <VariationAmount>
              {formatPercent(data?.getWalletById?.percentRentabilityWallet)}
            </VariationAmount>
          </CurrentAmount>
        </CurrentContainer>
      </WalletContainer>
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
