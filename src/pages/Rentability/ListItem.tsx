import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

import {
  Content,
  CardTitleContainer,
  CardTicket,
  Card,
  CardContent,
  CardTitle,
  SubTitleContant,
  CardSubTitle,
  CardSubTitleLegend,
  AmountContainer,
  Amount,
  Variation,
  VariationContainer,
} from './styles';

import { FontAwesome5 } from '@expo/vector-icons';
import { formatNumber, formatPercent, formatTicket } from '../../utils/format';
import { IGetRentability } from './index';

const ListItem = ({ item }: { item: IGetRentability }) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Content>
      <Card colors={gradient.lightToGray} variation={item.variationPercent}>
        <CardContent>
          <CardTitleContainer>
            <CardTicket
              accessibilityLabel="Código do Ativo"
              accessibilityValue={{ text: item.symbol }}
            >
              {formatTicket(item.symbol)}
            </CardTicket>
            <CardTitle
              accessibilityLabel="Nome do Ativo"
              accessibilityValue={{ text: item.longName }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {' '}
              - {formatTicket(item.longName)}
            </CardTitle>
          </CardTitleContainer>
          <SubTitleContant>
            <CardSubTitle
              accessibilityLabel="Saldo aplicado no ativo"
              accessibilityValue={{ now: item.costAmount }}
            >
              {formatNumber(item.costAmount)}
            </CardSubTitle>
            <CardSubTitleLegend>Saldo aplicado</CardSubTitleLegend>
          </SubTitleContant>
        </CardContent>
        <AmountContainer>
          <VariationContainer>
            <Variation
              accessibilityLabel="Porcentagem de variação do ativo"
              accessibilityValue={{ now: item.variationPercent }}
              variation={item.variationPercent}
            >
              {formatPercent(item.variationPercent)}
            </Variation>
            {item.variationPercent !== 0 && (
              <FontAwesome5
                name={item.variationPercent > 0 ? 'caret-up' : 'caret-down'}
                size={16}
                color={item.variationPercent > 0 ? color.success : color.danger}
              />
            )}
          </VariationContainer>
          <Amount
            accessibilityLabel="Saldo atual do ativo"
            accessibilityValue={{ now: item.currentAmount }}
            variation={item.variationPercent}
          >
            {formatNumber(item.currentAmount)}
          </Amount>
          <CardSubTitleLegend>Saldo atual</CardSubTitleLegend>
        </AmountContainer>
      </Card>
    </Content>
  );
};

export default React.memo(ListItem);
