// src/types/stockService.ts

export interface OriStockData {
  name: string
  code: string
  openPrice: number
  closePrice: number
  currentPrice: number
  highPrice: number
  lowPrice: number
  buyPrice: number
  sellPrice: number
  volume: number
  amount: number
  buy1Volume: number
  buy1Price: number
  buy2Volume: number
  buy2Price: number
  buy3Volume: number
  buy3Price: number
  buy4Volume: number
  buy4Price: number
  buy5Volume: number
  buy5Price: number
  sell1Volume: number
  sell1Price: number
  sell2Volume: number
  sell2Price: number
  sell3Volume: number
  sell3Price: number
  sell4Volume: number
  sell4Price: number
  sell5Volume: number
  sell5Price: number
  date: string
  time: string
}

export interface StockData extends OriStockData {
  change: number
  changePercent: number
  speedPercent: number
}
