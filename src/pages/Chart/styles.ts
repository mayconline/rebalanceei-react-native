import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const Content = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 0 12px;
  flex: 1;
`;

export const ContainerGraph = styled.View`
  flex: 1;
`;
