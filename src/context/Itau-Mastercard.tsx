import { createContext, useEffect, useState } from "react";
import { BuyProps } from "../interface/BuyInterface";
import AsyncStorage from '@react-native-async-storage/async-storage';
import months from "../utils/months";

export const ItauMContext = createContext<any>({})

export function ItauMProvider({ children }) {
  const [card, setCard] = useState({
    title: 'Itaú Mastercard',
    limit: 2000.00, //limite total
    available: 2000.00, //limite disponível
    validity: '26/10',
  })

  const cloneMonths = [...months]
  // console.log(cloneMonths)


  const [buys, setBuys] = useState<BuyProps[]>([])

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
    setBuys(prev => [...prev, data])

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
        console.log("armazenamento local contexto", buys)
      }

    } catch (err) {
      console.error(err)
    }
  }

  const UpdateAvailableCard = (newAvailable) => {
    setCard(card => card.available = newAvailable)
  }

  return (
    <ItauMContext.Provider value={{
      buys,
      AddNewBuy,
      card,
      UpdateAvailableCard,

      SetLocalValue,
      GetLocalValue,
    }}>

      {children}
    </ItauMContext.Provider>
  )
}