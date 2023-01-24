import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { Card } from "../../../components/Card";
import { Tag } from "../../../components/Tag";
import { ItauMContext } from "../../../context/Itau-Mastercard";
import CardProviderInterface from "../../../interface/CardProviderInterface";

import * as Styled from '../styles'

export function ItauMastercard() {

  const {
    card,
    buys,
  }: CardProviderInterface = useContext(ItauMContext)


  return (
    <Styled.Container>
      <Card
        title={card.title}
        validity={card.validity}
        limit={card.limit}
        available={card.available}
      />
      <Styled.MonthsContainer>

        <Styled.Month>
          {
            buys?.map((buy, index) => (
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
      </Styled.MonthsContainer>

    </Styled.Container>
  )
}