import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Wrapper,
  Header,
  Image,
  ContainerTitle,
  SubTitle,
  Footer,
} from './styles';

import LoadingImage from '../../../assets/svg/LoadingImage';

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <ActivityIndicator size="large" color="#fff" />
      </Header>

      <Footer>
        <Image>
          <LoadingImage />
        </Image>
        <ContainerTitle>
          <SubTitle>Carregando ...</SubTitle>
        </ContainerTitle>
      </Footer>
    </Wrapper>
  );
};

export default Loading;
