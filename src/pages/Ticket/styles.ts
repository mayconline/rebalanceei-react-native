import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const List = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  flex: 1;
`;

export const Content = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 4px 12px 0;
  flex: 1;
`;

export const Card = styled(LinearGradient)<any>`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 4px 0;
  border-radius: 30px;
  padding: 8px 20px;
  border-left-color: ${({ theme, grade }) =>
    grade >= 8
      ? theme.color.success
      : grade <= 7 && grade >= 4
      ? theme.color.subtitle
      : theme.color.danger};
  border-left-width: 2px;
`;

export const CardContent = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
`;

export const CardTicket = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
  align-self: flex-end;
`;

export const CardSubTitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 12px;
  line-height: 24px;
  font-family: 'TitilliumWeb_400Regular';
`;
export const Grade = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;
