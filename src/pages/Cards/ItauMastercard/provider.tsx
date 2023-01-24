import { ItauMProvider } from "../../../context/Itau-Mastercard";
import { ItauMastercard as ItauMastercardConsumer } from ".";

export function ItauMastercard() {

  return (
   <ItauMProvider>
    <ItauMastercardConsumer />
   </ItauMProvider>
 )
}
