import styled from 'styled-components/native';

interface IFormatStatus {
  status?: string;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.primary};
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
export const TargetPercent = styled.Text<IFormatStatus>`
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

export const Amount = styled.Text<IFormatStatus>`
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

export const Status = styled.Text<IFormatStatus>`
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
