import styled from 'styled-components/native';

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

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const QuestionContainer = styled.ScrollView``;

export const Question = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
