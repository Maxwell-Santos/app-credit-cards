export interface BuyProps {
  id?: string,
  month?: number,
  bankName?: string,
  title: string,
  price: number,
  quantityQuota: number, //quantidade de parcelas
  priceQuota: number, //preço de parcelas
  date: string,
  description?: string,
  state?: boolean, 
}