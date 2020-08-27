import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  FormContainer,
  ContainerTitle,
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

interface ITicketForm {
  ticket: string;
  grade: string;
  quantity: string;
  averagePrice: string;
}

const SUGGESTIONS = [
  {
    ticket: 'LREN3',
    title: 'Lojas Renner',
  },
  {
    ticket: 'MGLU3',
    title: 'Magazine Luiza',
  },
  {
    ticket: 'TRPL4',
    title: 'Transmissão Paulista',
  },
];

const AddTicket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [ticketForm, setTicketForm] = useState<ITicketForm>({} as ITicketForm);

  const selectTicket = (ticket: string) => {
    setTicketForm(ticketForm => ({ ...ticketForm, ticket }));
  };

  const handleSubmit = () => {
    console.log(ticketForm);
    setTicketForm({} as ITicketForm);
  };

  return (
    <Wrapper>
      <ContainerTitle>
        <Title>Adicionar Ativo</Title>
      </ContainerTitle>
      <ImageAddTicket />
      <FormContainer behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
        <Form>
          <FormRow>
            <InputGroup>
              <Label>Carteira Atual</Label>
              <Input value={'Ações'} editable={false} />
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>Ativo</Label>
              <Input
                value={ticketForm.ticket}
                autoCapitalize={'characters'}
                returnKeyType={'next'}
                placeholder="Busque e selecione o ativo"
                placeholderTextColor={color.titleNotImport}
                autoFocus={true}
                maxLength={6}
                onChangeText={ticket => selectTicket(ticket)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Nota</Label>
              <Input
                value={ticketForm.grade}
                returnKeyType={'next'}
                keyboardType="number-pad"
                placeholder="0 a 100"
                placeholderTextColor={color.titleNotImport}
                maxLength={3}
                onChangeText={grade =>
                  setTicketForm(ticketForm => ({ ...ticketForm, grade }))
                }
              />
            </InputGroup>
          </FormRow>
          <FormRow>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                value={ticketForm.quantity}
                returnKeyType={'next'}
                keyboardType="number-pad"
                placeholder="Números de ativos"
                placeholderTextColor={color.titleNotImport}
                onChangeText={quantity =>
                  setTicketForm(ticketForm => ({ ...ticketForm, quantity }))
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Preço Médio</Label>
              <Input
                value={ticketForm.averagePrice}
                keyboardType="number-pad"
                placeholder="Preço médio do ativo"
                placeholderTextColor={color.titleNotImport}
                onChangeText={averagePrice =>
                  setTicketForm(ticketForm => ({ ...ticketForm, averagePrice }))
                }
              />
            </InputGroup>
          </FormRow>
          <Gradient colors={gradient.darkToLightBlue} start={[1, 0.5]}>
            <Button onPress={handleSubmit}>
              <TextButton>Adicionar Ativo</TextButton>
            </Button>
          </Gradient>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default AddTicket;
