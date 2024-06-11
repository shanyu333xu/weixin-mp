// src/service/stockService.ts

import { OriStockData, StockData } from "../types/stockService";

export const fetchStockData = (stockCodes: string[]): Promise<StockData[]> => {
	const url = `http://hq.sinajs.cn/list=${stockCodes.join(",")}`;

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			success: (response) => {
				const data = response.data as string;
				const oriStockDataList: OriStockData[] = [];
				const stockEntries = data.split(";");
				stockEntries.forEach((entry) => {
					if (!entry) return;

					const [meta, values] = entry.split("=");
					const stockCode = meta.split("_").pop();
					if (!stockCode) return;
					if (!values) return;

					const elements = values.replace(/(^"|"$)/g, "").split(",");
					const stockData: OriStockData = {
						name: elements[0],
						code: stockCode,
						openPrice: parseFloat(parseFloat(elements[1]).toFixed(2)),
						closePrice: parseFloat(parseFloat(elements[2]).toFixed(2)),
						currentPrice: parseFloat(parseFloat(elements[3]).toFixed(2)),
						highPrice: parseFloat(parseFloat(elements[4]).toFixed(2)),
						lowPrice: parseFloat(parseFloat(elements[5]).toFixed(2)),
						buyPrice: parseFloat(parseFloat(elements[6]).toFixed(2)),
						sellPrice: parseFloat(parseFloat(elements[7]).toFixed(2)),
						volume: parseFloat((parseFloat(elements[8]) / 10000).toFixed(2)),
						amount: parseFloat(
							(parseFloat(elements[9]) / 100000000).toFixed(2)
						),
						buy1Volume: parseFloat(parseFloat(elements[10]).toFixed(2)),
						buy1Price: parseFloat(parseFloat(elements[11]).toFixed(2)),
						buy2Volume: parseFloat(parseFloat(elements[12]).toFixed(2)),
						buy2Price: parseFloat(parseFloat(elements[13]).toFixed(2)),
						buy3Volume: parseFloat(parseFloat(elements[14]).toFixed(2)),
						buy3Price: parseFloat(parseFloat(elements[15]).toFixed(2)),
						buy4Volume: parseFloat(parseFloat(elements[16]).toFixed(2)),
						buy4Price: parseFloat(parseFloat(elements[17]).toFixed(2)),
						buy5Volume: parseFloat(parseFloat(elements[18]).toFixed(2)),
						buy5Price: parseFloat(parseFloat(elements[19]).toFixed(2)),
						sell1Volume: parseFloat(parseFloat(elements[20]).toFixed(2)),
						sell1Price: parseFloat(parseFloat(elements[21]).toFixed(2)),
						sell2Volume: parseFloat(parseFloat(elements[22]).toFixed(2)),
						sell2Price: parseFloat(parseFloat(elements[23]).toFixed(2)),
						sell3Volume: parseFloat(parseFloat(elements[24]).toFixed(2)),
						sell3Price: parseFloat(parseFloat(elements[25]).toFixed(2)),
						sell4Volume: parseFloat(parseFloat(elements[26]).toFixed(2)),
						sell4Price: parseFloat(parseFloat(elements[27]).toFixed(2)),
						sell5Volume: parseFloat(parseFloat(elements[28]).toFixed(2)),
						sell5Price: parseFloat(parseFloat(elements[29]).toFixed(2)),
						date: elements[30],
						time: elements[31],
					};
					oriStockDataList.push(stockData);
				});

				const stockDataList: StockData[] = oriStockDataList.map((element) => {
					const change = parseFloat(
						(element.currentPrice - element.closePrice).toFixed(2)
					);
					const changePercent = parseFloat(
						((change / element.closePrice) * 100).toFixed(2)
					);
					const speedPercent = parseFloat(
						(
							((element.currentPrice - element.openPrice) /
								element.closePrice) *
							100
						).toFixed(2)
					);
					return {
						...element,
						change,
						changePercent,
						speedPercent,
					};
				});

				console.log(stockDataList);

				resolve(stockDataList);
			},
			fail: (error) => {
				reject(error);
			},
		});
	});
};
