import { Icon, IconButton, NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes/route';
import dark from './src/theme/dark';
import light from './src/theme/light';

import { RicoProvider } from './src/context/Rico';
import { ItauVProvider } from './src/context/ItauVIsa';
import { ItauMProvider } from './src/context/Itau-Mastercard';
import { useFonts } from 'expo-font';

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { themeNB } from './src/theme/NativeBase';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Authenticate } from './src/components/Authenticate';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [supportedBiometric, setSupportedBiometric] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [nameIcon, setNameIcon] = useState('moon-o')

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setSupportedBiometric(compatible)
    })()

    supportedBiometric && handleBiometricAuth()
  }, [])


  const handleBiometricAuth = async () => {
    LocalAuthentication.authenticateAsync({
      promptMessage: 'Login no Between Credits',
      disableDeviceFallback: true,
      cancelLabel: 'Cancelar',

    }).then(success => {
      setAuthenticated(success.success)

    }).catch(error => {
      console.error(error)
    })

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

    if (!savedBiometrics) {
      return Alert.alert(
        'Biometria não encontrada',
      )
    }
  }

  const toggle = () => {
    setIsDarkTheme(prevTheme => prevTheme = !prevTheme)
    setNameIcon(prevIcon => prevIcon == 'sun-o' ? prevIcon = 'moon-o' : prevIcon = 'sun-o')
  }
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  })

  if (!fontsLoaded) return null

  return (
    <>
      <SafeAreaView />
      <StatusBar translucent backgroundColor={'transparent'} />
      <NativeBaseProvider theme={themeNB}>

        <ThemeProvider theme={isDarkTheme ? dark : light}>

          {
            authenticated ? (
              <>
                <TouchableOpacity style={styles.IconButton}
                >
                  <IconButton
                    icon={<Icon as={FontAwesome} name={nameIcon} />}
                    borderRadius="full" _icon={{
                      color: "#c0c0c0",
                      size: "lg"
                    }}
                    onPress={toggle}
                  />
                </TouchableOpacity>

                <RicoProvider>
                  <ItauVProvider>
                    <ItauMProvider>

                      <GestureHandlerRootView style={{ flex: 1 }}>
                        <Routes />
                      </GestureHandlerRootView>

                    </ItauMProvider>
                  </ItauVProvider>
                </RicoProvider>
              </>
            ) : (
              <Authenticate>
                <TouchableHighlight
                  style={[styles.login]}
                  onPress={handleBiometricAuth}
                >
                  <>
                    <Text style={styles.text}>entrar</Text>
                    <Feather name="arrow-right" size={24} color="#fff" />
                  </>
                </TouchableHighlight>
              </Authenticate>
            )
          }
        </ThemeProvider>
      </NativeBaseProvider>
    </>
  )
}

const styles = StyleSheet.create({
  IconButton: {
    marginTop: 50,
    position: 'absolute',
    top: -20,
    right: 10,
    zIndex: 99,
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  
  login: {
    padding: 16,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    backgroundColor: '#F46818',
  }
})
