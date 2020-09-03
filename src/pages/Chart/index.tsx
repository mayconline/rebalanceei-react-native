import React, { Fragment, useState, useMemo } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

import { Wrapper, Content, ContainerGraph } from './styles';

import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

const CARD_LIST = [
  {
    title: 'Lojas Renner',
    ticket: 'LREN3',
    subTitle: '+40.5%',
    amount: 40070.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.1,
  },
  {
    title: 'Transmissão Paulista',
    ticket: 'TRPL4',
    subTitle: '+10.5%',
    amount: 10.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.05,
  },
  {
    title: 'Engie',
    ticket: 'EGIE3',
    subTitle: '+0.5%',
    amount: 210.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.06,
  },
  {
    title: 'Cshg Logistica',
    ticket: 'HGLG11',
    subTitle: '+50.5%',
    amount: 400.2454,
    status: 'BUY',
    financialCurrency: 'BRL',
    percent: 0.04,
  },
  {
    title: 'Alphabet Inc.',
    ticket: 'GOOG',
    subTitle: '+0%',
    amount: 0,
    status: 'KEEP',
    financialCurrency: 'USD',
    percent: 0.02,
  },
  {
    title: 'Magazine Luiza SA.',
    ticket: 'MGLU3',
    subTitle: '-2.3%',
    amount: -300.78124,
    status: 'ANALIZE',
    financialCurrency: 'BRL',
    percent: 0.03,
  },
];

const randomColor = () =>
  ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

const Chart: React.FC = () => {
  const [select, setSelect] = useState('');

  const pieData = CARD_LIST?.map(data => ({
    value: data.percent * 100,
    svg: {
      fill: useMemo(() => randomColor(), []),
      onPress: () => setSelect(data.ticket),
    },
    key: data.ticket,
    arc: {
      outerRadius: select === data.ticket ? '108%' : '100%',
      cornerRadius: 8,
    },
  }));

  const Labels = ({ slices }) => {
    return slices.map(slice => {
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

  return (
    <Wrapper>
      <Header />
      <SubHeader title="Gráficos" onPress={() => {}} />
      <Content>
        <ContainerGraph>
          <PieChart
            style={{ height: 284 }}
            data={pieData}
            valueAccessor={({ item }) => item.value}
            outerRadius={'92%'}
            innerRadius={'48%'}
            numberOfTicks={pieData.length}
          >
            <Labels />
          </PieChart>
        </ContainerGraph>
      </Content>
    </Wrapper>
  );
};

export default Chart;
