import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.BACKGROUND.PRIMARY};
`;

export const ContainerCards = styled.View`
  background-color: ${({theme}) => theme.BACKGROUND.CARD};
  margin-bottom: 10px;
  flex: 1.1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLOR.BUTTON};
  font-size: 24px;
  text-transform: uppercase;
  /* flex: 1; */
`;