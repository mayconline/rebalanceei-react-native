import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled(LinearGradient)<any>`
  min-height: 100px;
`;

export const MenuBar = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
`;

export const Wallet = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  margin-left: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  font-family: 'TitilliumWeb_600SemiBold';
  margin-right: 8px;
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
