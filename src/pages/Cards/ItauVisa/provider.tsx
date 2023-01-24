import { ItauVProvider } from "../../../context/ItauVIsa";
import { ItauVisa as ItauVisaConsumer } from ".";

export function ItauVisa() {
  return (
   <ItauVProvider>
    <ItauVisaConsumer />
   </ItauVProvider>
 )
}
