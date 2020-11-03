import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/authContext';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import {
  Wrapper,
  StepContainer,
  Step,
  ContainerIndicator,
  StepIndicator,
  ContainerTitle,
  Image,
  Header,
  Title,
  Subtitle,
  Button,
  Gradient,
  TextButton,
  ContainerTextLink,
  TextLink,
} from './styles';

import OnboardingImgTwo from '../../../../assets/svg/OnboardingImgTwo';

const StepTwo = () => {
  const { gradient } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('StepThree');
  };

  return (
    <Wrapper>
      <Header>
        <ContainerTextLink onPress={() => navigation.navigate('SignIn')}>
          <TextLink>Pular</TextLink>
        </ContainerTextLink>
      </Header>
      <Image>
        <OnboardingImgTwo />
      </Image>
      <StepContainer>
        <Step>
          <ContainerIndicator>
            <StepIndicator />
            <StepIndicator active={true} />
            <StepIndicator />
          </ContainerIndicator>
          <ContainerTitle>
            <Title>Adicione seus ativos e dê notas a eles</Title>
            <Subtitle>
              Usamos elas para verificar a % ideal de cada ativo baseado em suas
              preferências!
            </Subtitle>
          </ContainerTitle>
          <Gradient colors={gradient.lightToGray} start={[1, 0.5]}>
            <Button onPress={handleNext} next={true}>
              <TextButton next={true}>Próximo</TextButton>
            </Button>
          </Gradient>
        </Step>
      </StepContainer>
    </Wrapper>
  );
};

export default StepTwo;
