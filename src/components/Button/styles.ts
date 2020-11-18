import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Gradient = styled(LinearGradient)<any>`
  justify-content: center;
  margin-top: 4px;
  border-radius: 24px;
`;

export const ContainerButton = styled.TouchableOpacity<any>`
  align-items: center;
  padding: 12px 20px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;
