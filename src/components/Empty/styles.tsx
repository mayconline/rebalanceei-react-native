import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export const Main = styled.View``;

export const Image = styled.View`
  height: 280px;
  padding: 16px;
`;

export const ContainerTitle = styled.View`
  align-items: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  text-align: center;
`;

export const Footer = styled.View`
  align-self: center;
`;
