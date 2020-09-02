import React, { useContext, useState } from 'react';
import { Platform, Modal } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

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
  SuggestionContainer,
  SuggestionList,
  SuggestionItem,
  SuggestionText,
  SuggestionButton,
} from './styles';

import ImageAddTicket from '../../../assets/svg/ImageAddTicket';
import SuccessModal from '../../components/SuccessModal';

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
    title: 'Transmissão Paulista LTDA',
  },
];

const AddTicket: React.FC = () => {
  const { color, gradient } = useContext(ThemeContext);
  const [ticketForm, setTicketForm] = useState<ITicketForm>({} as ITicketForm);
  const [focus, setFocus] = useState(0);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigation = useNavigation();

  const handleSuggestionsAutoComplete = (ticket: string) => {
    setTicketForm(ticketForm => ({ ...ticketForm, ticket }));
    setHasSuggestions(true);
  };

  const handleSelectTicket = (ticket: string) => {
    setTicketForm(ticketForm => ({ ...ticketForm, ticket }));
    setHasSuggestions(false);
  };

  const handleSubmit = () => {
    console.log(ticketForm);
    setTicketForm({} as ITicketForm);
    setFocus(0);
    setOpenModal(true);
  };

  return (
    <>
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
                <Label>Busque e Selecione um Ativo</Label>
                <Input
                  value={ticketForm.ticket}
                  autoCapitalize={'characters'}
                  returnKeyType={'next'}
                  placeholder="RBLC3"
                  placeholderTextColor={color.titleNotImport}
                  maxLength={6}
                  onChangeText={ticket => handleSuggestionsAutoComplete(ticket)}
                  autoFocus={focus === 1}
                  onFocus={() => setFocus(1)}
                  onEndEditing={() => setHasSuggestions(false)}
                  autoCorrect={false}
                />
                <SuggestionContainer visibled={hasSuggestions}>
                  <SuggestionList>
                    {SUGGESTIONS?.map(suggestion => (
                      <SuggestionItem key={suggestion.ticket}>
                        <SuggestionButton
                          onPress={() => handleSelectTicket(suggestion.ticket)}
                        >
                          <SuggestionText
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {suggestion.ticket}- {suggestion.title}
                          </SuggestionText>
                        </SuggestionButton>
                      </SuggestionItem>
                    ))}
                  </SuggestionList>
                </SuggestionContainer>
              </InputGroup>
              <InputGroup>
                <Label>Dê uma Nota</Label>
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
                  autoFocus={focus === 2}
                  onFocus={() => setFocus(2)}
                  onEndEditing={() => setFocus(3)}
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
                  placeholder="Números de Ativos"
                  placeholderTextColor={color.titleNotImport}
                  onChangeText={quantity =>
                    setTicketForm(ticketForm => ({ ...ticketForm, quantity }))
                  }
                  autoFocus={focus === 3}
                  onFocus={() => setFocus(3)}
                  onEndEditing={() => setFocus(4)}
                />
              </InputGroup>
              <InputGroup>
                <Label>Preço Médio</Label>
                <Input
                  value={ticketForm.averagePrice}
                  keyboardType="number-pad"
                  placeholder="Preço Médio de Compra"
                  placeholderTextColor={color.titleNotImport}
                  onChangeText={averagePrice =>
                    setTicketForm(ticketForm => ({
                      ...ticketForm,
                      averagePrice,
                    }))
                  }
                  autoFocus={focus === 4}
                  onFocus={() => setFocus(4)}
                  onEndEditing={() => setFocus(0)}
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
    </>
  );
};

export default AddTicket;
