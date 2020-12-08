import styled from 'styled-components/native';

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px 20px 4px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 500px;
  width: 100%;
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
`;
