export function CheckBank(data) {
  const bankName = data.cardTitle
  const banks = ['rico', 'itau-mastercard', 'itau-visa']
  const bankFounded = banks.find(bank => bank == bankName)

  return bankFounded
}