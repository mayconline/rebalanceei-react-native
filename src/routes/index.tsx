import React from 'react';
import { useAuth } from '../contexts/authContext';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import Loading from '../components/Loading';
import Offline from '../components/Offline';

const Routes: React.FC = () => {
  const { signed, loading, isConnected } = useAuth();

  if (!isConnected) return <Offline />;

  if (loading) {
    return <Loading />;
  }

  return signed ? <PrivateRoute /> : <PublicRoute />;
};

export default Routes;
