import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import {
  Wrapper,
  Wallet,
  Title,
  Icons,
  Visibled,
  Menu,
  MenuBar,
} from './styles';

const Header: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <Wrapper colors={gradient.darkToLightGreen}>
      <MenuBar>
        <Wallet>
          <Title>Ações</Title>
          <Entypo name="chevron-thin-down" size={20} color={color.secondary} />
        </Wallet>
        <Icons>
          <Visibled>
            <Entypo name="eye-with-line" size={20} color={color.secondary} />
          </Visibled>
          <Menu>
            <Entypo
              name="dots-three-vertical"
              size={20}
              color={color.secondary}
            />
          </Menu>
        </Icons>
      </MenuBar>
    </Wrapper>
  );
};

export default Header;
