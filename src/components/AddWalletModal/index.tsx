import React, { useContext, useState } from 'react';
import { Platform, Modal, ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../../contexts/authContext';
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
  beforeModalClose(): void;
}

const AddWalletModal: React.FC<IAddWalletModal> = ({
  onClose,
  beforeModalClose,
}) => {
  const { color, gradient } = useContext(ThemeContext);
  const [wallet, setWallet] = useState('');
  const [focus, setFocus] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { handleSetWallet } = useAuth();

  const [createWallet, { loading, error: mutationError }] = useMutation(
    CREATE_WALLET,
  );

  const handleSubmit = async () => {
    try {
      const response = await createWallet({
        variables: {
          description: wallet,
        },
      });

      handleSetWallet(
        response?.data?.createWallet?._id,
        response?.data?.createWallet?.description,
      );

      setOpenModal(true);
      beforeModalClose();
      setWallet('');
    } catch (err) {
      console.log(err);
    }
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
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <TextButton>Adicionar Carteira</TextButton>
                )}
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

const CREATE_WALLET = gql`
  mutation createWallet($description: String!) {
    createWallet(input: { description: $description }) {
      _id
      description
    }
  }
`;

export default AddWalletModal;
