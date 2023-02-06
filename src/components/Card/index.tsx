import { View } from 'react-native';
import * as Styled from './styles';

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Progress } from 'native-base'

interface CardProps {
  title: string;
  validity: string;
  limit: number; //valor total
  available: number; //valor disponível
  result?: number;
}

export function Card({
  title,
  validity,
  limit,
  available,
  result
}: CardProps) {

  const [] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  })

  let regra3 = (100 * result) / limit
  let av = available - result

  console.log("resultado no card", result && result.toFixed(2))

  return (
    <Styled.Card>
      <Styled.Title style={{fontFamily: 'Inter_700Bold'}}>{title}</Styled.Title>

      <Styled.CashContainer>
        <View>
          <Styled.Description style={{fontFamily: 'Inter_400Regular'}}>total</Styled.Description>
          <Styled.Cash>{limit}</Styled.Cash>
        </View>

        <View>
          <Styled.Description style={{fontFamily: 'Inter_400Regular'}}>disponível</Styled.Description>
          <Styled.Cash style={{fontFamily: 'Inter_400Regular'}}>{av}</Styled.Cash>
        </View>
      </Styled.CashContainer>

      <View style={{marginBottom: 20}}>
        <Progress 
          value={result ? regra3 : 0} 
          size="xs" _filledTrack={{
            bg: "#dd5100"
          }}
          />
        </View>

      <Styled.ContentValidity>
        <Styled.Validity style={{fontFamily: 'Inter_400Regular'}}>{validity}</Styled.Validity>
      </Styled.ContentValidity>
    </Styled.Card>
  )
}
