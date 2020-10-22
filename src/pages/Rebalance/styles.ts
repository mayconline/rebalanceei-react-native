import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
interface IFormatStatus {
  status?: string;
}

interface IformatNumber {
  variation: number;
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

export const Card = styled(LinearGradient)<any>`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 4px 0;
  border-radius: 30px;
  padding: 8px 20px;
  border-left-color: ${({ theme, status }) =>
    status === 'BUY'
      ? theme.color.success
      : status === 'KEEP'
      ? theme.color.warning
      : theme.color.danger};
  border-left-width: 2px;
`;

export const CardContent = styled.View`
  flex: 1;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
`;

export const CardTicket = styled.Text`
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
  width: 70%;
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
  font-family: 'TitilliumWeb_400Regular';
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
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  padding-right: 4px;
`;
