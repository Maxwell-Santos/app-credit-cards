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
  /* margin: 20px 0px; */
`;

export const TitleMonth = styled.Text`
  color: ${({theme}) => theme.COLOR.TITLE_MONTH};
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 600;
  margin: 30px 0px 16px 0px;
  margin-left: 10px;
`;
