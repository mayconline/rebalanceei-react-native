import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {
  Wrapper,
  Main,
  Image,
  ContainerTitle,
  Subtitle,
  Footer,
  Gradient,
  Button,
  TextButton,
} from './styles';

import ImageEmpty from '../../../assets/svg/ImageEmpty';

const Empty: React.FC = () => {
  const { gradient } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Main>
        <Image>
          <ImageEmpty />
        </Image>
        <ContainerTitle>
          <Subtitle>Adicione um ativo dando uma nota para ele.</Subtitle>
          <Subtitle>
            Usaremos essa nota para calcular a % ideal desse ativo nessa
            carteira.
          </Subtitle>
        </ContainerTitle>
      </Main>
      <Footer>
        <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
          <Button onPress={() => navigation.navigate('AddTicket')}>
            <TextButton>Adicionar Ativo</TextButton>
          </Button>
        </Gradient>
      </Footer>
    </Wrapper>
  );
};

export default Empty;
