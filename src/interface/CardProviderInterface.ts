import {BuyProps} from "./BuyInterface"
import CardContext from "./CardContext";

export default interface CardProviderInterface {
  buys: BuyProps[];
  AddNewBuy: (data: BuyProps) => void;

  card: CardContext;
  UpdateAvailableCard: (newAvailable) => void;
  
  SetLocalValue: (data) => void;
  GetLocalValue: () => void;
}