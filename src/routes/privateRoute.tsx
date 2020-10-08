import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';

import AddButton from '../components/AddButton';

import Ticket from '../pages/Ticket';
import Rebalance from '../pages/Rebalance';
import AddTicket from '../pages/AddTicket';
import Rentability from '../pages/Rentability';
import Chart from '../pages/Chart';

interface labelProps {
  focused: boolean;
  color: string;
}

const Label = styled.Text<labelProps>`
  color: ${({ color }) => color};
  border-bottom-width: ${({ focused }) => (focused ? '2px' : 0)};
  border-bottom-color: ${({ color }) => color};
  font: 600 12px/16px 'TitilliumWeb_600SemiBold';
`;

const Tab = createBottomTabNavigator();

interface propIcons {
  lib: any;
  name: string;
  title: string;
}

type Icons = {
  [key: string]: propIcons;
};

const icons: Icons = {
  Ticket: {
    lib: Entypo,
    name: 'wallet',
    title: 'Ativos',
  },
  Rebalance: {
    lib: Feather,
    name: 'trending-up',
    title: 'Rebalancear',
  },
  Rentability: {
    lib: Feather,
    name: 'activity',
    title: 'Variação',
  },
  Chart: {
    lib: FontAwesome,
    name: 'pie-chart',
    title: 'Gráficos',
  },
};

const privateRoute: React.FC = () => {
  const { color } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      lazy={false}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'AddTicket') {
            return (
              <AddButton
                onPress={() => navigation.navigate('AddTicket')}
                focused={focused}
                size={60}
                mb={24}
              />
            );
          }

          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
        tabBarLabel: ({ color, focused }) => {
          if (route.name === 'AddTicket') {
            return null;
          }

          const { title } = icons[route.name];

          return (
            <Label color={color} focused={focused}>
              {title}
            </Label>
          );
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: color.primary,
          borderTopColor: color.divider,
          padding: 4,
        },
        activeTintColor: color.secondary,
        inactiveTintColor: color.inactiveTabs,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          title: 'Ativos',
        }}
      />
      <Tab.Screen
        name="Rebalance"
        component={Rebalance}
        options={{
          title: 'Rebalancear',
        }}
      />
      <Tab.Screen
        name="AddTicket"
        component={AddTicket}
        options={{
          title: '',
        }}
      />
      <Tab.Screen
        name="Rentability"
        component={Rentability}
        options={{
          title: 'Variação',
        }}
      />
      <Tab.Screen
        name="Chart"
        component={Chart}
        options={{
          title: 'Gráficos',
        }}
      />
    </Tab.Navigator>
  );
};
export default privateRoute;
