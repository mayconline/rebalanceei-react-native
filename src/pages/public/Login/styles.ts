import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bgHeaderEmpty};
`;

export const Header = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.TouchableOpacity`
  padding: 0 24px 0 12px;
`;

export const ContainerTitle = styled.View`
  flex: 1;
  padding-left: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 24px/32px 'TitilliumWeb_600SemiBold';
`;

export const Image = styled.View`
  height: 240px;
`;

export const FormContainer = styled.KeyboardAvoidingView`
  height: 320px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 500px;
  width: 100%;
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const InputGroup = styled.View`
  align-self: center;
  width: 100%;
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

export const InputIcon = styled(BorderlessButton)`
  margin-left: -32px;
`;

export const Gradient = styled(LinearGradient)<any>`
  justify-content: center;
  margin-top: 36px;
  border-radius: 24px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  padding: 12px 20px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;

export const ContainerTextLink = styled(BorderlessButton)`
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const TextLink = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;

export const TextError = styled.Text`
  color: ${({ theme }) => theme.color.warning};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  text-align: center;
`;
