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
} from './styles';

import ImageEmpty from '../../../assets/svg/ImageEmpty';
import Button from '../../components/Button';

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
          <Subtitle accessibilityRole="header">
            Adicione um ativo dando uma nota para ele.
          </Subtitle>
          <Subtitle accessibilityRole="text">
            Usaremos essa nota para calcular a % ideal desse ativo nessa
            carteira.
          </Subtitle>
        </ContainerTitle>
      </Main>
      <Footer>
        <Button
          colors={gradient.darkToLightBlue}
          start={[1, 0.5]}
          onPress={() => navigation.navigate('AddTicket')}
        >
          Adicionar Ativo
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default Empty;
