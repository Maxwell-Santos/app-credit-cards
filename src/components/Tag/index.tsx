import { BuyProps } from '../../interface/BuyInterface';
import { StyleSheet } from 'react-native';
import * as Styled from './styles'
import { formatWithMask, Masks } from 'react-native-mask-input';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated,
{
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { useContext, useRef } from 'react';
import { ItauMContext } from '../../context/Itau-Mastercard';
import { ItauVContext } from '../../context/ItauVIsa';
import { RicoContext } from '../../context/Rico';
import CardProviderInterface from '../../interface/CardProviderInterface';

export function Tag({
  id,
  month,
  title,
  bankName,
  date,
  price,
  quantityQuota,
  priceQuota,
  description,
  state
}: BuyProps) {

  const doubleTapActive = useSharedValue(0)
  const theme = useTheme()

  const RICO: CardProviderInterface = useContext(RicoContext)
  const ITAU_M: CardProviderInterface = useContext(ItauMContext)
  const ITAU_V: CardProviderInterface = useContext(ItauVContext)
  
  const tocou = () => {
    const tagState = state

    
    if (bankName == 'itau-visa') ITAU_V.SetPaymentQuote({
      priceQuota, 
      id, 
      quantityQuota, 
      monthQuota: month,
      tagState
    })
    // if (bankName == 'itau-mastercard') ITAU_M.AddNewBuy()
    // if (bankName == 'rico') RICO.AddNewBuy()
  }

  const onGesture = Gesture.Tap()

  onGesture.numberOfTaps(2)
    .onStart(() => {
      doubleTapActive.value = withTiming(doubleTapActive.value === 0 ? 1 : 0, { duration: 100 })
    })
    .onFinalize((event, success) => {
      if(success) tocou()
    })

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(doubleTapActive.value, [0, 1], [theme.BACKGROUND.TAG, '#27d327c5'])
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

  //renomeando a variável 'masked' para 'priceQuotaMasked' 
  const { masked: priceQuotaMasked } = formatWithMask({
    text: priceQuota.toFixed(2),
    mask: Masks.BRL_CURRENCY
  })

  const { masked: priceMasked } = formatWithMask({
    text: price.toFixed(2),
    mask: Masks.BRL_CURRENCY
  })

  return (
    <GestureDetector
      gesture={onGesture}
    >
      <Animated.View 
      style={[animatedStyle, { borderRadius: 8, marginBottom: 10 }]}
      >
        <Styled.Container>
          <Styled.TagHeader>
            <Styled.Title style={{ fontFamily: 'Inter_700Bold' }}>{c}</Styled.Title>

            <Styled.PriceContent>
              <Styled.Price style={styles.fontRegular}>{priceQuotaMasked}</Styled.Price>
            </Styled.PriceContent>

          </Styled.TagHeader>
          <Styled.BuyDescription style={styles.fontRegular}>{description}</Styled.BuyDescription>

          <Styled.TagFooter>
            <Styled.Date style={[styles.fontRegular, { fontSize: 10 }]}>total: {priceMasked}</Styled.Date>
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