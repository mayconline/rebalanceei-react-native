import styled from 'styled-components/native';

interface filtersProps {
  onPress?(): void;
  focused?: boolean;
  status?: string;
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
export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const SubTitleContant = styled.View`
  margin: 0 8px 0 0;
`;

export const CardSubTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 4px 0 -8px;
`;

export const CurrentPercent = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font-size: 12px;
  line-height: 16px;
  font-family: 'TitilliumWeb_600SemiBold';
`;
export const TargetPercent = styled.Text<filtersProps>`
  color: ${({ theme, status }) =>
    status === 'BUY'
      ? theme.color.success
      : status === 'KEEP'
      ? theme.color.warning
      : theme.color.danger};
  font-size: 12px;
  line-height: 16px;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const ProgressBar = styled.ProgressBarAndroid``;

export const AmountContainer = styled.View`
  align-items: center;
  width: 35%;
  margin-right: -12px;
`;

export const Amount = styled.Text<filtersProps>`
  color: ${({ theme, status }) =>
    status === 'BUY'
      ? theme.color.success
      : status === 'KEEP'
      ? theme.color.warning
      : theme.color.danger};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;

export const Status = styled.Text<filtersProps>`
  color: ${({ theme, status }) =>
    status === 'BUY'
      ? theme.color.success
      : status === 'KEEP'
      ? theme.color.warning
      : theme.color.danger};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  font-family: 'TitilliumWeb_600SemiBold';
`;
