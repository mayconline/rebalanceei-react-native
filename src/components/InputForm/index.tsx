import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { Container, InputGroup, Label, TextInput, InputIcon } from './styles';

interface IInputProps extends TextInputProps {
  label: string;
  isSecure?: boolean;
  width?: number;
}

const InputForm = ({
  label,
  value,
  defaultValue,
  isSecure = false,
  placeholder,
  autoCompleteType,
  maxLength,
  editable,
  keyboardType,
  returnKeyType = 'next',
  autoCapitalize = 'none',
  autoFocus,
  onFocus,
  onChangeText,
  onEndEditing,
  onSubmitEditing,
  width,
}: IInputProps) => {
  const { color } = useContext(ThemeContext);
  const [visiblePassword, setVisiblePassword] = useState(true);

  return (
    <Container autoFocus={autoFocus} width={width}>
      <InputGroup>
        <Label accessibilityLabel={label} autoFocus={autoFocus}>
          {label}
        </Label>
        <TextInput
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={color.titleNotImport}
          autoCompleteType={autoCompleteType}
          maxLength={maxLength}
          editable={editable}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={isSecure && visiblePassword}
          accessibilityValue={{ text: value }}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
        />
      </InputGroup>
      {isSecure && (
        <InputIcon
          accessibilityLabel="Ver Senha"
          onPress={() =>
            setVisiblePassword(visiblePassword => !visiblePassword)
          }
        >
          <Entypo
            testID={!visiblePassword ? 'eye-with-line' : 'eye'}
            name={!visiblePassword ? 'eye-with-line' : 'eye'}
            size={24}
            color={!autoFocus ? color.titleNotImport : color.bgHeaderEmpty}
          />
        </InputIcon>
      )}
    </Container>
  );
};

export default InputForm;
