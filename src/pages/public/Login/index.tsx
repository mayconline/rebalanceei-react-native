import React, { useContext, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, gql } from '@apollo/client';

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
  TextError,
  ContainerTextLink,
  TextLink,
} from './styles';
import { Entypo } from '@expo/vector-icons';
import ImageLogin from '../../../../assets/svg/ImageLogin';

import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';

interface IAccountLogin {
  email: string;
  password: string;
}

interface ILogin {
  login: {
    _id: string;
    token: string;
  };
}

const Login = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [focus, setFocus] = useState(0);
  const [account, setAccount] = useState({} as IAccountLogin);

  const { handleSignIn } = useAuth();
  const navigation = useNavigation();

  const [login, { data, loading, error }] = useLazyQuery<ILogin, IAccountLogin>(
    LOGIN,
    {
      variables: account,
    },
  );

  const handleSubmit = useCallback(() => {
    if (!account.email || !account.password) return;

    try {
      login();
      if (!loading && data) handleSignIn(data?.login);
    } catch (err) {
      console.error(error?.message + err);
    }
  }, [account, data]);

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
          <Title accessibilityRole="header">Bem Vindo de Volta</Title>
        </ContainerTitle>
      </Header>
      <Image>
        <ImageLogin />
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
              returnKeyType="send"
              autoFocus={focus === 2}
              onFocus={() => setFocus(2)}
              onChangeText={handleSetPassword}
              onEndEditing={() => setFocus(0)}
              onSubmitEditing={handleSubmit}
            />
          </FormRow>

          {!!error && (
            <TextError numberOfLines={1} ellipsizeMode="tail">
              {error?.message}
            </TextError>
          )}

          <Button
            colors={gradient.darkToLightBlue}
            start={[1, 0.5]}
            onPress={handleSubmit}
            loading={loading}
          >
            Entrar
          </Button>

          <ContainerTextLink onPress={() => navigation.navigate('SignUp')}>
            <TextLink>Ainda não possui uma conta?</TextLink>
          </ContainerTextLink>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      _id
      token
    }
  }
`;

export default Login;
