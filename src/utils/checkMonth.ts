import { BuyProps } from './../interface/BuyInterface';
import monthVisa from './monthVisa';
/**
  * Essa função serve para adicionar corretamente cada compra para o array do mês correspondente da compra.
  * A comparação foi feita por meio de index, no qual cada objeto 'month', tem um index, sendo o index 0(janeiro), e assim por diante.
  */

export function monthsUpdate(buy: BuyProps, months: typeof monthVisa) {
  const buyDate = new Date(buy.date)
  const buyMonth = buyDate.getMonth()
  // const quotes = buy.quantityQuota

  const monthsUpdated = months.map((month, indexMonth) => {

    if (buyMonth == indexMonth) {
      for(let i = 0; i < buy.quantityQuota; i++){
        months.forEach(item => {
          if(item.name == month.name){
            item.quotes.push(buy)
          }
        })

      }

      // console.log(buy)
      month.quotes.push(buy)
    }
    return month
  })

  return monthsUpdated
  // return c
}