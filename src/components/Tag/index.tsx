import { BuyProps } from '../../interface/BuyInterface';
import * as Styled from './styles'

export function Tag({
  title,
  date,
  price,
  quantityQuota,
  valueQuota,
  description
}: BuyProps) {

  const e = new Date(date)
  console.log(e)

  return (
    <Styled.Container>
      <Styled.TagHeader>
        <Styled.Title>{title}</Styled.Title>
        <Styled.PriceContent>
          <Styled.Price>{price}</Styled.Price>
        </Styled.PriceContent>

      </Styled.TagHeader>
      <Styled.BuyDescription>{description}</Styled.BuyDescription>

      <Styled.TagFooter>
        <Styled.Quotes>{quantityQuota}</Styled.Quotes>
        {
          date ? (
            <Styled.Date>{String(date)}</Styled.Date>
          ) : ''
        }
      </Styled.TagFooter>
    </Styled.Container>
  )
}
