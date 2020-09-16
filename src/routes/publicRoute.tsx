import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/public/Welcome';
import Register from '../pages/public/Register';
import Login from '../pages/public/Login';

const Stack = createStackNavigator();

const publicRoute: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default publicRoute;
