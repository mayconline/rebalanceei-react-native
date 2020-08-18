import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 250px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  elevation: 5;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.titleNotImport};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  align-self: center;
`;

export const Card = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;
export const CardTitleContainer = styled.View`
  flex-direction: column;
`;
export const WalletTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const CardSubTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const CurrentAmount = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;
export const VariationPercent = styled.Text`
  color: ${({ theme }) => theme.color.success};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const PercentWallet = styled.View`
  flex-direction: column;
`;
export const PercentTitle = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
`;
export const CurrentPercent = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
`;
export const AddWalletContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
export const Label = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  padding: 8px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const BackButton = styled.Text`
  color: ${({ theme }) => theme.color.subtitle};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  padding: 8px;
  align-self: flex-start;
`;
