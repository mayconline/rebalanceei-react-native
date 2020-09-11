import React from 'react';
import { useAuth } from '../../../contexts/authContext';

import { Wrapper, ButtonContainer, ButtonText } from './styles';

const Login: React.FC = () => {
  const { signed, user, handleSignIn } = useAuth();

  console.log(user, signed);

  return (
    <Wrapper>
      <ButtonContainer onPress={handleSignIn}>
        <ButtonText>Logar</ButtonText>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Login;
