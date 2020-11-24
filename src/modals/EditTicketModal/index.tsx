import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useAuth } from '../../contexts/authContext';
import { useMutation, gql } from '@apollo/client';
import {
  Wrapper,
  FormContainer,
  ContainerTitle,
  BackIcon,
  Title,
  Form,
  FormRow,
  InputGroup,
  Label,
  Input,
  ContainerButtons,
  Button,
  Gradient,
  TextButton,
} from './styles';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import { AntDesign } from '@expo/vector-icons';

import { ITickets, GET_TICKETS_BY_WALLET } from '../../pages/Ticket';
import Loading from '../../components/Loading';

interface IDataForm {
  _id: string;
  symbol: string;
  name: string;
  quantity: string;
  averagePrice: string;
  grade: string;
}

interface IUpdateTicket {
  updateTicket: { _id: string };
}

interface IDeleteTicket {
  deleteTicket: boolean;
}

interface IEditWalletModal {
  onClose(): void;
  tickets: ITickets;
}

const EditTicketModal = ({ onClose, tickets }: IEditWalletModal) => {
  const { color, gradient } = useContext(ThemeContext);
  const { wallet } = useAuth();
  const [ticketForm, setTicketForm] = useState<IDataForm>({
    _id: tickets._id,
    symbol: tickets.symbol,
    name: tickets.name,
    quantity: String(tickets.quantity),
    averagePrice: String(tickets.averagePrice),
    grade: String(tickets.grade),
  });

  const [
    updateTicket,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<IUpdateTicket>(UPDATE_TICKET);

  const [
    deleteTicket,
    { loading: mutationDeleteLoading, error: mutationDeleteError },
  ] = useMutation<IDeleteTicket>(DELETE_TICKET);

  const handleSubmit = async () => {
    const dataTicket = {
      _id: ticketForm._id,
      symbol: ticketForm.symbol,
      name: ticketForm.name,
      quantity: Number(ticketForm.quantity),
      averagePrice: Number(ticketForm.averagePrice),
      grade: Number(ticketForm.grade),
    };

    try {
      await updateTicket({
        variables: dataTicket,
        refetchQueries: [
          {
            query: GET_TICKETS_BY_WALLET,
            variables: { walletID: wallet, sort: 'grade' },
          },
        ],
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteTicket({
        variables: {
          _id: ticketForm._id,
          walletID: wallet,
        },
        refetchQueries: [
          {
            query: GET_TICKETS_BY_WALLET,
            variables: { walletID: wallet, sort: 'grade' },
          },
        ],
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return !tickets ? (
    <Loading />
  ) : (
    <Wrapper>
      <ContainerTitle>
        <Title>Alterar Ativo</Title>
        <BackIcon onPress={onClose}>
          <AntDesign name="closecircleo" size={24} color={color.secondary} />
        </BackIcon>
      </ContainerTitle>
      <ImageAddTicket />
      <FormContainer behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
        <Form>
          <FormRow>
            <InputGroup>
              <Label>Ativo Selecionado</Label>
              <Input
                value={ticketForm.symbol}
                defaultValue={ticketForm.symbol}
                placeholderTextColor={color.titleNotImport}
                maxLength={10}
                editable={false}
              />
            </InputGroup>

            <InputGroup>
              <Label>Dê uma Nota</Label>
              <Input
                value={ticketForm.grade}
                defaultValue={ticketForm.grade}
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
                defaultValue={ticketForm.quantity}
                returnKeyType={'next'}
                keyboardType="number-pad"
                placeholder="Números de Ativos"
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
                defaultValue={ticketForm.averagePrice}
                keyboardType="number-pad"
                placeholder="Preço Médio de Compra"
                placeholderTextColor={color.titleNotImport}
                onChangeText={averagePrice =>
                  setTicketForm(ticketForm => ({
                    ...ticketForm,
                    averagePrice,
                  }))
                }
              />
            </InputGroup>
          </FormRow>

          <ContainerButtons>
            <Gradient colors={gradient.lightToDarkRed} start={[1, 0.5]}>
              <Button onPress={handleDeleteSubmit}>
                {mutationDeleteLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <TextButton>Deletar</TextButton>
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
  );
};

const UPDATE_TICKET = gql`
  mutation updateTicket(
    $_id: ID!
    $symbol: String!
    $name: String!
    $quantity: Float!
    $averagePrice: Float!
    $grade: Int!
  ) {
    updateTicket(
      _id: $_id
      input: {
        symbol: $symbol
        name: $name
        quantity: $quantity
        averagePrice: $averagePrice
        grade: $grade
      }
    ) {
      _id
    }
  }
`;

const DELETE_TICKET = gql`
  mutation deleteTicket($_id: ID!, $walletID: ID!) {
    deleteTicket(_id: $_id, walletID: $walletID)
  }
`;

export default EditTicketModal;
