export interface BuyProps {
  title: string,
  price: number,
  quantityQuota: number, //quantidade de parcelas
  priceQuota: number, //preço de parcelas
  date: string,
  description?: string,
}