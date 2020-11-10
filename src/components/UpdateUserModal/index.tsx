import React, { useContext, useState, useCallback } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import {
  Wrapper,
  FormContainer,
  ContainerTitle,
  BackIcon,
  Title,
  Form,
  FormRow,
  InputGroup,
  InputIcon,
  Label,
  Input,
  ContainerButtons,
  Button,
  Gradient,
  TextButton,
} from './styles';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Loading from '../Loading';

interface IUser {
  _id: string;
  email: string;
  active: boolean;
  checkTerms: boolean;
  password?: string;
}

interface IUpdateUser {
  updateUser: IUser;
}

interface IGetUser {
  getUserByToken: IUser;
}

interface IUpdateUserModal {
  onClose(): void;
}

const UpdateUserModal = ({ onClose }: IUpdateUserModal) => {
  const { color, gradient } = useContext(ThemeContext);
  const [user, setUser] = useState({} as IUser);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { handleSignOut } = useAuth();

  const [getUserByToken, { data, loading: queryLoading, error }] = useLazyQuery<
    IGetUser
  >(GET_USER_BY_TOKEN);

  const [
    updateUser,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation<IUpdateUser>(UPDATE_USER);

  useFocusEffect(
    useCallback(() => {
      getUserByToken();
    }, []),
  );

  const handleDisabledSubmit = async () => {
    try {
      Alert.alert(
        'Desativar Conta',
        'Se você continuar, sua conta será desativada e perderá o acesso a ela.',
        [
          {
            text: 'Voltar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            style: 'destructive',
            onPress: async () => {
              await updateUser({
                variables: {
                  active: false,
                },
              });
              handleSignOut();
            },
          },
        ],
        { cancelable: false },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ variables: user });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return queryLoading || mutationLoading ? (
    <Loading />
  ) : (
    <>
      <Wrapper>
        <ContainerTitle>
          <Title>Alterar Usuário</Title>
          <BackIcon onPress={onClose}>
            <AntDesign name="closecircleo" size={24} color={color.secondary} />
          </BackIcon>
        </ContainerTitle>
        <ImageAddTicket />
        <FormContainer behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
          <Form>
            <FormRow>
              <InputGroup>
                <Label>E-mail</Label>
                <Input
                  value={user.email}
                  defaultValue={data?.getUserByToken?.email}
                  placeholder="meuemail@teste.com.br"
                  autoCompleteType="email"
                  placeholderTextColor={color.titleNotImport}
                  maxLength={80}
                  onChangeText={(email: string) =>
                    setUser(user => ({
                      ...user,
                      email,
                    }))
                  }
                />
              </InputGroup>
            </FormRow>

            <FormRow>
              <InputGroup>
                <Label>Nova Senha</Label>
                <Input
                  value={user.password}
                  placeholder="Caso queira alterar"
                  autoCompleteType="password"
                  secureTextEntry={!visiblePassword ? true : false}
                  placeholderTextColor={color.titleNotImport}
                  maxLength={32}
                  onChangeText={(password: string) =>
                    setUser(user => ({
                      ...user,
                      password,
                    }))
                  }
                />
              </InputGroup>
              <InputIcon
                onPress={() =>
                  setVisiblePassword(visiblePassword => !visiblePassword)
                }
              >
                <Entypo
                  name={!visiblePassword ? 'eye-with-line' : 'eye'}
                  size={20}
                  color={color.titleNotImport}
                />
              </InputIcon>
            </FormRow>

            <ContainerButtons>
              <Gradient colors={gradient.lightToDarkRed} start={[1, 0.5]}>
                <Button onPress={handleDisabledSubmit}>
                  {mutationLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <TextButton>Desativar</TextButton>
                  )}
                </Button>
              </Gradient>

              <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
                <Button onPress={handleSubmit}>
                  {mutationLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <TextButton>Alterar</TextButton>
                  )}
                </Button>
              </Gradient>
            </ContainerButtons>
          </Form>
        </FormContainer>
      </Wrapper>
    </>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String
    $password: String
    $active: Boolean
    $checkTerms: Boolean
  ) {
    updateUser(
      input: {
        email: $email
        password: $password
        active: $active
        checkTerms: $checkTerms
      }
    ) {
      _id
      email
      active
      checkTerms
    }
  }
`;

const GET_USER_BY_TOKEN = gql`
  query getUserByToken {
    getUserByToken {
      _id
      email
      checkTerms
      active
    }
  }
`;

export default UpdateUserModal;
