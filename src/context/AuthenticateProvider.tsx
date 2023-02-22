import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';


export const Authentication = createContext<any>({})

export function AuthenticateProvider({children}){
  const [supportedBiometric, setSupportedBiometric] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setSupportedBiometric(compatible)
    })()

    supportedBiometric && handleBiometricAuth()

  }, [])

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
    <Authentication.Provider value={{
      authenticated,
      handleBiometricAuth,
    }}>
      {children}
    </Authentication.Provider>
  )
}
