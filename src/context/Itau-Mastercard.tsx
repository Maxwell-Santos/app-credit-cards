import { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { monthsUpdate } from "../utils/checkMonth";
import monthsMastercard from "../utils/monthsMastercard";

export const ItauMContext = createContext<any>({})

export function ItauMProvider({ children }) {
  const [card, setCard] = useState({
    title: 'Itaú Mastercard',
    limit: 2000.00, //limite total
    available: 2000.00, //limite disponível
    validity: '26/10',
  })

  const [buys, setBuys] = useState(monthsMastercard)
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

    setBuys(monthsUpdate(data, monthsMastercard))
    SetLocalValue(buys)
  }

  const SetLocalValue = async (data) => {

    console.log('setando direto local', data)

    try {
      const JSONData = JSON.stringify(buys)
      await AsyncStorage.setItem('BUYS_ITAUM', JSONData)

    } catch (err) {
      console.error(err)
    }
  }

  const GetLocalValue = async () => {
    try {
      const value = await AsyncStorage.getItem('BUYS_ITAUM')

      if (value != null) {
        setBuys(JSON.parse(value))
        console.log("armazenamento local contexto", buys, '\n')
      }

    } catch (err) {
      console.error(err)
    }
  }

  const UpdateAvailableCard = (newAvailable) => {
    setCard(card => card.available = newAvailable)
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
    <ItauMContext.Provider value={{
      buys,
      AddNewBuy,
      card,
      UpdateAvailableCard,

      SetLocalValue,
      GetLocalValue,
      resultado
    }}>

      {children}
    </ItauMContext.Provider>
  )
}