import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  Wrapper,
  ContainerTitle,
  Title,
  BackButtonContainer,
  BackButton,
  LootieContainer,
  Gradient,
} from './styles';
import LottieView from 'lottie-react-native';
import ImageSuccess from '../../../assets/svg/ImageSuccess';

interface ISuccessModal {
  onClose?(): void;
}

const SuccessModal: React.FC<ISuccessModal> = ({ onClose }) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Wrapper>
      <ContainerTitle>
        <Title>Cadastrado com sucesso</Title>
      </ContainerTitle>

      <LootieContainer>
        <LottieView
          style={{
            backgroundColor: '#fff',
          }}
          source={require('../../../assets/looties/success-lootie.json')}
          autoPlay
          loop={false}
        />
      </LootieContainer>

      <Gradient colors={gradient.lightToDarkGreen} start={[1, 0.5]}>
        <BackButtonContainer onPress={onClose}>
          <BackButton>Voltar</BackButton>
        </BackButtonContainer>
      </Gradient>
    </Wrapper>
  );
};

export default SuccessModal;
