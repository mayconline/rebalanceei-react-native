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
      <TouchableOpacity onPress={() => handleOpenEditModal(item)}>
        <Card colors={gradient.lightToGray} ticket={formatTicket(item.symbol)}>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={28}
            color={color.blue}
          />
          <CardContent>
            <CardTitleContainer>
              <CardTicket>{formatTicket(item.symbol)}</CardTicket>
              <CardTitle numberOfLines={1} ellipsizeMode="tail">
                {' '}
                - {formatTicket(item.name)}
              </CardTitle>
            </CardTitleContainer>
            <CardSubTitle>
              {item.quantity}x {formatNumber(item.averagePrice)}
            </CardSubTitle>
          </CardContent>
          <Grade>{item.grade}</Grade>
        </Card>
      </TouchableOpacity>
    </Content>
  );
};

export default React.memo(ListItem);
