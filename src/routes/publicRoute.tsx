import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/public/Welcome';
import Register from '../pages/public/Register';
import Login from '../pages/public/Login';
import StepOne from '../pages/public/Onboarding/StepOne';
import StepTwo from '../pages/public/Onboarding/StepTwo';
import StepThree from '../pages/public/Onboarding/StepThree';

const Stack = createStackNavigator();

const publicRoute: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StepOne" component={StepOne} />
      <Stack.Screen name="StepTwo" component={StepTwo} />
      <Stack.Screen name="StepThree" component={StepThree} />
    </Stack.Navigator>
  );
};

export default publicRoute;
