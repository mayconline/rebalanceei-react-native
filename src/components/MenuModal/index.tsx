import React, { Fragment, useState } from 'react';
import { Modal } from 'react-native';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
} from '@expo/vector-icons';
import { useAuth } from '../../contexts/authContext';
import { getTerms } from '../../utils/Terms';
import Divider from '../Divider';
import ShadowBackdrop from '../ShadowBackdrop';
import UpdateUserModal from '../UpdateUserModal';

import {
  Wrapper,
  TitleContainer,
  Title,
  BackIcon,
  MenuContainer,
  Menu,
  MenuIcon,
  MenuTitle,
} from './styles';

const menuItens = [
  {
    lib: MaterialCommunityIcons,
    icon: 'face-profile',
    description: 'Meus Dados',
  },
  {
    lib: MaterialCommunityIcons,
    icon: 'crown',
    description: 'Meu Plano Atual',
  },
  {
    lib: MaterialCommunityIcons,
    icon: 'shield-check',
    description: 'Termos de Uso',
  },
  {
    lib: FontAwesome,
    icon: 'question-circle',
    description: 'Ajuda',
  },
  {
    lib: Octicons,
    icon: 'versions',
    description: 'Versão do APP - v0.0.1',
  },
  {
    lib: AntDesign,
    icon: 'logout',
    description: 'Sair',
  },
];

interface MenuProps {
  onClose(): void;
}

const MenuModal = ({ onClose }: MenuProps) => {
  const { handleSignOut } = useAuth();
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleClickMenu = (description: string) => {
    switch (description) {
      case 'Meus Dados':
        return setOpenUserModal(true);
      case 'Meu Plano Atual':
        return;
      case 'Termos de Uso':
        return getTerms();
      case 'Ajuda':
        return;
      case 'Versão do APP - v0.0.1':
        return;
      case 'Sair':
        return handleSignOut();
      default:
        return;
    }
  };

  return (
    <>
      <ShadowBackdrop />
      <Wrapper>
        <TitleContainer>
          <Title>Menu</Title>
          <BackIcon onPress={onClose}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </BackIcon>
        </TitleContainer>

        <MenuContainer>
          {menuItens?.map(menuItem => {
            const { lib: Icon, icon, description } = menuItem;

            return (
              <Fragment key={description}>
                <Menu
                  onPress={() => {
                    handleClickMenu(description);
                  }}
                >
                  <MenuIcon>
                    <Icon name={icon} size={20} color={'#000'} />
                  </MenuIcon>
                  <MenuTitle>{description}</MenuTitle>
                </Menu>
                <Divider />
              </Fragment>
            );
          })}
        </MenuContainer>
      </Wrapper>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openUserModal}
        statusBarTranslucent={true}
      >
        <UpdateUserModal onClose={() => setOpenUserModal(false)} />
      </Modal>
    </>
  );
};

export default MenuModal;
