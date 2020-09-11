import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/public/Welcome';
import Register from '../pages/public/Register';

const Stack = createStackNavigator();

const publicRoute: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default publicRoute;
