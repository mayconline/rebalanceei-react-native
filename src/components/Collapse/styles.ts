import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  margin: 8px 0;
  flex: 1;
  border-color: ${({ theme }) => theme.color.success};
  border-width: 2px;
  border-radius: 12px;
`;

export const Header = styled.TouchableOpacity`
  padding: 8px 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;

export const Body = styled.View`
  padding: 8px 12px;
`;
