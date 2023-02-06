import {BuyProps} from "./BuyInterface"
import CardContext from "./CardContext";
import months from "../utils/monthsVisa";

export default interface CardProviderInterface {
  buys: typeof months;
  AddNewBuy: (data: BuyProps) => void;

  card: CardContext;
  
  SetLocalValue: (data) => void;
  GetLocalValue: () => void;
  resultado: 0;
}