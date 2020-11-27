import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {
  Content,
  Card,
  CardContent,
  CardTitleContainer,
  CardTicket,
  CardTitle,
  CardSubTitle,
  Grade,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatNumber, formatTicket } from '../../utils/format';
import { ITickets } from './index';

interface IListItem {
  item: ITickets;
  handleOpenEditModal(item: ITickets): void;
}

const ListItem = ({ item, handleOpenEditModal }: IListItem) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Content>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Editar ativo ${item.symbol}`}
        onPress={() => handleOpenEditModal(item)}
      >
        <Card colors={gradient.lightToGray} ticket={formatTicket(item.symbol)}>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={28}
            color={color.blue}
          />
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
                accessibilityValue={{ text: item.name }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {' '}
                - {formatTicket(item.name)}
              </CardTitle>
            </CardTitleContainer>
            <CardSubTitle
              accessibilityLabel="Quantidade e Preço Médio do Ativo"
              accessibilityValue={{
                text: `${item.quantity}x ${item.averagePrice}`,
              }}
            >
              {item.quantity}x {formatNumber(item.averagePrice)}
            </CardSubTitle>
          </CardContent>
          <Grade
            accessibilityLabel="Nota para o peso do ativo esperado pela carteira"
            accessibilityValue={{ now: item.grade }}
          >
            {item.grade}
          </Grade>
        </Card>
      </TouchableOpacity>
    </Content>
  );
};

export default React.memo(ListItem);
