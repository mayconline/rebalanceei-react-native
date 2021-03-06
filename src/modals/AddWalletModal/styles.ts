import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const ContainerTitle = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.TouchableOpacity`
  padding: 0 24px 0 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 24px/32px 'TitilliumWeb_600SemiBold';
  flex: 1;
  padding: 0 24px;
`;

export const FormContainer = styled.KeyboardAvoidingView`
  height: 300px;
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
  margin-bottom: 16px;
  width: 100%;
`;
