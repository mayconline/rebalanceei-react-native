import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export interface PayButtonProps {
  onPress?(): void;
  focused?: boolean;
  size: number;
}

export const Button = styled(LinearGradient)<PayButtonProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  border: 3px solid
    ${({ focused, theme }) =>
      focused ? theme.color.secondary : theme.color.blueLight};
`;
