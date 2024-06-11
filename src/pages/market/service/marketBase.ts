// src\pages\market\service\marketBase.ts
import { ref } from "vue";
import { Result } from "@/pages/market/types/marketBase";

export const data = ref<Result | null>(null);

export const getMarketAPI = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "http://eq.10jqka.com.cn/wechatApplication/search/searchIndex",
			method: "GET",
			success: (res) => {
				if (res.statusCode === 200 && res.data) {
					const rawData = res.data;
					processResultData(rawData.result);
					data.value = rawData.result;
					resolve();
				} else {
					console.error("请求失败", res);
					reject(new Error("请求失败"));
				}
			},
			fail: (err) => {
				console.error("请求出错", err);
				reject(new Error("请求出错"));
			},
		});
	});
};

const processResultData = (result: Result) => {
	const keysToConvert: (keyof Result)[] = [
		"resultListByGainDESC",
		"threeIndexList",
		"maximumHeatInFiveDays",
		"hotConcept",
		"hotIndustry",
		"resultListByTotal",
		"resultListByGain",
		"resultListByGainSpeed",
	];

	keysToConvert.forEach((key) => {
		if (result[key] && typeof result[key] === "string") {
			result[key] = JSON.parse(result[key] as string);
		}
	});
};
