import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled(LinearGradient)`
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Wallet = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  padding: 0 16px;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const Icons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Visibled = styled.TouchableOpacity`
  padding: 0 16px;
`;
export const Menu = styled.TouchableOpacity`
  padding: 0 16px;
`;
