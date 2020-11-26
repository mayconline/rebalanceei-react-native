import styled from 'styled-components/native';

interface ITextContentError {
  isTabs?: boolean;
}

export const TextContentError = styled.Text<ITextContentError>`
  color: ${({ theme, isTabs }) =>
    !isTabs ? theme.color.warning : theme.color.secondary};
  font: 400 16px/24px 'TitilliumWeb_400Regular';
  text-align: center;
  margin-top: -12px;
`;
