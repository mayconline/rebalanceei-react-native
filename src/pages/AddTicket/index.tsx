import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import {
  Wrapper,
  FormContainer,
  Title,
  Form,
  FormRow,
  InputGroup,
  Label,
  Input,
} from './styles';
import Header from '../../components/Header';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';

interface ITicketForm {
  ticket: string;
  grade: string;
  quantity: string;
  averagePrice: string;
}

const AddTicket: React.FC = () => {
  const { color } = useContext(ThemeContext);
  const [ticketForm, setTicketForm] = useState<ITicketForm>({} as ITicketForm);

  return (
    <Wrapper>
      <FormContainer behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
        <Header />

        <ImageAddTicket />

        <Form>
          <Title>Adicionar Ativo</Title>
          <FormRow>
            <InputGroup>
              <Label>Ativo</Label>
              <Input
                value={ticketForm.ticket}
                placeholder="Busque o ativo"
                placeholderTextColor={color.titleNotImport}
                maxLength={6}
                onChangeText={ticket =>
                  setTicketForm(ticketForm => ({ ...ticketForm, ticket }))
                }
                onEndEditing={e => console.log(ticketForm.ticket)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Nota</Label>
              <Input
                value={ticketForm.grade}
                keyboardType="number-pad"
                placeholder="Dê uma nota"
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
                onEndEditing={e => console.log(ticketForm)}
              />
            </InputGroup>
          </FormRow>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default AddTicket;
