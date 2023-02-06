import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { useContext } from "react";
import { Authentication } from "../../context/AuthenticateProvider";
import AuthenticationInterface from "../../interface/AuthenticationInterface";

interface AuthenticateProps {
  func: () => Promise<void>
}
export function Authenticate({children}) {
  const theme = useTheme()
  return (
   <View style={[styles.container, {backgroundColor: '#1f1f1f'}]}>
    <Text style={styles.title}>Entre com sua digital</Text>
      {children}
   </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 100
  },
  title: {
    color: '#fff',
    fontSize: 20,
    
  }
})
