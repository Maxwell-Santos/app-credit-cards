import { StyleSheet, Text, View } from "react-native";

export function Authenticate({ children }) {
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 100
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Inter_700Bold'
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  }
})
