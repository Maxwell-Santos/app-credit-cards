import { View } from 'react-native';
import * as Styled from './styles';

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Progress } from 'native-base'
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useMemo } from 'react';

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


  const total = useSharedValue(limit.toFixed(2))

  useMemo(() => {
    total.value =  withTiming(limit.toFixed(2), {duration: 500})
  }, [total.value])
  // console.log("resultado no card", result && result.toFixed(2))

  return (
    <Styled.Card>
      <Styled.Title style={{fontFamily: 'Inter_700Bold'}}>{title}</Styled.Title>

      <Styled.CashContainer>
        <View>
          <Styled.Description style={{fontFamily: 'Inter_400Regular'}}>total</Styled.Description>
          <Styled.Cash>{total.value}</Styled.Cash>
        </View>

        <View>
          <Styled.Description style={{fontFamily: 'Inter_400Regular'}}>disponível</Styled.Description>
          <Styled.Cash style={{fontFamily: 'Inter_400Regular'}}>{av.toFixed(2)}</Styled.Cash>
        </View>
      </Styled.CashContainer>

      <View style={{marginBottom: 20}}>
        <Progress 
          value={result ? regra3 : 0} 
          size="xs" _filledTrack={{
            bg: "#ffa135",
          }}
          _light={{
            bg: '#fff'
          }}
          />
        </View>

      <Styled.ContentValidity>
        <Styled.Validity style={{fontFamily: 'Inter_400Regular'}}>vencimento: {validity}</Styled.Validity>
      </Styled.ContentValidity>
    </Styled.Card>
  )
}
