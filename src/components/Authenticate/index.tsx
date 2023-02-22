import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components";

export function Authenticate({ children }) {
  //children é botão de entrar
  return (
    <View style={[styles.container, { backgroundColor: '#1f1f1f' }]}>
      <View>
        <Text style={styles.title}>Bem vindo ao seu app de gerenciamento de compras</Text>
        <Text style={styles.description}>O propósito do app é gerenciar seus gastos com cartões de crédito, com base em dados cedidos por você mesmo.</Text>

        <Text style={styles.description}>Aqui não tratamos de assuntos sensíveis relacionados ao seu cartão, como número do cartão, cvv, nome do titular etc.</Text>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 150,
    paddingBottom: 50,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    marginBottom: 14
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  }
})
