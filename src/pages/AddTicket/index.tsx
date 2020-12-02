import React, { useContext, useState, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform, Modal } from 'react-native';
import { useAuth } from '../../contexts/authContext';
import { ThemeContext } from 'styled-components/native';
import { useMutation, gql } from '@apollo/client';
import {
  Wrapper,
  FormContainer,
  ContainerTitle,
  Title,
  Form,
  FormRow,
  SuggestButton,
  SuggestButtonText,
  BackIcon,
} from './styles';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import SuccessModal from '../../modals/SuccessModal';
import { GET_TICKETS_BY_WALLET } from '../Ticket';
import SuggestionsModal from '../../modals/SuggestionsModal';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import EditTicket from '../../components/EditTicket';
import { ITickets } from '../Ticket';
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';
import TextError from '../../components/TextError';
import { formatAveragePricePreview, formatTicket } from '../../utils/format';

interface IDataParamsForm {
  ticket: ITickets;
}

interface ITicketForm {
  symbol: string;
  name: string;
  quantity: string;
  averagePrice: string;
  grade: string;
  preview: string;
  averagePreview: string;
}

interface IcreateTicket {
  createTicket: ITickets;
}

const AddTicket = () => {
  const { wallet } = useAuth();
  const { color, gradient } = useContext(ThemeContext);

  const [ticketForm, setTicketForm] = useState<ITicketForm>({} as ITicketForm);
  const [focus, setFocus] = useState(0);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const route = useRoute();
  const params = route?.params as IDataParamsForm;
  const navigation = useNavigation();

  const isEdit = !!params?.ticket?._id;

  const handleGoBack = useCallback(() => {
    navigation.setParams({ ticket: null });
    navigation.goBack();
    setTicketForm({} as ITicketForm);
  }, []);

  const HandleOpenSuggestionsModal = useCallback(() => {
    setFocus(1);
    setHasSuggestions(true);
  }, []);

  const handleSelectTicket = useCallback((symbol: string, name: string) => {
    setTicketForm(ticketForm => ({
      ...ticketForm,
      symbol,
      name,
      preview: symbol,
    }));
    setHasSuggestions(false);
  }, []);

  const [
    createTicket,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<IcreateTicket>(CREATE_TICKET);

  const handleSubmit = useCallback(async () => {
    if (
      !ticketForm.symbol ||
      !ticketForm.name ||
      !ticketForm.quantity ||
      !ticketForm.averagePrice ||
      !ticketForm.grade ||
      !wallet
    )
      return;

    const dataTicket = {
      walletID: wallet,
      symbol: ticketForm.symbol,
      name: ticketForm.name,
      quantity: Number(ticketForm.quantity),
      averagePrice: Number(ticketForm.averagePrice),
      grade: Number(ticketForm.grade),
    };

    try {
      await createTicket({
        variables: dataTicket,
        refetchQueries: [
          {
            query: GET_TICKETS_BY_WALLET,
            variables: { walletID: wallet, sort: 'grade' },
          },
        ],
      });

      setTicketForm({} as ITicketForm);
      setFocus(0);
      setOpenModal(true);
    } catch (err) {
      console.error(mutationError?.message + err);
    }
  }, [ticketForm]);

  const handleSetGrade = useCallback((grade: string) => {
    setTicketForm(ticketForm => ({ ...ticketForm, grade }));
  }, []);

  const handleSetQuantity = useCallback((quantity: string) => {
    setTicketForm(ticketForm => ({ ...ticketForm, quantity }));
  }, []);

  const handleSetPrice = useCallback((averagePrice: string) => {
    const { value, preview } = formatAveragePricePreview(averagePrice);

    setTicketForm(ticketForm => ({
      ...ticketForm,
      averagePrice: value,
      averagePreview: preview,
    }));
  }, []);

  return (
    <>
      <Wrapper>
        <ContainerTitle>
          <Title accessibilityRole="header">
            {isEdit ? 'Alterar Ativo' : 'Adicionar Ativo'}
          </Title>
          <BackIcon onPress={handleGoBack}>
            <AntDesign name="closecircleo" size={24} color={color.secondary} />
          </BackIcon>
        </ContainerTitle>
        <ImageAddTicket />

        {isEdit ? (
          <EditTicket ticket={params?.ticket} />
        ) : (
          <FormContainer
            behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
          >
            <Form>
              <FormRow>
                <SuggestButton onPress={HandleOpenSuggestionsModal}>
                  <MaterialCommunityIcons
                    name="file-document-box-search-outline"
                    size={24}
                    color={color.titleNotImport}
                  />
                  <SuggestButtonText accessibilityRole="button">
                    Busque e Selecione um Ativo
                  </SuggestButtonText>
                </SuggestButton>
              </FormRow>
              <FormRow>
                <InputForm
                  label="Ativo Selecionado"
                  value={formatTicket(ticketForm.preview)}
                  placeholder="Nenhum ativo selecionado"
                  autoCompleteType="off"
                  maxLength={10}
                  editable={false}
                  width={60}
                />

                <InputForm
                  label="Dê uma Nota"
                  value={ticketForm.grade}
                  placeholder="0 a 100"
                  maxLength={3}
                  keyboardType="number-pad"
                  autoFocus={focus === 2}
                  onFocus={() => setFocus(2)}
                  onChangeText={handleSetGrade}
                  onEndEditing={() => setFocus(3)}
                  width={30}
                />
              </FormRow>

              <FormRow>
                <InputForm
                  label="Preço Médio"
                  value={ticketForm.averagePreview}
                  placeholder="Preço Médio de Compra"
                  keyboardType="number-pad"
                  autoFocus={focus === 3}
                  onFocus={() => setFocus(3)}
                  onChangeText={handleSetPrice}
                  onEndEditing={() => setFocus(4)}
                  width={60}
                />

                <InputForm
                  label="Quantidade"
                  value={ticketForm.quantity}
                  placeholder="9999"
                  keyboardType="number-pad"
                  returnKeyType="send"
                  autoFocus={focus === 4}
                  onFocus={() => setFocus(4)}
                  onChangeText={handleSetQuantity}
                  onEndEditing={() => setFocus(0)}
                  onSubmitEditing={handleSubmit}
                  width={30}
                />
              </FormRow>

              {!!mutationError && (
                <TextError>{mutationError?.message}</TextError>
              )}

              <Button
                colors={gradient.darkToLightBlue}
                start={[1, 0.5]}
                onPress={handleSubmit}
                loading={mutationLoading}
              >
                Adicionar
              </Button>
            </Form>
          </FormContainer>
        )}
      </Wrapper>

      {openModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          statusBarTranslucent={false}
        >
          <SuccessModal
            onClose={() => setOpenModal(false)}
            beforeModalClose={() => navigation.goBack()}
          />
        </Modal>
      )}

      {hasSuggestions && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={hasSuggestions}
          statusBarTranslucent={false}
        >
          <SuggestionsModal
            onClose={() => setHasSuggestions(false)}
            handleSelectTicket={handleSelectTicket}
          />
        </Modal>
      )}
    </>
  );
};

export const CREATE_TICKET = gql`
  mutation createTicket(
    $walletID: ID!
    $symbol: String!
    $name: String!
    $quantity: Float!
    $averagePrice: Float!
    $grade: Int!
  ) {
    createTicket(
      walletID: $walletID
      input: {
        symbol: $symbol
        name: $name
        quantity: $quantity
        averagePrice: $averagePrice
        grade: $grade
      }
    ) {
      _id
      symbol
      quantity
      averagePrice
      grade
      name
    }
  }
`;

export default AddTicket;
