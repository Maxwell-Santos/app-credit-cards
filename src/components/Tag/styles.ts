import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.BACKGROUND.TAG};
  border-radius: 10px;
  padding: 20px;
  margin: 8px 0px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG};
  font-size: 20px;
  font-weight: 600;
`;

export const TagHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BuyDescription = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG_DESCRIPTION};
  margin: 8px 0px 10px 0px;
  font-size: 16px;

`;

export const Quotes = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG};
  font-size: 16px;

`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG};
  
`;

export const PriceContent = styled.View``;

export const Price = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG};
  font-size: 20px;
`;

export const TagFooter = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;