import React, { useContext, useState, useCallback } from 'react';
import { Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';

import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../../contexts/authContext';

import {
  Wrapper,
  FormContainer,
  ContainerTitle,
  Image,
  Header,
  Icon,
  Title,
  Form,
  FormRow,
  ContainerTextLink,
  TextLink,
  ContainerTerms,
  TextTermsLink,
  TextError,
} from './styles';
import { Entypo } from '@expo/vector-icons';
import ImageRegister from '../../../../assets/svg/ImageRegister';

import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';

import { getTerms } from '../../../utils/Terms';

interface IAccountRegister {
  email: string;
  password: string;
  checkTerms: boolean;
}

interface ICreateUser {
  createUser: {
    _id: string;
    token: string;
  };
}

const SignUp = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [focus, setFocus] = useState(0);
  const [account, setAccount] = useState({} as IAccountRegister);

  const { handleSignIn } = useAuth();
  const navigation = useNavigation();

  const [
    createUser,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<ICreateUser, IAccountRegister>(CREATE_USER);

  const handleSubmit = () => {
    if (!account.email || !account.password) return;
    if (!account.checkTerms) {
      return Alert.alert(
        'Termos de Uso',
        'É preciso aceitar os termos de uso para utilizar o app.',
        [
          {
            text: 'Voltar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            style: 'destructive',
            onPress: () => {
              setAccount(account => ({
                ...account,
                checkTerms: !account.checkTerms,
              }));
            },
          },
        ],
        { cancelable: false },
      );
    }

    createUser({
      variables: account,
    })
      .then(
        response =>
          response.data?.createUser && handleSignIn(response.data.createUser),
      )
      .catch(err => console.error(mutationError?.message + err));
  };

  const handleSetEmail = useCallback((email: string) => {
    setAccount(account => ({
      ...account,
      email,
    }));
  }, []);

  const handleSetPassword = useCallback((password: string) => {
    setAccount(account => ({
      ...account,
      password,
    }));
  }, []);

  return (
    <Wrapper>
      <Header>
        <Icon
          accessibilityRole="imagebutton"
          accessibilityLabel="Voltar"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={32} color={color.secondary} />
        </Icon>
        <ContainerTitle>
          <Title accessibilityRole="header">Criar Conta</Title>
        </ContainerTitle>
      </Header>
      <Image>
        <ImageRegister />
      </Image>
      <FormContainer behavior={'padding'}>
        <Form>
          <FormRow>
            <InputForm
              label="E-mail"
              value={account.email}
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
              label="Senha"
              value={account.password}
              isSecure
              placeholder="********"
              autoCompleteType="password"
              maxLength={32}
              autoFocus={focus === 2}
              onFocus={() => setFocus(2)}
              onChangeText={handleSetPassword}
              onEndEditing={() => setFocus(0)}
            />
          </FormRow>

          <FormRow>
            <ContainerTerms onPress={getTerms}>
              <TextTermsLink>
                Aceito os Termos de Uso e Política de Privacidade
              </TextTermsLink>
            </ContainerTerms>
            <Switch
              trackColor={{
                false: color.inactiveTabs,
                true: color.success,
              }}
              thumbColor={
                account.checkTerms ? color.primary : color.titleNotImport
              }
              ios_backgroundColor={color.titleNotImport}
              onValueChange={() =>
                setAccount(account => ({
                  ...account,
                  checkTerms: !account.checkTerms,
                }))
              }
              value={account.checkTerms}
              accessibilityRole="switch"
            />
          </FormRow>

          {!!mutationError && (
            <TextError numberOfLines={1} ellipsizeMode="tail">
              {mutationError?.message}
            </TextError>
          )}

          <Button
            colors={gradient.darkToLightBlue}
            start={[1, 0.5]}
            onPress={handleSubmit}
            loading={mutationLoading}
          >
            Criar Conta
          </Button>

          <ContainerTextLink onPress={() => navigation.navigate('Login')}>
            <TextLink>Já possui uma conta?</TextLink>
          </ContainerTextLink>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $checkTerms: Boolean!
  ) {
    createUser(
      input: { email: $email, password: $password, checkTerms: $checkTerms }
    ) {
      _id
      token
    }
  }
`;

export default SignUp;
