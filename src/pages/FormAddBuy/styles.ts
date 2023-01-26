import styled from 'styled-components/native'

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
  background-color: ${({ theme }) => theme.BACKGROUND.PRIMARY};


`;
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.BACKGROUND.PRIMARY};
  padding: 20px;
  overflow: scroll;
`;

export const ContainerInputs = styled.View`
  flex: 1;
  margin-top: 10%;
  /* justify-content: center; */
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLOR.PRIMARY};
  margin-left: 8px;
  text-transform: capitalize;
  font-size: 16px;
  margin-bottom: 10px;

`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.COLOR.PRIMARY};
  background: ${({ theme }) => theme.BACKGROUND.INPUT};
  padding: 16px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
`;

export const Selection = styled.View`
  color: ${({ theme }) => theme.COLOR.PRIMARY};
  background: ${({ theme }) => theme.BACKGROUND.INPUT};
  /* padding: 16px 20px; */
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
  background: ${({ theme }) => theme.BACKGROUND.INPUT};
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 16px 20px;
  `;

export const DateInput = styled.Text`
  color: ${({ theme }) => theme.COLOR.PRIMARY};
  flex: 1;
  margin-left: 10px;
`;

export const Submit = styled.TouchableOpacity`
background-color: ${({theme}) => theme.BACKGROUND.BUTTON}; 
height: 50px;
flex: 1;
text-align: center; 
border-radius: 10px;
justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.COLOR.BUTTON };
  font-size: 18px;
  text-align: center;
  text-transform: capitalize;
`;


export const Reset = styled.TouchableOpacity`
  border: 1px solid #f00;
  border-radius: 10px;
  flex: .6;
  height: 50px;
  justify-content: center;
  margin-right: 18px;
`;
