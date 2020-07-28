import styled from 'styled-components/native';

interface filtersProps {
  onPress?(): void;
  focused: boolean;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const Content = styled.ScrollView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const FiltersContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin: 8px 0;
`;

export const Filter = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const TextFilter = styled.Text<filtersProps>`
  background-color: ${({ focused, theme }) =>
    focused ? theme.color.bgFiltersActive : theme.color.secondary};
  color: ${({ focused, theme }) =>
    focused ? theme.color.blue : theme.color.subtitle};
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const Card = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.blueLight};
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 4px 0;
  border-radius: 30px;
  padding: 8px 24px;
`;
export const CardContent = styled.View``;
export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;
export const CardSubTitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 12px;
  line-height: 24px;
  font-family: 'TitilliumWeb_400Regular';
`;
export const Grade = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;
