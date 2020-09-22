import React from 'react';

import { Wrapper, Header, Image, ContainerTitle, SubTitle } from './styles';

import ImageOffline from '../../../assets/svg/ImageOffline';

const Offline: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Image>
          <ImageOffline />
        </Image>
        <ContainerTitle>
          <SubTitle>Sem conexão com a internet</SubTitle>
        </ContainerTitle>
      </Header>
    </Wrapper>
  );
};

export default Offline;
