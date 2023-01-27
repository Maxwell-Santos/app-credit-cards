import { BuyProps } from './../interface/BuyInterface';
import monthVisa from './monthVisa';
/**
  * Essa função serve para adicionar corretamente cada compra para o array do mês correspondente da compra.
  * A comparação foi feita por meio de index, no qual cada objeto 'month', tem um index, sendo o index 0(janeiro), e assim por diante.
  */

export function monthsUpdate(buy: BuyProps, months: typeof monthVisa) {
  const buyDate = new Date(buy.date)
  const buyMonth = buyDate.getMonth()
  let meses = []
  
  const monthsUpdated = months.map((month, indexMonth) => {
    
    if (buyMonth == indexMonth) {
      let quantidadeDeCotas = buy.quantityQuota
      let mesDacompra = indexMonth

      while (quantidadeDeCotas > 0) {

        months.forEach((mes, index) => {
          if(index == mesDacompra) {
            mes.quotes.push(buy)

            meses.push(mes)
          }
        })
        mesDacompra++
        quantidadeDeCotas--
      }
      return month
    }
  })

  const retorno = juntarArrays(meses, months)
  return retorno
}

function distribuir(mesDaCompra: number, meses: typeof monthVisa, compra) {

  let quantidade = compra.quantityQuota

  let mesesJaAdicionadosACompra = []
  let NovoMesDaCompra = mesDaCompra //2

  meses.forEach((mes, index) => {

    if (NovoMesDaCompra == index) {
      mes.quotes.push(compra)

      mesesJaAdicionadosACompra.push(mes)

      NovoMesDaCompra++
      quantidade--
    }
  })

  // console.log(meses)
  console.log('meses adicionados: ', mesesJaAdicionadosACompra)

}

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