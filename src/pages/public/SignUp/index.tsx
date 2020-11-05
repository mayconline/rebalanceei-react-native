import React, { useContext, useState } from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/authContext';
import { ThemeContext } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { getTerms } from '../../../utils/Terms';

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
  ContainerTextLink,
  TextLink,
  ContainerTerms,
  TextTermsLink,
} from './styles';

import ImageRegister from '../../../../assets/svg/ImageRegister';

interface IAccountRegister {
  email: string;
  password: string;
  active: boolean;
  checkTerms: boolean;
}

const SignUp = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [focus, setFocus] = useState(0);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [account, setAccount] = useState({} as IAccountRegister);

  const { handleSignUp } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = () => {
    try {
      handleSignUp(account);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Icon onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={32} color={color.secondary} />
        </Icon>
        <ContainerTitle>
          <Title>Criar Conta</Title>
        </ContainerTitle>
      </Header>
      <Image>
        <ImageRegister />
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
          <FormRow>
            <ContainerTerms onPress={getTerms}>
              <TextTermsLink>
                Aceito os Termos de Uso e Política de Privacidade
              </TextTermsLink>
            </ContainerTerms>
            <Switch
              trackColor={{ false: color.inactiveTabs, true: color.success }}
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
            />
          </FormRow>

          <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
            <Button onPress={handleSubmit}>
              <TextButton>Criar Conta</TextButton>
            </Button>
          </Gradient>

          <ContainerTextLink onPress={() => navigation.navigate('Login')}>
            <TextLink>Já possui uma conta?</TextLink>
          </ContainerTextLink>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default SignUp;
