import React, { useContext, useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
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
  ContainerButtons,
} from './styles';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';
import TextError from '../../components/TextError';

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
  const { handleSignOut } = useAuth();
  const [focus, setFocus] = useState(0);

  const [
    getUserByToken,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IGetUser>(GET_USER_BY_TOKEN, {
    fetchPolicy: 'cache-and-network',
  });

  const [
    updateUser,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation<IUpdateUser>(UPDATE_USER);

  useFocusEffect(
    useCallback(() => {
      getUserByToken();
    }, []),
  );

  const handleDisabledSubmit = useCallback(async () => {
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
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await updateUser({ variables: user });
      onClose();
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  const handleSetEmail = useCallback((email: string) => {
    setUser(user => ({
      ...user,
      email,
    }));
  }, []);

  const handleSetPassword = useCallback((password: string) => {
    setUser(user => ({
      ...user,
      password,
    }));
  }, []);

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
              <InputForm
                label="E-mail"
                value={user.email}
                defaultValue={data?.getUserByToken?.email}
                placeholder="meuemail@teste.com.br"
                autoCompleteType="email"
                maxLength={80}
                keyboardType="email-address"
                autoFocus={focus === 1}
                onFocus={() => setFocus(1)}
                onChangeText={handleSetEmail}
                onEndEditing={() => setFocus(2)}
              />
            </FormRow>

            <FormRow>
              <InputForm
                label="Nova Senha"
                value={user.password}
                isSecure
                placeholder="Caso queira alterar"
                autoCompleteType="password"
                maxLength={32}
                returnKeyType="send"
                autoFocus={focus === 2}
                onFocus={() => setFocus(2)}
                onChangeText={handleSetPassword}
                onEndEditing={() => setFocus(0)}
                onSubmitEditing={handleSubmit}
              />
            </FormRow>

            {!!mutationError && <TextError>{mutationError?.message}</TextError>}
            {!!queryError && <TextError>{queryError?.message}</TextError>}

            <ContainerButtons>
              <Button
                colors={gradient.lightToDarkRed}
                start={[1, 0.5]}
                onPress={handleDisabledSubmit}
                loading={mutationLoading}
              >
                Desativar
              </Button>

              <Button
                colors={gradient.darkToLightBlue}
                start={[1, 0.5]}
                onPress={handleSubmit}
                loading={mutationLoading}
              >
                Alterar
              </Button>
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
