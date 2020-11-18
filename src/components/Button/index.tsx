import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Gradient, ContainerButton, TextButton } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  children: string;
  colors: string[];
  start: number[];
}

const Button = ({ children, colors, start, ...rest }: IButtonProps) => {
  return (
    <Gradient colors={colors} start={start}>
      <ContainerButton {...rest}>
        <TextButton accessibilityRole="button">{children}</TextButton>
      </ContainerButton>
    </Gradient>
  );
};

export default Button;
