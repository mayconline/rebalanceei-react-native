import React from 'react';
import { useAuth } from '../../../contexts/authContext';

import {
  Wrapper,
  Header,
  Logo,
  ContainerTitle,
  Title,
  SubTitle,
  Footer,
  ButtonContainer,
  ButtonText,
} from './styles';

import RebalanceeiLogo from '../../../../assets/svg/RebalanceeiLogo';

const Welcome: React.FC = () => {
  const { handleSignIn } = useAuth();

  return (
    <Wrapper>
      <Header>
        <Logo>
          <RebalanceeiLogo />
        </Logo>
        <ContainerTitle>
          <SubTitle>Seja Bem Vindo</SubTitle>
          <Title>REBALANCEEI</Title>
        </ContainerTitle>
      </Header>
      <Footer>
        <ButtonContainer onPress={handleSignIn}>
          <ButtonText>Entrar</ButtonText>
        </ButtonContainer>
      </Footer>
    </Wrapper>
  );
};

export default Welcome;
