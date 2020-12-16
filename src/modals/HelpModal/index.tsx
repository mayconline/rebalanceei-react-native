import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  Wrapper,
  ContainerTitle,
  Title,
  BackIcon,
  Container,
  QuestionContainer,
  Question,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import Collapse from '../../components/Collapse';
import ImageAddTicket from '../../../assets/svg/ImageAddTicket';

interface IHelpModal {
  onClose(): void;
}

const HelpModal = ({ onClose }: IHelpModal) => {
  const { color } = useContext(ThemeContext);

  return (
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
      <ImageAddTicket />
      <Container>
        <QuestionContainer>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta Para sua</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta Para sua</Question>
          </Collapse>
          <Collapse title="MInha Pergunta">
            <Question>Qual a resposta para a pergunta Para sua </Question>
          </Collapse>
        </QuestionContainer>
      </Container>
    </Wrapper>
  );
};

export default React.memo(HelpModal);
