import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Gradient, ContainerButton, TextButton } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  children: string;
  colors: string[];
  start: number[];
  loading?: boolean;
}

const Button = ({
  children,
  colors,
  start,
  loading,
  ...rest
}: IButtonProps) => {
  return (
    <Gradient colors={colors} start={start}>
      <ContainerButton {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <TextButton accessibilityRole="button">{children}</TextButton>
        )}
      </ContainerButton>
    </Gradient>
  );
};

export default Button;
