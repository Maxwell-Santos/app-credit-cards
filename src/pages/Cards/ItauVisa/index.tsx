import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Card } from "../../../components/Card";
import { Tag } from "../../../components/Tag";
import { ItauVContext } from "../../../context/ItauVIsa";
import CardProviderInterface from "../../../interface/CardProviderInterface";

import * as Styled from '../styles'

export function ItauVisa() {

  const {
    card,
    buys,
    resultado
  }: CardProviderInterface = useContext(ItauVContext)

  const [payed, setPayed] = useState(false)

  console.log(payed)
  
  return (
    <Styled.Container>
      <Card
        title={card.title}
        validity={card.validity}
        limit={card.limit}
        available={card.available}
        result={resultado}
      />
      <Styled.MonthsContainer>

        {buys ?
          buys.map((month, indexMonth) => (
            <View key={indexMonth}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Styled.TitleMonth>{month.name}</Styled.TitleMonth>
                {
                  month.quotes.length > 0 && (
                    <Styled.Pay 
                      onPress={() => {
                        setPayed(prev => prev = !prev)
                        console.log(indexMonth)
                      }}
                    >
                      <Text style={{ color: '#fff' }}>pago</Text>
                    </Styled.Pay>
                  )
                }
              </View>

              <Styled.Month>
                {
                  month.quotes.map((buy, index) => (
                    <Tag
                      key={index}
                      month={indexMonth}
                      id={buy.id}
                      bankName={'itau-visa'}
                      title={buy.title}
                      price={buy.price}
                      date={buy.date}
                      quantityQuota={buy.quantityQuota}
                      priceQuota={buy.priceQuota}
                      description={buy.description || 'tem descrição não'}
                      state={payed}
                    />
                  ))
                }
              </Styled.Month>
            </View>

          )) : <Text style={{ color: '#fff' }}>Até o memento, sem compras</Text>
        }
      </Styled.MonthsContainer>

    </Styled.Container>
  )
}