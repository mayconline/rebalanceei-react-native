import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

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

const Welcome = () => {
  const navigation = useNavigation();

  const handleEnter = useCallback(() => {
    navigation.navigate('StepOne');
  }, []);

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
        <ButtonContainer onPress={handleEnter}>
          <ButtonText>Entrar</ButtonText>
        </ButtonContainer>
      </Footer>
    </Wrapper>
  );
};

export default Welcome;
