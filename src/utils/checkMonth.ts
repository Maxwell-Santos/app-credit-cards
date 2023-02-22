import { BuyProps } from './../interface/BuyInterface';
import monthVisa from './monthsVisa';
/**
  * Essa função serve para adicionar corretamente cada compra para o array do mês correspondente da compra.
  * A comparação foi feita por meio de index, no qual cada objeto 'month', tem um index, sendo o index 0(janeiro), e assim por diante.
  */

 function joinArrays(monthsOfBuy, totalMonths) {

  const finallyLoop = totalMonths.map(mainMonth => {
    monthsOfBuy.forEach(singularMonthOfBuy => {
      
      if(mainMonth.name == singularMonthOfBuy.name){
        mainMonth.quotes.concat(singularMonthOfBuy.quotes)
      }
    })

    return mainMonth
  })

  return finallyLoop
}

export function monthsUpdate(buy: BuyProps, months: typeof monthVisa) {
  const buyDate = new Date(buy.date)  
  const buyMonth = buyDate.getMonth()
  let monthsContainInstallments = [] //meses que contém as parcelas

  months.map((month, indexMonth) => {
    
    if (buyMonth == indexMonth) {
      let quantityQuotes = buy.quantityQuota
      let monthBuy = indexMonth //mês encontrado de onde se inicia a compra

      while (quantityQuotes > 0) {

        months.forEach((month, index) => {
          if(index == monthBuy) {
            month.quotes.push(buy)

            monthsContainInstallments.push(month)
          }
        })
        monthBuy++
        quantityQuotes--
      }
      return month
    }
  })

  const retorno = joinArrays(monthsContainInstallments, months)
  return retorno
}