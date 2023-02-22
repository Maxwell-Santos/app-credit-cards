import { BuyProps } from '../../interface/BuyInterface';
import { StyleSheet } from 'react-native';
import * as Styled from './styles'
import { formatWithMask, Masks } from 'react-native-mask-input';

import { useTheme } from 'styled-components';

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

  const theme = useTheme()

  const DATE_BUY = date && new Date(date)

  const addZero = (number: number) => {
    if (number <= 9) return "0" + number
    return number
  }

  const formattedDate = ((addZero(DATE_BUY.getDate()))) + "/" + ((addZero(DATE_BUY.getMonth() + 1))) + "/" + DATE_BUY.getFullYear()

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
    <Styled.Container
    style={{
      backgroundColor: state ? '#27d327c5' : theme.BACKGROUND.TAG,
      borderRadius: 8
    }}
    >
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
            <Styled.Date style={styles.fontRegular}>{formattedDate}</Styled.Date>
          ) : ''
        }
      </Styled.TagFooter>
    </Styled.Container>
  )
}

const styles = StyleSheet.create({
  fontRegular: {
    fontFamily: 'Inter_400Regular'
  }
})