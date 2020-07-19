import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import { Wrapper, Wallet, Title, Icons, Visibled, Menu } from './styles';

const Header: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Wrapper colors={gradient.darkToLightGreen}>
      <Wallet>
        <Title>Ações</Title>
        <Entypo name="chevron-thin-down" size={20} color={color.iconHeader} />
      </Wallet>
      <Icons>
        <Visibled>
          <Entypo name="eye-with-line" size={20} color={color.iconHeader} />
        </Visibled>
        <Menu>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={color.iconHeader}
          />
        </Menu>
      </Icons>
    </Wrapper>
  );
};

export default Header;
