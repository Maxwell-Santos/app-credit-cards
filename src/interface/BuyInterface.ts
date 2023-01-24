export interface BuyProps {
  title: string,
  price: number,
  quantityQuota: number, //quantidade de parcelas
  valueQuota: number, //quantidade de parcelas
  date: Date | string,
  description?: string,
}