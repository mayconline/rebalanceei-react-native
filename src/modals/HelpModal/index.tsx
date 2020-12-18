import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
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

const ASK_LIST = [
  {
    id: '1',
    ask: 'Como faço para adicionar um ativo ?',
    answer:
      'Clicando no botão azul de (+) no meio das abas, abrirá uma aba para que seja cadastrado os ativos, é preciso clicar em pesquisar ativo,e procurar pelo codigo dele, e após clicar em adicionar, e continuar preenchendo as informações de Nota, Quantidade e Preço Médio.',
  },
  {
    id: '2',
    ask: 'Como adicionar um ativo internacional ?',
    answer:
      'Da mesma forma que um ativo nacional, porém convertendo o valor em Dolar para Reais antes de adicionar o ativo na aba Ativos.',
  },
  {
    id: '3',
    ask: 'Como funciona o rebalanceamento de um ativo internacional ?',
    answer:
      'Nós fazemos a conversão da cotação do ativo em Dolar para Reais no momento que clicar na aba Rebalancear, usando a cotação do momento.',
  },
  {
    id: '4',
    ask: 'Como funciona o sistema de notas ?',
    answer:
      ' O usuario informa uma nota que representará o peso do ativo na carteira atual. Quanto maior a nota, maior será a porcentagem desse ativo na carteira. Quanto menor a nota, menor será a porcentagem desse ativo na carteira.',
  },
  {
    id: '5',
    ask: 'Como sabem a porcentagem atual da carteira ?',
    answer:
      'Pegamos a porcentagem atual de cada ativo da carteira, consultando uma API externa para obter os valores de cotação do momento, e fazemos o calculo pelas informações sobre os ativos ,quantidade, preço médio e nota informados pelo usuario na aba Ativos.',
  },
  {
    id: '6',
    ask: 'Como sabem a porcentagem ideal da carteira ?',
    answer:
      'Usamos os dados preenchidos pelo usuario sobre ativo e nota, para definir a porcentagem ideal que este ativo deveria estar na carteira.',
  },
  {
    id: '7',
    ask: 'Como é feito o rebalanceamento ?',
    answer:
      'Ao clicar na aba, Rebalancear, realizamos os calculos da porcentagem atual e ideal, e informamos quanto falta em porcentagem e em valores convertidos em Reais, para o usuario chegar na porcentagem ideal do ativo na sua carteira.',
  },
  {
    id: '8',
    ask: 'O que significa os status que aparecem na aba Rebalancear ?',
    answer:
      'São apenas sugestões do que fazer para chegar na porcentagem ideal estabelecida do ativo baseado nas informações obtidas pelo usuario na aba Ativos.',
  },
  {
    id: '9',
    ask: 'Quais Status existem ?',
    answer:
      '- Comprar:  A porcentagem atual é menor do que a porcentagem ideal do ativo. - Aguardar: A porcentagem atual é igual a porcentagem ideal do ativo. - Analizar: A porcentagem atual é maior do que a porcentagem ideal do ativo.',
  },
  {
    id: '10',
    ask: 'Quantas carteiras posso cadastrar ?',
    answer:
      '- No plano Gratis, o usuario poderá cadastrar até 2 carteiras. - No plano Premmium, o usuario poderá cadastrar quantas carteiras quiser.',
  },
  {
    id: '11',
    ask: 'Quantos ativos posso cadastrar em cada carteira ?',
    answer:
      '- No plano Gratis, o usuario poderá cadastrar até 16 ativos por carteira. - No plano Premmium, o usuario poderá cadastrar quantos ativos quiser.',
  },
  {
    id: '12',
    ask: 'Como posso mudar de plano ?',
    answer:
      'No topo da tela, no canto direito tem um ícone de 3 pontinhos que é o Menu, clicando nele tem a opção, Meu Plano Atual, contém as informações sobre o seu plano e como mudar.',
  },
  {
    id: '13',
    ask:
      'O que acontece se o vencimento do plano expirar e não for feito a renovação automática ?',
    answer:
      'o usuário volta ao plano Gratis, e perde acesso aos privilegios do plano Premmium, aparecendo somente 16 ativos por carteira, e apenas 2 carteiras.',
  },
  {
    id: '14',
    ask: 'Sua duvida não foi respondida ?',
    answer:
      'Entre em contato conosco atraves do e-mail mayconline.ti@gmail.com',
  },
];

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
      <Image>
        <ImageHelp />
      </Image>
      <Container>
        <ListTicket
          data={ASK_LIST}
          keyExtractor={item => item.id}
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

export default React.memo(HelpModal);
