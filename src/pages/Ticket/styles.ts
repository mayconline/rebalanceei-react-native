import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getClassTicket } from '../../utils/format';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 4px 12px 0;
  flex: 0;
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
    theme.color[getClassTicket(ticket)]};
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
