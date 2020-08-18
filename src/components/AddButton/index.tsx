import React, { useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { AddButtonProps, Button } from './styles';

const AddButton: React.FC<AddButtonProps> = ({ onPress, focused, size }) => {
  const { color, gradient } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button
        colors={gradient.darkToLightBlue}
        start={[1, 0.5]}
        focused={focused}
        size={size}
      >
        <Feather
          name="plus"
          size={size / 2}
          color={focused ? color.secondary : color.blueLight}
        />
      </Button>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;
