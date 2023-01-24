import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { BuyProps } from "../interface/BuyInterface";

export const RicoContext = createContext<any>({})

export function RicoProvider({ children }) {

  const [card, setCard] = useState({
    title: 'Rico',
    limit: 2000.00, //limite total
    available: 2000.00, //limite disponível
    validity: '26/10',
  })
  
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

    //data = array de objetos das compras que eu fiz
    const SetLocalValue = async (data) => {

      console.log('setando direto local', data)
  
      try {
        const JSONData = JSON.stringify(buys)
        await AsyncStorage.setItem('RICO', JSONData)
  
      } catch(err) {
        console.error(err)
      }
    }
  
    const GetLocalValue = async () => {
      try {
        const value = await AsyncStorage.getItem('RICO')
  
        if(value != null){
          setBuys(JSON.parse(value))
          console.log("armazenamento local contexto", buys)
        }
        
      } catch(err) {
        console.error(err)
      }
    }
  const UpdateAvailableCard = (newAvailable) => {
    setCard(card => card.available = newAvailable)
  }

  return (
    <RicoContext.Provider value={{
      buys,
      AddNewBuy,
      card,
      UpdateAvailableCard,

      SetLocalValue,
      GetLocalValue,
    }}>


      {children}
    </RicoContext.Provider>
  )
}