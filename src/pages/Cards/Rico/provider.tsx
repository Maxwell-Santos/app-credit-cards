import { RicoProvider } from "../../../context/Rico";
import { Rico as RicoConsumer } from ".";

export function Rico() {
  return (
   <RicoProvider>
    <RicoConsumer />
   </RicoProvider>
 )
}
