import React, { Fragment, useState, useMemo, useCallback } from 'react';
import { PieChart, PieChartData } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { useAuth } from '../../contexts/authContext';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { Wrapper, Content, ContainerGraph } from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

import { formatTicket } from '../../utils/format';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';

interface IRebalances {
  _id: string;
  symbol: string;
  currentPercent: number;
}

interface IDataTickets {
  rebalances: IRebalances[];
}

const randomDarkColor = () => {
  var lum = -0.25;
  var hex = String(
    '#' + Math.random().toString(16).slice(2, 8).toUpperCase(),
  ).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
};

const Chart: React.FC = () => {
  const [select, setSelect] = useState('');
  const [dataGraph, setDataGraph] = useState<PieChartData[]>([]);

  const { wallet } = useAuth();

  const [rebalances, { data, loading: queryLoading, error }] = useLazyQuery<
    IDataTickets
  >(REBALANCES, {
    variables: { walletID: wallet, sort: 'currentPercent' },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      rebalances();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      if (data?.rebalances) {
        let formatedPie: PieChartData[] = data.rebalances.map(item => ({
          value: Number(item.currentPercent.toFixed(1)),
          svg: {
            fill: randomDarkColor(),
            onPress: () => setSelect(item.symbol),
          },
          key: formatTicket(item.symbol),
          arc: {
            outerRadius: select === item.symbol ? '108%' : '100%',
            cornerRadius: 8,
          },
        }));

        setDataGraph(formatedPie);
      }
    }, [select, data]),
  );

  const hasTickets = wallet && !queryLoading && !!data?.rebalances?.length;

  const Labels = ({ slices }) => {
    return slices?.map(slice => {
      const { pieCentroid, data } = slice;
      return (
        <Fragment key={data.key}>
          <Text
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'after-edge'}
            fontSize={12}
            stroke={'black'}
            strokeWidth={0.1}
          >
            {`${data.value}%`}
          </Text>
          <Text
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'top'}
            fontSize={12}
            stroke={'black'}
            strokeWidth={0.1}
          >
            {data.key}
          </Text>
        </Fragment>
      );
    });
  };

  return queryLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header />
      {!hasTickets ? (
        <Empty />
      ) : (
        <>
          <SubHeader title="Gráficos" onPress={() => {}} />
          <Content>
            <ContainerGraph>
              <PieChart
                style={{ height: 284 }}
                data={dataGraph}
                valueAccessor={({ item }) => item.value}
                outerRadius={'92%'}
                innerRadius={'48%'}
                numberOfTicks={dataGraph?.length}
              >
                <Labels />
              </PieChart>
            </ContainerGraph>
          </Content>
        </>
      )}
    </Wrapper>
  );
};

const REBALANCES = gql`
  query rebalances($walletID: ID!, $sort: SortRebalance!) {
    rebalances(walletID: $walletID, sort: $sort) {
      _id
      symbol
      currentPercent
    }
  }
`;

export default Chart;
