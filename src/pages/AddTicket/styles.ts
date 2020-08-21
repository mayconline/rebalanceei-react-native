import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  align-self: center;
`;

export const FormContainer = styled.KeyboardAvoidingView`
  flex: 1;
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

export const InputGroup = styled.View``;

export const Label = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const Input = styled.TextInput`
  color: ${({ theme }) => theme.color.title};
  height: 32px;
  padding: 0 8px;
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;
