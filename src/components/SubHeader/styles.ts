import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
interface IFocused {
  focused: boolean;
}

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
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
  margin: 12px 0 8px;
`;

export const Filter = styled(BorderlessButton)`
  margin-right: 8px;
`;

export const TextFilter = styled.Text<IFocused>`
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
