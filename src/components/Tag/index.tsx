import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BuyProps } from '../../interface/BuyInterface';
import * as Styled from './styles'

import { Vibration } from 'react-native';

const BACKGROUND = '#8585853b'

export function Tag({
  title,
  date,
  price,
  quantityQuota,
  valueQuota,
  description
}: BuyProps) {

  const bg = useSharedValue(BACKGROUND)

  const longPressGesture = Gesture
    .LongPress()
    .onEnd((event, success) => {

      if (success) {
        console.log(`Duração: ${event.duration} ms.`);
        bg.value = withTiming("#27d327c5");

        Vibration.vibrate()

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

  return (
    <GestureDetector
      gesture={longPressGesture}
    >
      <Animated.View style={[animatedStyle, { borderRadius: 10 }]}>
        <Styled.Container>
          <Styled.TagHeader>
            <Styled.Title>{title}</Styled.Title>
            <Styled.PriceContent>
              <Styled.Price>{price}</Styled.Price>
            </Styled.PriceContent>

          </Styled.TagHeader>
          <Styled.BuyDescription>{description}</Styled.BuyDescription>

          <Styled.TagFooter>
            <Styled.Quotes>{quantityQuota} / {quantityQuota}</Styled.Quotes>
            {
              date ? (
                <Styled.Date>{formatedDate}</Styled.Date>
              ) : ''
            }
          </Styled.TagFooter>
        </Styled.Container>
      </Animated.View>
    </GestureDetector>
  )
}
