import React, { useContext, useState } from 'react';
import { Platform, Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import {
  Wrapper,
  FormContainer,
  ContainerTitle,
  Icon,
  Title,
  Form,
  FormRow,
  InputGroup,
  Label,
  Input,
  Button,
  Gradient,
  TextButton,
} from './styles';

import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import SuccessModal from '../SuccessModal';

interface IAddWalletModal {
  onClose(): void;
}

const AddWalletModal: React.FC<IAddWalletModal> = ({ onClose }) => {
  const { color, gradient } = useContext(ThemeContext);
  const [wallet, setWallet] = useState('');
  const [focus, setFocus] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    setOpenModal(true);
    console.log(wallet);
    setWallet('');
  };

  return (
    <>
      <Wrapper>
        <ContainerTitle>
          <Icon onPress={onClose}>
            <Entypo name="chevron-left" size={32} color={color.secondary} />
          </Icon>
          <Title>Criar Nova Carteira</Title>
        </ContainerTitle>
        <ImageAddTicket
          translateX={36}
          translateY={52}
          scaleX={1.1}
          scaleY={1.3}
        />
        <FormContainer behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
          <Form>
            <FormRow>
              <InputGroup>
                <Label>Nome da Carteira</Label>
                <Input
                  value={wallet}
                  placeholder="Minha Nova Carteira"
                  placeholderTextColor={color.titleNotImport}
                  maxLength={80}
                  autoFocus={focus === 1}
                  onFocus={() => setFocus(1)}
                  onChangeText={(wallet: string) => setWallet(wallet)}
                />
              </InputGroup>
            </FormRow>

            <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
              <Button onPress={handleSubmit}>
                <TextButton>Adicionar Carteira</TextButton>
              </Button>
            </Gradient>
          </Form>
        </FormContainer>
      </Wrapper>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        statusBarTranslucent={false}
      >
        <SuccessModal
          onClose={() => setOpenModal(false)}
          beforeModalClose={onClose}
        />
      </Modal>
    </>
  );
};

export default AddWalletModal;
