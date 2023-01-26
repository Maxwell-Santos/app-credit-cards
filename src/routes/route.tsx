import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FormAddBuy } from "../pages/FormAddBuy";
import { Index } from "../pages/Home";
import { CardsStack } from "./CardsStack";

const Stack = createStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={Index} options={{ headerShown: false }} />
        <Stack.Screen name='cards' component={CardsStack} options={{headerShown: false}}/>
        <Stack.Screen name='formulary' component={FormAddBuy} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
