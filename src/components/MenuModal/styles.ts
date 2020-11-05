import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 380px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
  text-align: center;
  padding-bottom: 8px;
  flex: 1;
`;

export const BackIcon = styled.TouchableOpacity``;

export const MenuContainer = styled.View``;

export const Menu = styled.TouchableOpacity`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const MenuIcon = styled.View`
  margin-right: 8px;
`;

export const MenuTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  max-width: 80%;
`;
