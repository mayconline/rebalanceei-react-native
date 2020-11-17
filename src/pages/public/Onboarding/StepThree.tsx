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

import OnboardingImgThree from '../../../../assets/svg/OnboardingImgThree';

const StepThree = () => {
  const { gradient } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Wrapper>
      <Header>
        <ContainerTextLink onPress={handleNext}>
          <TextLink>Pular</TextLink>
        </ContainerTextLink>
      </Header>
      <Image>
        <OnboardingImgThree />
      </Image>
      <StepContainer>
        <Step>
          <ContainerIndicator>
            <StepIndicator />
            <StepIndicator />
            <StepIndicator active={true} />
          </ContainerIndicator>
          <ContainerTitle>
            <Title>Acompanhe de perto sua carteira</Title>
            <Subtitle>
              Veja a variação de seus ativos e rebalanceeie eles como desejar!
            </Subtitle>
          </ContainerTitle>
          <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
            <Button onPress={handleNext}>
              <TextButton>Vamos Começar</TextButton>
            </Button>
          </Gradient>
        </Step>
      </StepContainer>
    </Wrapper>
  );
};

export default StepThree;
