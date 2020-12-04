import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
`;

export const Card = styled(LinearGradient)<any>`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 4px 12px;
  border-radius: 30px;
  padding: 12px 20px;
  border-left-color: ${({ theme, isPositive }) =>
    isPositive ? theme.color.success : theme.color.danger};
  border-left-width: 2px;
`;

export const WalletContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const PreviousContainer = styled.View``;

export const CurrentContainer = styled.View`
  align-items: flex-end;
`;

export const PreviousTitle = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
`;
export const CurrentTitle = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
`;

export const PreviousAmount = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 400 16px/20px 'TitilliumWeb_400Regular';
  padding-left: 8px;
  padding-top: 4px;
`;

export const CurrentAmountContainer = styled.View`
  flex-direction: row;
`;

export const CurrentAmount = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 400 16px/20px 'TitilliumWeb_400Regular';
  padding-left: 8px;
  padding-top: 4px;
`;

export const VariationAmount = styled.Text<any>`
  color: ${({ theme, isPositive }) =>
    isPositive ? theme.color.success : theme.color.danger};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
  align-self: flex-end;
`;
