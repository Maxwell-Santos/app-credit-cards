import styled from 'styled-components/native'

export const Card = styled.View`
  background-color: ${({ theme }) => theme.BACKGROUND.CARD};
  padding: 40px;
`;

export const Title = styled.Text`
  color:${({ theme }) => theme.COLOR.TITLE_CARD};
  font-size: 24px;
`;

export const ContentValidity = styled.View`

`;

export const Validity = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_CARD}
`;


export const CashContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px 20px 0px;
`;

export const Cash = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_CARD}
  `;

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLOR.TEXT_CARD}
`;