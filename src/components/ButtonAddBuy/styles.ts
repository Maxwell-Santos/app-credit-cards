import styled from "styled-components/native";

export const Submit = styled.TouchableOpacity`
background-color: ${({theme}) => theme.BACKGROUND.BUTTON}; 
padding: 15px; 
width: 100%; 
text-align: center; 
border-radius: 10px;
margin-bottom: 26px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLOR.BUTTON };
  font-size: 20px;
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
  `;