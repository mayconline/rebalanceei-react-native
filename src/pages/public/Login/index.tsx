import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/authContext';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

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
  InputGroup,
  Label,
  Input,
  InputIcon,
  Button,
  Gradient,
  TextButton,
  TextError,
  ContainerTextLink,
  TextLink,
} from './styles';

import ImageLogin from '../../../../assets/svg/ImageLogin';

import { useLazyQuery, gql } from '@apollo/client';

interface IAccountLogin {
  email: string;
  password: string;
}

const Login = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [focus, setFocus] = useState(0);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [account, setAccount] = useState({} as IAccountLogin);

  const { handleSignIn, user } = useAuth();
  const navigation = useNavigation();

  const [login, { data, loading, error }] = useLazyQuery(LOGIN, {
    variables: account,
  });

  const handleSubmit = () => {
    try {
      login();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loading && data) handleSignIn(data);
  }, [data]);

  return (
    <Wrapper>
      <Header>
        <Icon onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={32} color={color.secondary} />
        </Icon>
        <ContainerTitle>
          <Title>Bem Vindo de Volta</Title>
        </ContainerTitle>
      </Header>
      <Image>
        <ImageLogin />
      </Image>
      <FormContainer behavior={'padding'}>
        <Form>
          <FormRow>
            <InputGroup>
              <Label>E-mail</Label>
              <Input
                value={account.email}
                placeholder="meuemail@teste.com.br"
                autoCompleteType="email"
                placeholderTextColor={color.titleNotImport}
                maxLength={80}
                autoFocus={focus === 1}
                onFocus={() => setFocus(1)}
                onChangeText={(email: string) =>
                  setAccount(account => ({
                    ...account,
                    email,
                  }))
                }
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>Senha</Label>
              <Input
                value={account.password}
                placeholder="********"
                autoCompleteType="password"
                secureTextEntry={!visiblePassword ? true : false}
                placeholderTextColor={color.titleNotImport}
                maxLength={32}
                autoFocus={focus === 2}
                onFocus={() => setFocus(2)}
                onChangeText={(password: string) =>
                  setAccount(account => ({
                    ...account,
                    password,
                  }))
                }
                onEndEditing={() => setFocus(0)}
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

          <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
            <Button onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <TextButton>Entrar</TextButton>
              )}
            </Button>
          </Gradient>
          <ContainerTextLink onPress={() => navigation.navigate('SignUp')}>
            <TextLink>Ainda não possui uma conta?</TextLink>
          </ContainerTextLink>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      _id
      token
    }
  }
`;

export default Login;
