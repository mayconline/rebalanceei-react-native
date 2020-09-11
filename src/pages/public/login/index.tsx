import React from 'react';
import { useAuth } from '../../../contexts/authContext';

import { Wrapper, ButtonContainer, ButtonText } from './styles';

const Login: React.FC = () => {
  const { handleSignIn } = useAuth();

  return (
    <Wrapper>
      <ButtonContainer onPress={handleSignIn}>
        <ButtonText>Logar</ButtonText>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Login;
