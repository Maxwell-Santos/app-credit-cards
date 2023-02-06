import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BuyProps } from '../../interface/BuyInterface';
import * as Styled from './styles'

import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useEffect } from 'react';
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';

const BACKGROUND = '#36363686'

export function Tag({
  title,
  date,
  price,
  quantityQuota,
  priceQuota,
  description
}: BuyProps) {

  const theme = useTheme()
  const bg = useSharedValue(theme.BACKGROUND.TAG)

  console.log('preço cota', priceQuota)

  const longPressGesture = Gesture
    .LongPress()
    .onEnd((event, success) => {

      if (success) {
        console.log(`Duração: ${event.duration} ms.`);
        bg.value = withTiming("#27d327c5");
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value
  }))

  const s = date && new Date(date)

  const addZero = (number: number) => {
    if (number <= 9) return "0" + number

    return number
  }

  const formatedDate = ((addZero(s.getDate()))) + "/" + ((addZero(s.getMonth() + 1))) + "/" + s.getFullYear()

  // primeira letra em uppercase, apenas aparência 
  const a = title.slice(1)
  const b = title.substring(0, 1)
  const c = b.toUpperCase().concat(a)
  // primeira letra em uppercase, apenas aparência 

  return (
    <GestureDetector
      gesture={longPressGesture}
    >
      <Animated.View style={[animatedStyle, { borderRadius: 8, marginBottom: 10 }]}>
        <Styled.Container>
          <Styled.TagHeader>
            <Styled.Title style={{ fontFamily: 'Inter_700Bold' }}>{c}</Styled.Title>

            <Styled.PriceContent>
              <Styled.Price style={styles.fontRegular}>R$ {priceQuota}</Styled.Price>
            </Styled.PriceContent>

          </Styled.TagHeader>
          <Styled.BuyDescription style={styles.fontRegular}>{description}</Styled.BuyDescription>

          <Styled.TagFooter>
            <Styled.Quotes style={styles.fontRegular}>{quantityQuota} / {quantityQuota}</Styled.Quotes>
            {
              date ? (
                <Styled.Date style={styles.fontRegular}>{formatedDate}</Styled.Date>
              ) : ''
            }
          </Styled.TagFooter>
        </Styled.Container>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  fontRegular: {
    fontFamily: 'Inter_400Regular'
  }
})