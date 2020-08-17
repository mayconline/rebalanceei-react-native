import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  margin-top: 16px;
`;

export const WalletContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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
export const CurrentAmount = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 400 16px/20px 'TitilliumWeb_400Regular';
  padding-left: 8px;
  padding-top: 4px;
`;

export const VariationAmount = styled.Text`
  color: ${({ theme }) => theme.color.success};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
  align-self: flex-end;
`;
