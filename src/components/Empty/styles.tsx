import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export const Main = styled.View``;

export const Image = styled.View`
  height: 280px;
  padding: 16px;
`;

export const ContainerTitle = styled.View`
  align-items: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  text-align: center;
`;

export const Gradient = styled(LinearGradient)`
  justify-content: center;
  margin-top: 36px;
  border-radius: 24px;
`;

export const Footer = styled.View`
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  padding: 12px 80px;
  border-radius: 24px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;
