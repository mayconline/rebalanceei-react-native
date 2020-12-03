import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { List } from './styles';

const ListTicket = (props: FlatListProps<any>) => {
  return (
    <List>
      <FlatList
        {...props}
        removeClippedSubviews={false}
        initialNumToRender={5}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={300}
        automaticallyAdjustContentInsets={false}
        style={{ flex: 0 }}
      />
    </List>
  );
};

export default React.memo(ListTicket);
