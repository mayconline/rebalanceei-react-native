import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 608px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerTitle = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
  align-self: center;
`;

export const LootieContainer = styled.View`
  min-height: 500px;
`;

export const Gradient = styled(LinearGradient)`
  justify-content: center;
  border-radius: 24px;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  align-items: center;
  padding: 12px;
  border-radius: 4px;
`;

export const BackButton = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font: 600 20px/28px 'TitilliumWeb_600SemiBold';
`;
