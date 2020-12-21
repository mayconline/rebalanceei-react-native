import React, { useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { useLazyQuery, gql } from '@apollo/client';
import {
  Wrapper,
  Image,
  ContainerTitle,
  Title,
  BackIcon,
  Container,
  Question,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import Collapse from '../../components/Collapse';
import ListTicket from '../../components/ListTicket';
import ImageHelp from '../../../assets/svg/ImageHelp';
import TextError from '../../components/TextError';
import Loading from '../../components/Loading';

interface IHelpModal {
  onClose(): void;
}

interface IQuestion {
  _id: string;
  ask: string;
  answer: string;
}

interface IGetQuestion {
  questions: IQuestion[];
}

const HelpModal = ({ onClose }: IHelpModal) => {
  const { color } = useContext(ThemeContext);

  const [
    questions,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery<IGetQuestion>(GET_QUESTIONS);

  useFocusEffect(
    useCallback(() => {
      questions();
    }, []),
  );

  return queryLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <ContainerTitle>
        <Title accessibilityRole="header">Precisa de Ajuda?</Title>
        <BackIcon
          accessibilityRole="imagebutton"
          accessibilityLabel="Voltar"
          onPress={onClose}
        >
          <AntDesign name="closecircleo" size={24} color={color.secondary} />
        </BackIcon>
      </ContainerTitle>
      <Image>
        <ImageHelp />
      </Image>
      <Container>
        {!!queryError && <TextError>{queryError?.message}</TextError>}
        <ListTicket
          data={data?.questions}
          keyExtractor={item => item._id}
          ListFooterComponent={
            <Collapse title="Sua duvida não foi respondida ?">
              <Question>
                Entre em contato conosco atraves do e-mail
                mayconline.ti@gmail.com
              </Question>
            </Collapse>
          }
          renderItem={({ item }) => (
            <Collapse title={item.ask}>
              <Question>{item.answer}</Question>
            </Collapse>
          )}
        />
      </Container>
    </Wrapper>
  );
};

export const GET_QUESTIONS = gql`
  query questions {
    questions {
      _id
      ask
      answer
    }
  }
`;

export default React.memo(HelpModal);
