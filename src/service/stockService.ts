// src/service/stockService.ts

import { OriStockData, StockData } from '@/types/stockService'

export const fetchStockData = (stockCodes: string[]) => {
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
            openPrice: elements[1],
            closePrice: elements[2],
            currentPrice: elements[3],
            highPrice: elements[4],
            lowPrice: elements[5],
            buyPrice: elements[6],
            sellPrice: elements[7],
            volume: elements[8],
            amount: elements[9],
            buy1Volume: elements[10],
            buy1Price: elements[11],
            buy2Volume: elements[12],
            buy2Price: elements[13],
            buy3Volume: elements[14],
            buy3Price: elements[15],
            buy4Volume: elements[16],
            buy4Price: elements[17],
            buy5Volume: elements[18],
            buy5Price: elements[19],
            sell1Volume: elements[20],
            sell1Price: elements[21],
            sell2Volume: elements[22],
            sell2Price: elements[23],
            sell3Volume: elements[24],
            sell3Price: elements[25],
            sell4Volume: elements[26],
            sell4Price: elements[27],
            sell5Volume: elements[28],
            sell5Price: elements[29],
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
        resolve(stockDataList)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}
