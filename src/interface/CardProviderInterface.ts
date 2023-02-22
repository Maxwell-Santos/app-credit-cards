import {BuyProps} from "./BuyInterface"
import CardContext from "./CardContext";
import months from "../utils/monthsVisa";

export default interface CardProviderInterface {
  buys: typeof months;
  AddNewBuy: (data: BuyProps) => void;
  SetPaymentQuote: (indexMonth: number, state: boolean) => void;

  card: CardContext;
  
  SetLocalValue: (data) => void;
  GetLocalValue: () => void;
  resultado: 0;
}