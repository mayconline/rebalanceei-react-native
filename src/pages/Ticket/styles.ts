import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bgHeader};
`;

export const Content = styled.ScrollView`
  background-color: ${({ theme }) => theme.color.bgContent};
  padding: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.color.titleCard};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;
