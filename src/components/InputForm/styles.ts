import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface IFocusProps {
  autoFocus?: boolean;
}

export const Container = styled.View<IFocusProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom-color: ${({ theme, autoFocus }) =>
    !autoFocus ? theme.color.divider : theme.color.bgHeaderEmpty};
  border-bottom-width: 1px;
`;

export const InputGroup = styled.View`
  flex: 1;
`;

export const Label = styled.Text<IFocusProps>`
  color: ${({ theme, autoFocus }) =>
    !autoFocus ? theme.color.titleNotImport : theme.color.bgHeaderEmpty};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;

export const TextInput = styled.TextInput`
  color: ${({ theme }) => theme.color.title};
  height: 32px;
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  opacity: ${({ editable = true }) => (!editable ? 0.6 : 1)};
`;

export const InputIcon = styled(BorderlessButton)`
  padding-top: 12px;
`;
