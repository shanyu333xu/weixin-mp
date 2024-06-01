// src/service/stockService.ts

import { OriStockData } from '../types/stockService'
import {StockData}from '../types/stockService'

export const fetchStockData = (stockCodes: string[]): Promise<StockData[]> => {
  const url = `http://hq.sinajs.cn/list=${stockCodes.join(',')}`

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      
      success: (response) => {
        const data = response.data as string
        const oriStockDataList: OriStockData[] = []
        const stockEntries = data.split(';')
        stockEntries.forEach((entry) => {
          if (!entry) return

          const [meta, values] = entry.split('=')
          const stockCode = meta.split('_').pop()
          if (!stockCode) return
          if (!values) return

          const elements = values.replace(/(^"|"$)/g, '').split(',')
          const stockData: OriStockData = {
            name: elements[0],
            code: stockCode,
            openPrice: parseFloat(elements[1]).toFixed(2),
            closePrice: parseFloat(elements[2]).toFixed(2),
            currentPrice: parseFloat(elements[3]).toFixed(2),
            highPrice: parseFloat(elements[4]).toFixed(2),
            lowPrice: parseFloat(elements[5]).toFixed(2),
            buyPrice: parseFloat(elements[6]).toFixed(2),
            sellPrice: parseFloat(elements[7]).toFixed(2),
            volume: elements[8],
            amount: elements[9],
            buy1Volume: elements[10],
            buy1Price: parseFloat(elements[11]).toFixed(2),
            buy2Volume: elements[12],
            buy2Price: parseFloat(elements[13]).toFixed(2),
            buy3Volume: elements[14],
            buy3Price: parseFloat(elements[15]).toFixed(2),
            buy4Volume: elements[16],
            buy4Price: parseFloat(elements[17]).toFixed(2),
            buy5Volume: elements[18],
            buy5Price: parseFloat(elements[19]).toFixed(2),
            sell1Volume: elements[20],
            sell1Price: parseFloat(elements[21]).toFixed(2),
            sell2Volume: elements[22],
            sell2Price: parseFloat(elements[23]).toFixed(2),
            sell3Volume: elements[24],
            sell3Price: parseFloat(elements[25]).toFixed(2),
            sell4Volume: elements[26],
            sell4Price: parseFloat(elements[27]).toFixed(2),
            sell5Volume: elements[28],
            sell5Price: parseFloat(elements[29]).toFixed(2),
            date: elements[30],
            time: elements[31],
          }
          oriStockDataList.push(stockData)
        })

        const stockDataList: StockData[] = oriStockDataList.map((element) => {
          const change = (
            parseFloat(element.currentPrice) - parseFloat(element.closePrice)
          ).toFixed(2)
          const changePercent =
            ((parseFloat(change) / parseFloat(element.closePrice)) * 100).toFixed(2) + '%'
          const speedPercent =
            (
              ((parseFloat(element.currentPrice) - parseFloat(element.openPrice)) /
                parseFloat(element.closePrice)) *
              100
            ).toFixed(2) + '%'

          return {
            ...element,
            change,
            changePercent,
            speedPercent,
          }
        })

        console.log(stockDataList)

        resolve(stockDataList)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}
