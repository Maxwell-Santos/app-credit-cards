import { Link } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useTheme } from "styled-components";
import * as Styled from './styles';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { View } from "native-base";

export function Index() {

  const [] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  })

  return (
    <Styled.Container>

      <Styled.ContainerCards>
        <Link to={{ screen: 'cards' }} style={{flex: 1, width: '100%', textAlign: 'center', paddingTop: 200}}>
          <View>
            <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>cartões</Styled.Text>
          </View>
        </Link>
      </Styled.ContainerCards>

      <View
        style={{ backgroundColor: '#003091', padding: 15, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Link
          to={{ screen: 'formulary' }}
          style={{flex: 1, width: '100%', textAlign: 'center', paddingTop: 180}}
        >
          <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>formulário</Styled.Text>
        </Link>
      </View>
    </Styled.Container>
  )
}

