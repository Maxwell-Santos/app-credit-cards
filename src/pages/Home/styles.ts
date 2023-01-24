import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background: ${({ theme }) => theme.BACKGROUND.PRIMARY};
`;

export const ContainerCards = styled.View`
  flex: 1;
  width: 90%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Card = styled.View`
  width: 100%;
  height: 220px;
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
`;

export const LinkCards = styled.TouchableOpacity`
  background: ${({ theme }) => theme.BACKGROUND.BUTTON};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLOR.BUTTON};
  font-size: 20px;
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.COLOR.BUTTON};
  font-weight: 600;
  font-size: 26px;
  text-transform: uppercase;
`;
