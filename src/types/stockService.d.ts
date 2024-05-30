// src/types/stockService.d.ts

export type OriStockData = {
  name: string
  code: string
  openPrice: string
  closePrice: string
  currentPrice: string
  highPrice: string
  lowPrice: string
  buyPrice: string
  sellPrice: string
  volume: string
  amount: string
  buy1Volume: string
  buy1Price: string
  buy2Volume: string
  buy2Price: string
  buy3Volume: string
  buy3Price: string
  buy4Volume: string
  buy4Price: string
  buy5Volume: string
  buy5Price: string
  sell1Volume: string
  sell1Price: string
  sell2Volume: string
  sell2Price: string
  sell3Volume: string
  sell3Price: string
  sell4Volume: string
  sell4Price: string
  sell5Volume: string
  sell6Price: string
  date: string
  time: string
}

export type StockData = OriStockData & {
  change: string
  changePercent: string
  speedPercent: string
}
