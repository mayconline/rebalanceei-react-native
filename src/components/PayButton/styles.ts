import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export interface PayButtonProps {
  onPress?(): void;
  focused: boolean;
}

export const Button = styled(LinearGradient)<PayButtonProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  border: 3px solid
    ${({ focused, theme }) =>
      focused ? theme.color.secondary : theme.color.blueLight};
`;
