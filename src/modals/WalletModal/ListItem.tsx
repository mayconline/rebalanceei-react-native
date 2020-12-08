import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  Content,
  ContainerCard,
  IconButton,
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Divider from '../../components/Divider';
import { IObjectWallet } from './index';
import { formatNumber, formatPercent } from '../../utils/format';

interface IListItem {
  item: IObjectWallet;
  handleSelectWallet(id: string, description: string): void;
  selectedWallet: String | null;
  handleEditWallet(id: string, description: string): void;
}

const ListItem = ({
  item,
  handleSelectWallet,
  selectedWallet,
  handleEditWallet,
}: IListItem) => {
  const { color } = useContext(ThemeContext);
  return (
    <Content>
      <ContainerCard>
        <IconButton
          accessibilityRole="button"
          accessibilityLabel={`Editar carteira ${item.description}`}
          onPress={() => handleEditWallet(item._id, item.description)}
        >
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={28}
            color={color.blue}
          />
        </IconButton>
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
      </ContainerCard>
      <Divider />
    </Content>
  );
};

export default React.memo(ListItem);
