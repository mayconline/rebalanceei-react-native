import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';

interface IStepIndicator {
  active?: boolean;
}

interface INextButton {
  next?: boolean;
}

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bgHeaderEmpty};
`;

export const Header = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Icon = styled.TouchableOpacity`
  padding: 0 24px 0 12px;
`;

export const ContainerTitle = styled.View`
  align-items: center;
`;

export const ContainerIndicator = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 0 12px;
`;

export const StepIndicator = styled.View<IStepIndicator>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, active }) =>
    active ? theme.color.blue : theme.color.blueLight};
  margin: 0 4px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 36px/44px 'TitilliumWeb_600SemiBold';
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  text-align: center;
`;

export const Image = styled.View`
  height: 240px;
`;

export const StepContainer = styled.View`
  height: 320px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
`;

export const Step = styled.View`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 500px;
  width: 100%;
`;

export const Gradient = styled(LinearGradient)<any>`
  justify-content: center;
  margin-top: 36px;
  border-radius: 24px;
`;

export const Button = styled.TouchableOpacity<INextButton>`
  align-items: center;
  padding: 12px 20px;
  border-color: ${({ theme }) => theme.color.blue};
  border-width: ${({ next }) => (next ? '1px' : 'undefined')};
  border-radius: 24px;
`;

export const TextButton = styled.Text<INextButton>`
  color: ${({ theme, next }) =>
    next ? theme.color.blue : theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;

export const ContainerTextLink = styled(BorderlessButton)`
  align-items: center;
  padding: 0 16px;
`;

export const TextLink = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
