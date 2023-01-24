import { Text, View } from 'react-native';
import * as Styled from './styles'

interface CardProps {
  title: string;
  validity: string;
  limit: number; //valor total
  available: number; //valor disponível
}

export function Card({
  title,
  validity,
  limit,
  available,

}: CardProps) {

  return (
    <Styled.Card>
      <Styled.Title>{title}</Styled.Title>

      <Styled.CashContainer>
        <View>
          <Styled.Description>total</Styled.Description>
          <Styled.Cash>{available}</Styled.Cash>
        </View>

        <View>
          <Styled.Description>disponível</Styled.Description>
          <Styled.Cash>{limit}</Styled.Cash>
        </View>
      </Styled.CashContainer>

      <Styled.ContentValidity>
        <Styled.Validity>{validity}</Styled.Validity>
      </Styled.ContentValidity>
    </Styled.Card>
  )
}
