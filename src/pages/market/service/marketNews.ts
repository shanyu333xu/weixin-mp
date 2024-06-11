// src\pages\market\service\marketNews.ts
import { ref } from "vue";
import type { NewsItem } from "../types/marketNews";

export const newsData = ref<NewsItem[] | null>(null);

export const getMarketNewsAPI = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://news.10jqka.com.cn/tapp/news/headline/ths",
			method: "GET",
			success: (res) => {
				if (res.statusCode === 200 && res.data) {
					newsData.value = res.data.data as NewsItem[];
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
