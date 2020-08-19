import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export interface AddButtonProps {
  onPress?(): void;
  focused?: boolean;
  size: number;
  mb?: number;
}

export const Button = styled(LinearGradient)<AddButtonProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  border: 3px solid
    ${({ focused, theme }) =>
      focused ? theme.color.secondary : theme.color.blueLight};

  ${({ mb }) =>
    mb &&
    css`
      margin-bottom: ${mb}px;
    `}
`;
