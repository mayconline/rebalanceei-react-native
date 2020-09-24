import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

interface ISuggestions {
  visibled: boolean;
}

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const ContainerTitle = styled.View`
  margin-top: 40px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 24px/32px 'TitilliumWeb_600SemiBold';
  align-self: center;
`;

export const FormContainer = styled.KeyboardAvoidingView`
  flex: 1;
  max-height: 316px;
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 500px;
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const InputGroup = styled.View`
  align-self: center;
  max-width: 65%;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.color.title};
  height: 32px;
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  border-bottom-color: ${({ theme, autoFocus }) =>
    !autoFocus ? theme.color.divider : theme.color.blue};
  border-bottom-width: 1px;
  opacity: ${({ editable = true }) => (!editable ? 0.4 : 1)};
`;

export const Button = styled(RectButton)`
  align-items: center;
  padding: 12px 20px;
`;

export const Gradient = styled(LinearGradient)`
  justify-content: center;
  margin-top: 24px;
  border-radius: 24px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/24px 'TitilliumWeb_600SemiBold';
`;

export const SuggestionContainer = styled.View<ISuggestions>`
  display: ${({ visibled }) => (!visibled ? 'none' : 'flex')};
  elevation: 0.7;
  margin-top: 4px;
  position: relative;
`;

export const SuggestionList = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.color.secondary};
  border-color: ${({ theme }) => theme.color.divider};
  border-width: 0.7px;
  border-radius: 4px;
`;

export const SuggestionItem = styled.View`
  border-bottom-color: ${({ theme }) => theme.color.divider};
  border-bottom-width: 0.7px;
  border-radius: 4px;
`;

export const SuggestionButton = styled(RectButton)`
  padding: 8px;
  border-radius: 4px;
`;

export const SuggestionText = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;