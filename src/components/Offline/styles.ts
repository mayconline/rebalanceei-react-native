import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bgHeaderEmpty};
  justify-content: space-around;
`;

export const Header = styled.View``;

export const Image = styled.View`
  height: 280px;
  padding: 16px;
`;

export const ContainerTitle = styled.View`
  align-items: center;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 400 28px/56px 'TitilliumWeb_400Regular';
  opacity: 0.5;
  padding: 4px 20px;
  text-align: center;
`;
