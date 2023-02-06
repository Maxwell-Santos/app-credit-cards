import styled from 'styled-components/native'

export const Container = styled.View`
  border-radius: 4px;
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG};
  font-size: 18px;
  /* font-weight: 600; */
`;

export const TagHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BuyDescription = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_TAG_DESCRIPTION};
  font-size: 14px;
  margin-bottom: 8px;

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
  font-size: 16px;
`;

export const TagFooter = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;