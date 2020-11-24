import React, { useContext, useState } from 'react';
import { Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { Entypo } from '@expo/vector-icons';

import { Wrapper, Wallet, Title, Icons, Menu, MenuBar } from './styles';

import WalletModal from '../../modals/WalletModal';
import MenuModal from '../../modals/MenuModal';

const Header: React.FC = () => {
  const { walletName } = useAuth();
  const { color, gradient } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
            <Menu onPress={() => setOpenMenu(true)}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={openMenu}
        statusBarTranslucent={true}
      >
        <MenuModal onClose={() => setOpenMenu(false)} />
      </Modal>
    </>
  );
};

export default Header;
