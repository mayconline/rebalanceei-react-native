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

export const Content = styled.View`
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
  border-left-color: ${({ theme, ticket }) =>
    ticket.slice(-2) === '34'
      ? theme.color.ticketBDR
      : ticket.slice(-1) === '3'
      ? theme.color.ticketOn
      : ticket.slice(-1) === '4'
      ? theme.color.ticketPn
      : ticket.slice(-2) === '11'
      ? theme.color.ticketUnit
      : theme.color.ticketAll};
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
  width: 75%;
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
