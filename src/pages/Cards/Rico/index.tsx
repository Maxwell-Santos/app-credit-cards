import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Card } from "../../../components/Card";
import { Tag } from "../../../components/Tag";
import { RicoContext } from "../../../context/Rico";
import CardProviderInterface from "../../../interface/CardProviderInterface";

import * as Styled from '../styles'

export function Rico() {
  const {
    card,
    buys,
  }: CardProviderInterface = useContext(RicoContext)

  return (
    <Styled.Container>
      <Card
        title={card.title}
        validity={card.validity}
        limit={card.limit}
        available={card.available}
      />
      <Styled.MonthsContainer>

        {
          buys.map((month, index) => (
            <View key={index}>
              
              <Styled.TitleMonth>{month.name}</Styled.TitleMonth>

              <Styled.Month>
                {
                  month.quotes.map((buy, index) => (
                    <Tag
                      key={index}
                      title={buy.title}
                      price={buy.price}
                      date={buy.date}
                      quantityQuota={buy.quantityQuota}
                      valueQuota={buy.valueQuota}
                      description={buy.description || 'tem descrição não'}
                    />
                  ))
                }
              </Styled.Month>
            </View>
          ))
        }
      </Styled.MonthsContainer>

    </Styled.Container>
  )
}
