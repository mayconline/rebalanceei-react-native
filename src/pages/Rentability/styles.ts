import styled from 'styled-components/native';

interface filtersProps {
  onPress?(): void;
  focused?: boolean;
  status?: string;
}

interface IformatNumber {
  variation: number;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const SubHeader = styled.SafeAreaView`
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

export const List = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  flex: 1;
`;

export const Content = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 4px 12px 0;
  flex: 1;
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.color.blueLight};
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 4px 0;
  border-radius: 30px;
  padding: 8px 20px;
`;
export const CardContent = styled.View`
  flex: 1;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
`;

export const Ticket = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
  align-self: flex-end;
`;

export const SubTitleContant = styled.View`
  margin: 0 8px 0 0;
`;

export const CardSubTitle = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 16px;
  line-height: 24px;
  font-family: 'TitilliumWeb_400Regular';
`;

export const AmountContainer = styled.View`
  align-items: flex-end;
`;

export const Amount = styled.Text<IformatNumber>`
  color: ${({ theme, variation }) =>
    variation > 0
      ? theme.color.success
      : variation < 0
      ? theme.color.danger
      : theme.color.subtitle};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const VariationContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Variation = styled.Text<IformatNumber>`
  color: ${({ theme, variation }) =>
    variation > 0
      ? theme.color.success
      : variation < 0
      ? theme.color.danger
      : theme.color.subtitle};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
  padding-right: 4px;
`;
