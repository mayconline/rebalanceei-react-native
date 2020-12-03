import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  Content,
  Card,
  CardContent,
  CardTitleContainer,
  CardTicket,
  CardTitle,
  SubTitleContant,
  CardSubTitle,
  CurrentPercent,
  TargetPercent,
  ProgressBar,
  AmountContainer,
  Amount,
  Status,
  VariationContainer,
} from './styles';

import {
  formatNumber,
  formatTicket,
  formatStatus,
  formatProgress,
} from '../../utils/format';

import { IRebalances } from './index';

const ListItem = ({ item }: { item: IRebalances }) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Content>
      <Card colors={gradient.lightToGray} status={item.status}>
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
            <CardSubTitle>
              <CurrentPercent
                accessibilityLabel="Porcentagem atual do ativo"
                accessibilityValue={{ now: item.currentPercent }}
              >
                {` % Atual: ${item.currentPercent.toFixed(1)} %`}
              </CurrentPercent>
              <TargetPercent
                accessibilityLabel="Porcentagem ideal do ativo"
                accessibilityValue={{ now: item.gradePercent }}
                status={item.status}
              >
                {` % Ideal: ${item.gradePercent.toFixed(1)} %`}
              </TargetPercent>
            </CardSubTitle>
            <ProgressBar
              styleAttr="Horizontal"
              indeterminate={false}
              progress={formatProgress(item.gradePercent, item.currentPercent)}
              color={color.blue}
            />
          </SubTitleContant>
        </CardContent>
        <AmountContainer>
          <VariationContainer>
            <Status
              accessibilityLabel="Status do ativo"
              accessibilityValue={{ text: item.status }}
              status={item.status}
            >
              {formatStatus(item.status)}
            </Status>
          </VariationContainer>
          <Amount
            accessibilityLabel="Valor para rebalancear o ativo na carteira"
            accessibilityValue={{ now: item.targetAmount }}
            status={item.status}
          >
            {formatNumber(item.targetAmount)}
          </Amount>
        </AmountContainer>
      </Card>
    </Content>
  );
};

export default React.memo(ListItem);
