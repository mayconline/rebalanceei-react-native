import styled from 'styled-components/native';

export interface RadioProps {
  selected?: boolean;
}

export interface IPercentVariation {
  value: number;
}

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 320px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
  align-self: center;
  padding-bottom: 8px;
`;

export const Content = styled.View`
  flex: 0;
`;

export const Card = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const CardTitleContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;
export const WalletTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  max-width: 80%;
`;
export const CardSubTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const CurrentAmount = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;
export const VariationPercent = styled.Text<IPercentVariation>`
  color: ${({ theme, value }) =>
    value > 0
      ? theme.color.success
      : value < 0
      ? theme.color.danger
      : theme.color.titleNotImport};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const PercentWallet = styled.View`
  flex-direction: column;
  margin-right: 16px;
`;
export const PercentTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const CurrentPercent = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  align-self: flex-end;
`;
export const AddWalletContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;
export const Label = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  padding: 8px;
`;

export const AddButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const BackIcon = styled.View`
  margin-top: 2px;
`;

export const BackButton = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  margin-left: 4px;
`;

export const WalletRadioSelect = styled.View<RadioProps>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border: ${({ selected }) => (selected ? '8px' : '4px')} solid
    ${({ selected, theme }) =>
      selected ? theme.color.blue : theme.color.inactiveTabs};
`;
