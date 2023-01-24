import { ItauMProvider } from "../../context/Itau-Mastercard";
import { ItauVProvider } from "../../context/ItauVIsa";
import { RicoProvider } from "../../context/Rico";
import { FormAddBuy as FormAddBuyConsumer } from ".";

export function FormAddBuy() {
  return (
   <RicoProvider>
    <ItauMProvider>
      <ItauVProvider>
        <FormAddBuyConsumer />
      </ItauVProvider>
    </ItauMProvider>
   </RicoProvider>
 )
}
