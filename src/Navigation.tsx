import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';

import PayButton from './components/PayButton';

import Ticket from './pages/Ticket';
import Rebalance from './pages/Rebalance';
import AddTicket from './pages/AddTicket';
import Rentability from './pages/Rentability';
import Chart from './pages/Chart';

const Tab = createBottomTabNavigator();

interface propIcons {
  lib: any;
  name: string;
}

type Icons = {
  [key: string]: propIcons;
};

const icons: Icons = {
  Ticket: {
    lib: Entypo,
    name: 'wallet',
  },
  Rebalance: {
    lib: Feather,
    name: 'trending-up',
  },
  Rentability: {
    lib: Feather,
    name: 'activity',
  },
  Chart: {
    lib: FontAwesome,
    name: 'pie-chart',
  },
};

const Navigation: React.FC = () => {
  const { color } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'AddTicket') {
            return (
              <PayButton
                onPress={() => navigation.navigate('AddTicket')}
                focused={focused}
                size={60}
              />
            );
          }

          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: color.primary,
          borderTopColor: color.divider,
        },
        activeTintColor: color.secondary,
        inactiveTintColor: color.inactiveTabs,
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
export default Navigation;
