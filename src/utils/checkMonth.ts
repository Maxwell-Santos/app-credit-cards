import { BuyProps } from './../interface/BuyInterface';
import monthVisa from './monthsVisa';
/**
  * Essa função serve para adicionar corretamente cada compra para o array do mês correspondente da compra.
  * A comparação foi feita por meio de index, no qual cada objeto 'month', tem um index, sendo o index 0(janeiro), e assim por diante.
  */

 function juntarArrays(mesesDeCompra, mesesNoTotal) {

  const finalmente = mesesNoTotal.map(mesPrincipal => {
    mesesDeCompra.forEach(mesDeCompra => {
      if(mesPrincipal.name == mesDeCompra.name){
        mesPrincipal.quotes.concat(mesDeCompra.quotes)
      }
    });

    return mesPrincipal
  })

  return finalmente
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

        months.forEach((mes, index) => {
          if(index == monthBuy) {
            mes.quotes.push(buy)

            monthsContainInstallments.push(mes)
          }
        })
        monthBuy++
        quantityQuotes--
      }
      return month
    }
  })

  const retorno = juntarArrays(monthsContainInstallments, months)
  return retorno
}