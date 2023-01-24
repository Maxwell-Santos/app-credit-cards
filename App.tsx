import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes/route';
import dark from './src/theme/dark';

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [supportedBiometric, setSupportedBiometric] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  // useEffect(() => {
  //   (async () => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync()
  //     setSupportedBiometric(compatible)
  //   })()

  //   supportedBiometric && handleBiometricAuth()
  // })

  // useEffect(() => {AsyncStorage.clear()})

  const handleBiometricAuth = async () => {

    LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
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
        'Biometric record not found',
        'Please verify your identity with your password',
      )
    }
  }
  return (
    <>
      <SafeAreaView />
      <NativeBaseProvider>
        <StatusBar barStyle='default' backgroundColor={"#121212"} />
        <ThemeProvider theme={dark}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Routes />
          </GestureHandlerRootView>
        </ThemeProvider>
      </NativeBaseProvider>
    </>
  )
}