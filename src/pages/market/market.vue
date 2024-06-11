<template>
	<NavigationBar />
	<!-- 搜索框,其实是跳转到搜索页面 -->
	<view class="searchbox">
		<navigator
			class="searchnavigator"
			url="/src/pages/search/search"
			open-type="navigate"
			hover-class="navigator-hover"
		>
			<icon type="search" />
			<text>搜股票名称/股票代码</text>
		</navigator>
	</view>
	<view class="container">
		<view class="market-status">
			<image :src="marketStatusIcon" class="status-icon"></image>
			<text class="status-text">{{ marketStatus }}</text>
		</view>
		<view class="market-time">
			<text class="time-text">{{ marketTime }}</text>
		</view>
		<view class="indices">
			<view
				v-if="szIndex"
				:class="['index-box', szIndex.change >= 0 ? 'up' : 'down']"
			>
				<text class="index-name">上证综指</text>
				<text class="index-price">{{ szIndex.currentPrice }}</text>
				<text class="index-change"
					>{{ szIndex.change }} ({{ szIndex.changePercent }}%)</text
				>
			</view>
			<view
				v-if="szcIndex"
				:class="['index-box', szcIndex.change >= 0 ? 'up' : 'down']"
			>
				<text class="index-name">深证成指</text>
				<text class="index-price">{{ szcIndex.currentPrice }}</text>
				<text class="index-change"
					>{{ szcIndex.change }} ({{ szcIndex.changePercent }}%)</text
				>
			</view>
			<view
				v-if="cybIndex"
				:class="['index-box', cybIndex.change >= 0 ? 'up' : 'down']"
			>
				<text class="index-name">创业板指</text>
				<text class="index-price">{{ cybIndex.currentPrice }}</text>
				<text class="index-change"
					>{{ cybIndex.change }} ({{ cybIndex.changePercent }}%)</text
				>
			</view>
		</view>
	</view>
	<ThsStockList ref="stockListRef" :stockCodes="stockCodes" :quickSort="true" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { fetchStockData } from "../../service/stockService";
import { StockData } from "../../types/stockService";
import { useStockList } from "../../composables/exStockList";
import { getMarketAPI, data } from "./service/marketBase";

const szIndex = ref<StockData | null>(null);
const szcIndex = ref<StockData | null>(null);
const cybIndex = ref<StockData | null>(null);
const stockCodes = ref<string[] | null>([
	"sh601006",
	"sh601001",
	"sh601101",
	"sh600881",
	"sh688399",
	"sh688981",
	"sh600150",
	"sh600733",
	"sh601919",
	"sh601899",
	"sh601020",
]);

const search = (searchText) => {
	serched.value = true;
	// 将搜索文本转换为小写，以便进行不区分大小写的匹配
	const query = searchText.toLowerCase();
	// 过滤出与搜索文本匹配的股票数据
	stockCodes.value = BaseStocksList.filter(
		(stock: BaseStockData) =>
			stock.name.toLowerCase().includes(query) ||
			stock.code.toLowerCase().includes(query) ||
			stock.industry?.toLowerCase().includes(query)
	).map((stock: BaseStockData) => stock.code);
};
import type { ThsStockListInstance } from "../types/components";
const useStockList = () => {
	// 组件实例
	const stockListRef = ref<ThsStockListInstance | null>(null);

	// 滚动触底事件
	const onScrolltolower = () => {
		console.log("Scroll to lower");
		stockListRef.value?.getStockData();
	};

	return { stockListRef, onScrolltolower };
};
// 列表触底增量
import { onReachBottom } from "@dcloudio/uni-app";
const { stockListRef, onScrolltolower } = useStockList();
onReachBottom(async () => {
	await stockListRef.value.getStockData();
});

const getStocks = async () => {
	try {
		const [szData, szcData, cybData] = await Promise.all([
			fetchStockData(["sh000001"]),
			fetchStockData(["sz399001"]),
			fetchStockData(["sz399006"]),
		]);

		szIndex.value = szData[0];
		szcIndex.value = szcData[0];
		cybIndex.value = cybData[0];
	} catch (error) {
		console.error("Failed to fetch stock data:", error);
	}
};

const marketStatus = ref("");
const marketStatusIcon = ref("");
const marketTime = ref("");

const updateMarketStatus = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const isOpen =
		((hours > 9 || (hours === 9 && minutes >= 30)) &&
			(hours < 11 || (hours === 11 && minutes < 30))) ||
		(hours > 13 && hours < 15);
	const days = [
		"星期天",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
	];
	const dayOfWeek = days[now.getDay()];

	if (isOpen) {
		marketStatus.value = "开盘";
		marketStatusIcon.value = "/static/images/open.png";
		marketTime.value = now.toLocaleTimeString() + ` ${dayOfWeek}`;
	} else {
		marketStatus.value = "闭盘";
		marketStatusIcon.value = "/static/images/close.png";
		const nextOpen = new Date(now);
		const isFridayAfternoon =
			now.getDay() === 5 && (hours > 15 || (hours === 15 && minutes >= 0));
		nextOpen.setDate(now.getDate() + (isFridayAfternoon ? 3 : 1));
		nextOpen.setHours(9, 30, 0, 0);
		marketTime.value = `下次开盘: ${nextOpen.toLocaleString()} ${days[nextOpen.getDay()]}`;
	}
};
const getMarketData = async () => {
	try {
		await getMarketAPI();
		console.log(data.value);
	} catch (error) {
		console.error("获取市场数据失败", error);
	}
};
onMounted(async () => {
	await getStocks();
	await getMarketData();
	updateMarketStatus();
	setInterval(() => {
		updateMarketStatus();
	}, 60000); // 每分钟更新一次状态
});
</script>

<style>
.container {
	padding: 10px;
}

.market-status {
	display: flex;
	align-items: center;
}

.status-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}

.status-text {
	font-size: 18px;
}

.market-time {
	margin-top: 5px;
	font-size: 14px;
}

.indices {
	display: flex;
	gap: 5px;
	justify-content: space-between;
	width: calc(100% - 20px);
	margin-top: 10px;
}

.index-box {
	box-sizing: border-box;
	flex: 1;
	padding: 10px;
	color: white;
	text-align: center;
	border-radius: 5px;
}

.index-box:last-child {
	margin-right: 0;
}

.index-box.up {
	background-color: red;
}

.index-box.down {
	background-color: green;
}

.index-name,
.index-price,
.index-change {
	display: block;
	width: 100%;
}

.index-name {
	margin-bottom: 5px;
	font-size: 12px;
}

.index-price {
	margin: 5px 0;
	font-size: 22px;
	font-weight: bold;
}

.index-change {
	font-size: 12px;
}

.searchbox {
	display: flex;
	justify-content: center;
	padding: 5px;
	margin: 10px;
	border: 1px solid #000000;
	border-radius: 20px;
}
.searchnavigator {
	padding: 0px 80px 0px 80px;
}
</style>
