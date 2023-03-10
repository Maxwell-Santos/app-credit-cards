import { Alert as NBAlert } from "native-base";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Alert() {
  return (
    <NBAlert
      w={250}
      status={"warning"}
      colorScheme={"warning"}
      variant={"outline"}
      style={styles.Alert}
    >
      <View style={styles.AlertContent}>
        <NBAlert.Icon />
        <Text style={styles.TextAlert}>Preencha todos os campos</Text>
      </View>
    </NBAlert>
  )

}

const styles = StyleSheet.create({
  Alert: {
    position: 'absolute',
    top: 45,
    right: 25,
    zIndex: 2,
    opacity: .8
  },
  AlertContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  TextAlert: {
    color: 'white',
  }
})