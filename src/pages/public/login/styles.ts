import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const ButtonContainer = styled(RectButton)`
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.blue};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;
