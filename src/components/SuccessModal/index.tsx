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

interface ISuccessModal {
  onClose(): void;
  beforeModalClose(): void;
}

const SuccessModal: React.FC<ISuccessModal> = ({
  onClose,
  beforeModalClose,
}) => {
  const { color, gradient } = useContext(ThemeContext);

  const handleClose = () => {
    beforeModalClose();
    onClose();
  };

  return (
    <Wrapper>
      <ContainerTitle>
        <Title>Cadastrado com sucesso</Title>
      </ContainerTitle>

      <LootieContainer>
        <LottieView
          style={{
            backgroundColor: color.secondary,
          }}
          source={require('../../../assets/looties/success-lootie.json')}
          autoPlay
          loop={false}
        />
      </LootieContainer>

      <Gradient colors={gradient.lightToDarkGreen} start={[1, 0.5]}>
        <BackButtonContainer onPress={handleClose}>
          <BackButton>Voltar</BackButton>
        </BackButtonContainer>
      </Gradient>
    </Wrapper>
  );
};

export default SuccessModal;
