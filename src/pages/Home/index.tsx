import { Link } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import * as Styled from './styles'

export function Index() {
  const theme = useTheme()

  return (
    <Styled.Container>

      <Styled.ContainerCards>
        <Styled.Card style={[styles.card, { top: 150, backgroundColor: '#F46818' }]}>
          <Link to={{ screen: 'cards' }}>
            <Styled.Title>itau mastercard</Styled.Title>
          </Link>
        </Styled.Card>

        <Styled.Card style={[styles.card, { top: 250, backgroundColor: '#000141' }]}>
          <Styled.Title>rico</Styled.Title>
        </Styled.Card>
        <Styled.Card style={[styles.card, { top: 350, backgroundColor: '#F46818' }]}>
          <Styled.Title>itau visa</Styled.Title>
        </Styled.Card>
      </Styled.ContainerCards>

      <Link
        to={{ screen: 'formulary' }}
        style={{ backgroundColor: theme.BACKGROUND.BUTTON, padding: 15, width: '80%', textAlign: 'center', borderRadius: 10, marginBottom: 26 }}
      >
        <Styled.Text>Nova compra</Styled.Text>
      </Link>
    </Styled.Container>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,

    elevation: 10,
  }

})

