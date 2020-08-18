import styled from 'styled-components/native';

export const Backdrop = styled.View`
  background-color: ${({ theme }) => theme.color.shadowBackdrop};
  flex: 1;
  opacity: 0.5;
`;
