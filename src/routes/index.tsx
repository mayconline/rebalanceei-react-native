import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/authContext';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return signed ? <PrivateRoute /> : <PublicRoute />;
};

export default Routes;
