import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/public/login';
import Register from '../pages/public/register';

const Stack = createStackNavigator();

const publicRoute: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default publicRoute;
