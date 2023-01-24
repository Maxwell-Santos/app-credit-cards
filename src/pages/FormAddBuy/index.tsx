import { useContext, useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { View, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import MaskInput, { Masks } from 'react-native-mask-input';

import * as Styled from './styles'
import { useTheme } from "styled-components";
import { Select } from "native-base";

import { Alert } from "../../components/Alert";
import { useForm } from "react-hook-form";
import { CheckBank } from "../../utils/checkBank";
import { RicoContext } from "../../context/Rico";
import CardProviderInterface from "../../interface/CardProviderInterface";
import { ItauMContext } from "../../context/Itau-Mastercard";
import { ItauVContext } from "../../context/ItauVIsa";
import { Link } from "@react-navigation/native";

export function FormAddBuy() {

  const RICO: CardProviderInterface = useContext(RicoContext)
  const ITAU_M: CardProviderInterface = useContext(ItauMContext)
  const ITAU_V: CardProviderInterface = useContext(ItauVContext)

  const [date, setDate] = useState(new Date())
  const [price, setPrice] = useState(0)
  const [priceValue, setPriceValue] = useState('')
  const theme = useTheme()
  const [openAlert, setOpenAlert] = useState(false)
  const [card, setCard] = useState('')

  const { register, setValue, handleSubmit, reset } = useForm()

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setValue('date', date)
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: currentMode,
      is24Hour: true,
      negativeButtonLabel: 'fechar',
    })
  }

  const showDatepicker = () => {
    showMode('date');
  }

  const [priceQuota, setPriceQuota] = useState(0)

  const handleQuota = (quantityQuota: number) => {

    !priceValue ? setOpenAlert(true) : setOpenAlert(false)

    let quotaFounded = price / quantityQuota

    setValue('quantityQuota', quantityQuota)
    setPriceQuota(Number(quotaFounded.toFixed(2)))
    setValue('priceQuota', quotaFounded) //setando valor com react-hook-form
  }

  const handleCard = (cardName: string) => {
    setCard(cardName)
    setValue('cardTitle', cardName) //setando valor com react-hook-form
  }

  // PARTE EXTREMAMENTE SENSÍVEL DO CÓDIGO

  /**
   * Essa função verifica e direciona qual o banco vai receber os dados da nova compra
   */
  const ValuesToSubmit = (data) => {
    const bankName = CheckBank(data)

    if (bankName == 'itau-mastercard') ITAU_M.AddNewBuy(data)
    if (bankName == 'itau-visa') ITAU_V.AddNewBuy(data)
    if (bankName == 'rico') RICO.AddNewBuy(data)
  }
  // PARTE EXTREMAMENTE SENSÍVEL DO CÓDIGO

  useEffect(() => {
    register('title')
    register('priceQuota')
    register('cardTitle')
    register('priceQuota')
    register('date')

  }, [register])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Styled.TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Styled.Container>

          {openAlert && <Alert />}

          <Styled.ContainerInputs>

            <View>
              <Styled.Text>titulo</Styled.Text>
              <Styled.Input
                onChangeText={(value) => setValue('title', value)}
              />
            </View>

            <View>
              <Styled.Text>descrição</Styled.Text>
              <Styled.Input
                onChangeText={(value) => setValue('description', value)}
              />
            </View>

            <View>
              <Styled.Text>preço</Styled.Text>

              <MaskInput
                value={String(priceValue)}
                onChangeText={(masked, unmasked) => {
                  setPriceValue(masked) //esse é o que vai setar o valor que será mostrado (ex: R$200,00)
                  setPrice(Number(unmasked) / 100) //esse vai setar valor que será enviado ao contexto(ex: 200)

                  setValue('price', Number(unmasked) / 100)
                }}
                style={style.InputPrice}
                mask={Masks.BRL_CURRENCY}
                placeholder='R$'
                placeholderTextColor={theme.COLOR.PRIMARY}
                keyboardType={"decimal-pad"}
              />
            </View>

            <View>
              <Styled.Text>valor da parcela</Styled.Text>
              <Styled.Selection>
                <MaskInput
                  value={priceQuota.toFixed(2)}
                  placeholder='R$'
                  placeholderTextColor={theme.COLOR.PRIMARY}
                  style={[style.InputPrice, style.Quota]}
                  keyboardType={"decimal-pad"}
                  editable={false}
                />
                <Select
                  style={style.Selection}
                  minWidth={90}
                  onValueChange={(value) => handleQuota(Number(value))}
                  borderWidth={0}
                  mr={.8}
                >
                  <Select.Item label="1x" value="1" />
                  <Select.Item label="2x" value="2" />
                  <Select.Item label="3x" value="3" />
                  <Select.Item label="4x" value="4" />
                  <Select.Item label="5x" value="5" />
                </Select>
              </Styled.Selection>
            </View>

            <View>
              <Styled.Text>cartão</Styled.Text>

              <Styled.Selection>
                <Select
                  style={style.Selection}
                  placeholder="Escolha um Cartão de crédito"
                  accessibilityLabel="Escolha um Cartão de crédito"
                  borderWidth={0}
                  borderRadius={10}
                  minW={"full"}
                  selectedValue={card}
                  onValueChange={(card) => handleCard(card)}
                >
                  <Select.Item label="Rico" value="rico" />
                  <Select.Item label="Itaú Mastercard" value="itau-mastercard" />
                  <Select.Item label="Itaú Visa" value="itau-visa" />
                </Select>
              </Styled.Selection>
            </View>

            <View>
              <Styled.Text>data da compra</Styled.Text>
              <Styled.DateContainer>
                <Feather name="calendar" size={26} color={theme.COLOR.PRIMARY} onPress={showDatepicker} />
                <Styled.DateInput>
                  {date.toLocaleDateString()}
                </Styled.DateInput>
              </Styled.DateContainer>
            </View>

            <View style={style.SubmitContent}>
              <Styled.Submit onPress={handleSubmit(ValuesToSubmit)}>
                <Styled.TextButton>Enviar</Styled.TextButton>
              </Styled.Submit>

              <Styled.Reset onPress={() => reset()}>
                <Styled.TextButton>Resetar</Styled.TextButton>
              </Styled.Reset>
            </View>
          </Styled.ContainerInputs>

        </Styled.Container>
      </Styled.TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
  InputPrice: {
    color: "#c3c3c3",
    padding: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },

  Quota: {
    padding: 0,
    marginBottom: 0,
    flex: .8,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  Selection: {
    backgroundColor: '#000',
    color: "#c3c3c3",
    border: 'none',
    fontSize: 16,
    flex: 1,
    height: 55,
  },

  SubmitContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  }
})