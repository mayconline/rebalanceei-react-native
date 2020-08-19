import React, { useContext } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { AddButtonProps, Button } from './styles';

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  focused,
  size,
  mb,
}) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <BorderlessButton onPress={onPress}>
      <Button
        colors={gradient.darkToLightBlue}
        start={[1, 0.5]}
        focused={focused}
        size={size}
        mb={mb}
      >
        <Feather
          name="plus"
          size={size / 2}
          color={focused ? color.secondary : color.blueLight}
        />
      </Button>
    </BorderlessButton>
  );
};

export default AddButton;
