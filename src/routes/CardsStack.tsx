import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ItauMastercard } from "../pages/Cards/ItauMastercard"
import { ItauVisa } from "../pages/Cards/ItauVisa"
import { Rico } from "../pages/Cards/Rico"

const Stack = createMaterialTopTabNavigator()

export function CardsStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: { display: 'none' } //Esconder a tabbar
      }}
    >
      <Stack.Screen name="itau-mastercard" component={ItauMastercard} />
      <Stack.Screen name="itau-visa" component={ItauVisa} />
      <Stack.Screen name="rico" component={Rico} />

    </Stack.Navigator>
  )
}
