import React, { useContext, useState } from 'react';
import { Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
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

import WalletModal from '../WalletModal';

const Header: React.FC = () => {
  const { handleSignOut, walletName } = useAuth();
  const { color, gradient } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Wrapper colors={gradient.darkToLightGreen}>
        <MenuBar>
          <Wallet onPress={() => setOpenModal(true)}>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {walletName ?? 'Selecionar Carteira'}
            </Title>
            <Entypo
              name="chevron-thin-down"
              size={20}
              color={color.secondary}
            />
          </Wallet>
          <Icons>
            <Visibled>
              <Entypo name="eye-with-line" size={20} color={color.secondary} />
            </Visibled>
            <Menu onPress={handleSignOut}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={color.secondary}
              />
            </Menu>
          </Icons>
        </MenuBar>
      </Wrapper>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        statusBarTranslucent={true}
      >
        <WalletModal onClose={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};

export default Header;
