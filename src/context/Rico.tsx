import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useState } from "react";
import { monthsUpdate } from "../utils/checkMonth";
import monthsRico from "../utils/monthsRico";

export const RicoContext = createContext<any>({})

export function RicoProvider({ children }) {

  const [card, setCard] = useState({
    title: 'Rico',
    limit: 2000.00, //limite total
    available: 2000.00, //limite disponível
    validity: '25',
    id: 3
  })

  const [buys, setBuys] = useState(monthsRico)
  const [resultado, setResultados] = useState(0)

  /**
 * IMPORTANTE PARA O FUNCIONAMENTO DO CÓDIGO 
*/
  useEffect(() => {
    GetLocalValue()
  }, [])
  /**
   * IMPORTANTE PARA O FUNCIONAMENTO DO CÓDIGO 
  */

  //desconta o valor do mês, quando foi pago, para liberar o limite do cartão
  const SetPaymentQuote = (indexMonthQuota: number, state?: boolean) => {
    const priceQuotes = []

    if (state == true) {

      buys.map((month, indexMonth) => {
  
        if (indexMonthQuota == indexMonth) { //encontrei o mês da compra
  
          month.quotes.forEach(parcela => priceQuotes.push(parcela.priceQuota))
          //somando o valor total das parcelas desse mês
          const sumQuota = priceQuotes.reduce((prev,curr) => prev + curr, 0)
  
          console.log(sumQuota)
          
          setResultados(prev => prev - sumQuota)
  
          console.log('essa compra foi feita no mês de:', month.name)
        }
      })
    } else { //executa a mesma coisa, porém somando os valores, devolvendo o limite disponível para o cartão
      
      buys.map((month, indexMonth) => {
        if (indexMonthQuota == indexMonth) { //encontrei o mês da compra

          month.quotes.forEach(parcela => priceQuotes.push(parcela.priceQuota))
          //somando o valor total das parcelas desse mês
          const sumQuota = priceQuotes.reduce((prev,curr) => prev + curr, 0)
  
          setResultados(prev => prev + sumQuota)
  
          console.log('essa compra foi feita no mês de:', month.name)
        }
      })
    }
  }

  const AddNewBuy = (data) => {

    setBuys(monthsUpdate(data, monthsRico))
    SetLocalValue(buys)
  }

  //data = array de objetos das compras que eu fiz
  const SetLocalValue = async (data) => {

    console.log('setando direto local', data)

    try {
      const JSONData = JSON.stringify(buys)
      await AsyncStorage.setItem('BUYS_RICO', JSONData)

    } catch (err) {
      console.error(err)
    }
  }

  const GetLocalValue = async () => {
    try {
      const value = await AsyncStorage.getItem('BUYS_RICO')

      if (value != null) {
        setBuys(JSON.parse(value))
        console.log("armazenamento local contexto", buys)
      }

    } catch (err) {
      console.error(err)
    }
  }

  let a = []

  //desconta o valor da compra no total do limite do cartão
  useMemo(() => {
    buys.map(item => {
      item.quotes.map(item => a.push(item.priceQuota))
      let b = a.reduce((prev, curr) => prev + curr, 0)
      setResultados(b)
    })
  }, [buys])

  return (
    <RicoContext.Provider value={{
      buys,
      AddNewBuy,
      card,
      SetPaymentQuote,
      
      SetLocalValue,
      GetLocalValue,
      resultado
    }}>


      {children}
    </RicoContext.Provider>
  )
}