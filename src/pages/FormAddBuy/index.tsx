import { useContext, useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { View, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import MaskInput, { Masks } from 'react-native-mask-input';

import * as Styled from './styles'
import { useTheme } from "styled-components";
import { Select, theme } from "native-base";

import { Alert } from "../../components/Alert";
import { useForm } from "react-hook-form";
import { CheckBank } from "../../utils/checkBank";
import { RicoContext } from "../../context/Rico";
import CardProviderInterface from "../../interface/CardProviderInterface";
import { ItauMContext } from "../../context/Itau-Mastercard";
import { ItauVContext } from "../../context/ItauVIsa";
import { Link } from "@react-navigation/native";
import { ModalReset } from "../../components/ModalReset";

export function FormAddBuy({ navigation }) {

  const RICO: CardProviderInterface = useContext(RicoContext)
  const ITAU_M: CardProviderInterface = useContext(ItauMContext)
  const ITAU_V: CardProviderInterface = useContext(ItauVContext)

  const [date, setDate] = useState(new Date())
  const [price, setPrice] = useState(0)
  const [priceValue, setPriceValue] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [card, setCard] = useState('')

  const theme = useTheme()

  const [title, setTile] = useState('')
  const [description, setDescription] = useState('')
  const { register, setValue, getValues, handleSubmit, reset } = useForm()

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setValue('date', currentDate)
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
    let quotaFounded = price / quantityQuota

    setValue('quantityQuota', quantityQuota)
    setPriceQuota(Number(quotaFounded.toFixed(2)))
    setValue('priceQuota', quotaFounded) //setando valor com react-hook-form
  }

  const handleCard = (cardName: string) => {
    setCard(cardName)
    setValue('cardTitle', cardName) //setando valor com react-hook-form
  }

  const [haveQuotes, setHaveQuotes] = useState(false)
  // PARTE EXTREMAMENTE SENSÍVEL DO CÓDIGO
  /**
   * Essa função verifica e direciona qual o banco vai receber os dados da nova compra
   */
  const ValuesToSubmit = (data) => {
    const bankName = CheckBank(data)

    if (title == '' || priceValue == '' || !haveQuotes || card == '') {
      setOpenAlert(true)

      console.log('preenche ai vai')
      console.log(getValues())
    }
    else {

      if (bankName == 'itau-mastercard') ITAU_M.AddNewBuy(data)
      if (bankName == 'itau-visa') ITAU_V.AddNewBuy(data)
      if (bankName == 'rico') RICO.AddNewBuy(data)

      navigation.navigate('home')
    }
  }

  // PARTE EXTREMAMENTE SENSÍVEL DO CÓDIGO

  useEffect(() => {
    register('title')
    register('description')
    register('price')

    register('priceQuota')
    register('quantityQuota')

    register('cardTitle')
    register('date')

  }, [register])

  useEffect(() => { setValue('date', date) }, [])

  const clear = () => {
    reset()
    setPriceValue('')
    setPriceQuota(0)

    setValue('title', '')
    setTile('')

    setValue('description', '')
    setDescription('')
  }

  const [showModal, setShowModal] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [text, setText] = useState('')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Styled.TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Styled.Container>

          {openAlert && <Alert />}
          {showModal && <ModalReset open={showModal} />}

          <Styled.ContainerInputs>

            <View>
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>titulo</Styled.Text>
              <Styled.Input
                onChangeText={(value) => {
                  setValue('title', value)
                  setTile(value)
                }}
                maxLength={25}
                value={title}
              />
            </View>

            <View>
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>descrição</Styled.Text>
              <Styled.Input
                onChangeText={(value) => {
                  setValue('description', value)
                  setDescription(value)
                }}
                value={description}
              />
            </View>

            <View>
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>preço</Styled.Text>

              <MaskInput
                value={String(priceValue)}
                onChangeText={(masked, unmasked) => {
                  setPriceValue(masked) //esse é o que vai setar o valor que será mostrado (ex: R$200,00)
                  setPrice(Number(unmasked) / 100) //esse vai setar valor que será enviado ao contexto(ex: 200)

                  setValue('price', Number(unmasked) / 100)
                  setText(unmasked)
                }}
                style={[
                  style.InputPrice,
                  {
                    backgroundColor: theme.BACKGROUND.INPUT,
                    color: theme.COLOR.PRIMARY
                  }
                ]}
                mask={Masks.BRL_CURRENCY}
                placeholder='R$'
                placeholderTextColor={theme.COLOR.PRIMARY}
                keyboardType={"decimal-pad"}
              />
            </View>

            <View style={{ display: text ? 'flex' : 'none' }}>
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>valor da parcela</Styled.Text>
              <Styled.Selection>
                <MaskInput
                  value={priceQuota.toFixed(2)}
                  placeholder='R$'
                  placeholderTextColor={theme.COLOR.PRIMARY}
                  style={[style.InputPrice, style.Quota, {
                    backgroundColor: theme.BACKGROUND.INPUT,
                    color: theme.COLOR.PRIMARY
                  }]}
                  keyboardType={"decimal-pad"}
                  editable={false}
                />
                <Select
                  style={style.Selection}
                  minWidth={90}
                  onValueChange={(value) => {
                    handleQuota(Number(value))
                    setHaveQuotes(true)
                  }}
                  borderWidth={0}
                  mr={.8}
                  isDisabled={disabled}
                >
                  <Select.Item label="1x" value="1" />
                  <Select.Item label="2x" value="2" />
                  <Select.Item label="3x" value="3" />
                  <Select.Item label="4x" value="4" />
                  <Select.Item label="5x" value="5" />
                  <Select.Item label="6x" value="6" />
                  <Select.Item label="7x" value="7" />
                  <Select.Item label="8x" value="8" />
                  <Select.Item label="9x" value="9" />
                  <Select.Item label="10x" value="10" />
                  <Select.Item label="11x" value="11" />
                  <Select.Item label="12x" value="12" />
                </Select>
              </Styled.Selection>
            </View>

            <View>
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>cartão</Styled.Text>

              <Styled.Selection>
                <Select
                  style={[style.Selection,
                  {
                    backgroundColor: theme.BACKGROUND.INPUT,
                  }
                  ]}
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
              <Styled.Text style={{ fontFamily: 'Inter_400Regular' }}>data da compra</Styled.Text>
              <Styled.DateContainer>
                <Feather name="calendar" size={26} color={theme.COLOR.PRIMARY} onPress={showDatepicker} />
                <Styled.DateInput>
                  {date.toLocaleDateString()}
                </Styled.DateInput>
              </Styled.DateContainer>
            </View>

            <View style={style.SubmitContent}>
              <Styled.Submit
                onPress={handleSubmit(ValuesToSubmit)}
              >
                <Styled.TextButton submit>Enviar</Styled.TextButton>
              </Styled.Submit>

              <Styled.Reset onPress={() => setShowModal(value => value = !value)}>
                <Styled.TextButton>Resetar</Styled.TextButton>
              </Styled.Reset>
            </View>
          </Styled.ContainerInputs>

        </Styled.Container>
      </Styled.TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

const style = StyleSheet.create({
  InputPrice: {
    padding: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontFamily: 'Inter_400Regular'
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
    color: '#a0a0a0',
    border: 'none',
    fontSize: 16,
    flex: 1,
    height: 55,
  },

  SubmitContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  }
})