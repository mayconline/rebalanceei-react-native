import React from 'react';
import { FlatList, TouchableOpacity, Modal } from 'react-native';
import {
  Wrapper,
  List,
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

interface IListItem {
  item: any;
  color: any;
  gradient: any;
  handleOpenEditModal(item: object): void;
}

const ListItem = ({
  item,
  color,
  gradient,
  handleOpenEditModal,
}: IListItem) => (
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

export default React.memo(ListItem);
