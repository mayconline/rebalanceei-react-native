import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
  elevation: 5;
`;

export const ContainerTitle = styled.View`
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BackIcon = styled.TouchableOpacity`
  padding-right: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 24px/32px 'TitilliumWeb_600SemiBold';

  text-align: center;
  flex: 1;
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

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  padding: 12px 44px;
`;

export const Gradient = styled(LinearGradient)<any>`
  justify-content: center;
  border-radius: 12px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/24px 'TitilliumWeb_600SemiBold';
`;
