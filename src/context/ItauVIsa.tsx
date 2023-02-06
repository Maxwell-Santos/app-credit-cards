import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useState } from "react";
import { monthsUpdate } from "../utils/checkMonth";
import monthsVisa from "../utils/monthsVisa";

export const ItauVContext = createContext<any>({})

export function ItauVProvider({ children }) {

  const [card, setCard] = useState({
    title: 'Itaú Visa',
    limit: 2390.00, //limite total
    available: 2390.00, //limite disponível
    validity: '01/30',
  })

  const [buys, setBuys] = useState(monthsVisa)
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

  const AddNewBuy = (data) => {
    // setBuys(prev => [...prev, data])

    setBuys(monthsUpdate(data, monthsVisa))
    SetLocalValue(buys)
  }


  //data = array de objetos das compras que eu fiz
  const SetLocalValue = async (data) => {

    console.log('setando direto local', data)

    try {
      const JSONData = JSON.stringify(buys)
      await AsyncStorage.setItem('BUYS_ITAUV', JSONData)

    } catch (err) {
      console.error(err)
    }
  }

  const GetLocalValue = async () => {
    try {
      const value = await AsyncStorage.getItem('BUYS_ITAUV')

      if (value != null) {
        setBuys(JSON.parse(value))
        console.log("armazenamento local contexto", buys)
      }

    } catch (err) {
      console.error(err)
    }
  }
  
  let a = []
  useMemo(() => {
    buys.map(item => {
      item.quotes.map(item => a.push(item.priceQuota))
      let b = a.reduce((prev, curr) => prev + curr, 0)
      setResultados(b)
    })
  },[buys])

  return (
    <ItauVContext.Provider value={{
      buys,
      AddNewBuy,
      card,

      SetLocalValue,
      GetLocalValue,
      resultado
    }}>

      {children}
    </ItauVContext.Provider>
  )
}