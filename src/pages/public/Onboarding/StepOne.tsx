import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

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

import OnboardingImgOne from '../../../../assets/svg/OnboardingImgOne';

const StepOne = () => {
  const { gradient } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('StepTwo');
  };

  return (
    <Wrapper>
      <Header>
        <ContainerTextLink onPress={() => navigation.navigate('SignUp')}>
          <TextLink>Pular</TextLink>
        </ContainerTextLink>
      </Header>
      <Image>
        <OnboardingImgOne />
      </Image>
      <StepContainer>
        <Step>
          <ContainerIndicator>
            <StepIndicator active={true} />
            <StepIndicator />
            <StepIndicator />
          </ContainerIndicator>
          <ContainerTitle>
            <Title>Bem vindo ao Rebalanceei</Title>
            <Subtitle>Rebalanceeie seus ativos em sua carteira!</Subtitle>
            <Subtitle>É simples e fácil!</Subtitle>
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

export default StepOne;
