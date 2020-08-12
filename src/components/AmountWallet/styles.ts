import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView``;

export const WalletContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/24px 'TitilliumWeb_600SemiBold';
  margin-bottom: 8px;
`;

export const PreviousContainer = styled.View``;

export const CurrentContainer = styled.View`
  margin-right: 8px;
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
  padding-left: 20px;
  padding-top: 4px;
`;
export const CurrentAmount = styled.Text`
  color: ${({ theme }) => theme.color.title};
  font: 600 16px/20px 'TitilliumWeb_600SemiBold';
  padding-left: 20px;
  padding-top: 4px;
`;
