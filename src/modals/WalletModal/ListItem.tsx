import React from 'react';

import {
  Content,
  Card,
  CardTitleContainer,
  WalletTitle,
  CardSubTitle,
  CurrentAmount,
  VariationPercent,
  PercentWallet,
  PercentTitle,
  CurrentPercent,
  WalletRadioSelect,
} from './styles';

import Divider from '../../components/Divider';
import { IObjectWallet } from './index';
import { formatNumber, formatPercent } from '../../utils/format';

interface IListItem {
  item: IObjectWallet;
  handleSelectWallet(id: string, description: string): void;
  selectedWallet: String | null;
}

const ListItem = ({ item, handleSelectWallet, selectedWallet }: IListItem) => {
  return (
    <Content>
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
    </Content>
  );
};

export default React.memo(ListItem);
