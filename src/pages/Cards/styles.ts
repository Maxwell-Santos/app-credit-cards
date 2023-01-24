import styled from "styled-components/native";

export const Container = styled.ScrollView`
  background-color: ${({theme}) => theme.BACKGROUND.PRIMARY};
  flex: 1;
`;

export const Title = styled.Text`
  color:  ${({theme}) => theme.COLOR.PRIMARY};
`;

export const MonthsContainer = styled.View`
  padding: 20px 10px;
`;

export const Month = styled.View`

`;
