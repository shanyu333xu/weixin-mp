<!-- src\pages\market\market.vue -->
<template>
	<view class="container">
		<NavigationBar />
		<!-- 大盘信息 -->
		<view class="market-info">
			<view class="market-status">
				<image :src="marketStatusIcon" class="status-icon"></image>
				<text class="status-text">{{ marketStatus }}</text>
			</view>
			<!-- 搜索框 -->
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
		<!-- 涨跌条 -->
		<RiseFallSection />
		<!-- 同花顺头条 -->
		<NewsPanel />
		<!-- 今日板块 -->
		<uni-title type="h1" title="今日板块"></uni-title>
		<view>
			<scroll-view scroll-x class="main-scroll-view">
				<!-- 热门概念 -->
				<view
					v-if="data && data.hotConcept && data.hotConcept.length"
					class="section"
				>
					<view class="section-title">热门概念</view>
					<view class="heat-items-container">
						<view
							v-for="(item, index) in data.hotConcept"
							:key="index"
							class="heat-item"
						>
							<view class="block-name">{{ item.blockName }}</view>
							<view
								class="block-gain"
								:class="item.blockGain >= 0 ? 'positive' : 'negative'"
								>{{ item.blockGain }}%</view
							>
							<view class="shares-name">{{ item.sharesName }}</view>
							<view
								class="shares-gain"
								:class="item.sharesGain >= 0 ? 'positive' : 'negative'"
								>{{ item.sharesGain }}%</view
							>
						</view>
					</view>
				</view>

				<!-- 热门行业 -->
				<view
					v-if="data && data.hotIndustry && data.hotIndustry.length"
					class="section"
				>
					<view class="section-title">热门行业</view>
					<view class="heat-items-container">
						<view
							v-for="(item, index) in data.hotIndustry"
							:key="index"
							class="heat-item"
						>
							<view class="block-name">{{ item.blockName }}</view>
							<view
								class="block-gain"
								:class="item.blockGain >= 0 ? 'positive' : 'negative'"
								>{{ item.blockGain }}%</view
							>
							<view class="shares-name">{{ item.sharesName }}</view>
							<view
								class="shares-gain"
								:class="item.sharesGain >= 0 ? 'positive' : 'negative'"
								>{{ item.sharesGain }}%</view
							>
						</view>
					</view>
				</view>

				<!-- 5日持续热度板块 -->
				<view
					v-if="
						data &&
						data.maximumHeatInFiveDays &&
						data.maximumHeatInFiveDays.length
					"
					class="section"
				>
					<view class="section-title">5日持续热度板块</view>
					<view class="heat-items-container">
						<view
							v-for="(item, index) in data.maximumHeatInFiveDays"
							:key="index"
							class="heat-item"
						>
							<view class="block-name">{{ item.blockName }}</view>
							<view
								class="block-gain"
								:class="item.blockGain >= 0 ? 'positive' : 'negative'"
								>{{ item.blockGain }}%</view
							>
							<view class="shares-name">{{ item.sharesName }}</view>
							<view
								class="shares-gain"
								:class="item.sharesGain >= 0 ? 'positive' : 'negative'"
								>{{ item.sharesGain }}%</view
							>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 股票排行 -->
		<ThsStockList
			ref="stockListRef"
			:stockCodes="stockCodes"
			:quickSort="true"
			:maxRows="10"
		/>
	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { fetchStockData } from "../../service/stockService";
import { StockData } from "../../types/stockService";
import { useStockList } from "../../composables/exStockList";
import { NewsPanel } from "./components/NewsPanel";

const szIndex = ref<StockData | null>(null);
const szcIndex = ref<StockData | null>(null);
const cybIndex = ref<StockData | null>(null);
const stockCodes = ref<string[]>([]);

import RiseFallSection from "./RiseFallSection.vue";
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
const getStockCodes = () => {
	if (!data.value) {
		console.error("数据尚未加载");
		return;
	}

	const codes: string[] = [];

	const pushStockCodes = (items: any[], key: string) => {
		if (Array.isArray(items)) {
			items.forEach((item) => {
				const shcode = "sh" + item[key];
				codes.push(shcode);
				const szcode = "sz" + item[key];
				codes.push(szcode);
			});
		}
	};

	// 遍历不同的数组属性
	pushStockCodes(data.value.resultListByGainDESC, "code");
	pushStockCodes(data.value.resultListByTotal, "code");
	pushStockCodes(data.value.resultListByGain, "code");
	pushStockCodes(data.value.resultListByGainSpeed, "code");

	stockCodes.value = codes;
};

import { getMarketAPI, data } from "./service/marketBase";
const getMarketData = async () => {
	try {
		await getMarketAPI();
		console.log("获取market数据成功", data.value);
		if (data.value) {
			getStockCodes();
		}
	} catch (error) {
		console.error("获取market数据失败", error);
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
	display: flex;
	flex-direction: column;
}

.market-info {
	display: flex;
	align-items: center;
	justify-content: space-between; /* 确保开闭盘状态和搜索框之间的空间 */
	margin-bottom: 5px; /* 添加一些底部空间 */
}

.market-status {
	display: flex;
	align-items: center;
	font-size: 28px; /* 增大开闭盘状态的字体 */
	margin-right: 20px; /* 给搜索框一些空间 */
}

.status-icon {
	width: 35px; /* 调整图标大小 */
	height: 35px;
	margin-right: 10px;
}

.status-text {
	font-size: 28px; /* 增大字体 */
}

.searchbox {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	border: 1px solid #000000;
	border-radius: 20px;
	margin-left: auto; /* 使其靠右 */
}

.searchnavigator {
	padding: 0px 20px;
}

.market-time {
	font-size: 14px; /* 调小时间字体 */
	text-align: left; /* 使时间左对齐 */
	margin-top: 5px; /* 添加一些顶部空间 */
}

.indices {
	display: flex;
	gap: 5px;
	justify-content: space-between;
	width: 100%; /* 保持宽度为100% */
	margin-top: 10px;
	padding: 0; /* 移除padding以避免额外空隙 */
	box-sizing: border-box; /* 确保内边距不影响总宽度 */
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

.up {
	background-color: red;
}

.down {
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

.container {
	background-color: #ffffff;
	height: 100%;
	padding-top: var(-window-top);
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.main-scroll-view {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	white-space: nowrap;
}

.section {
	display: inline-block;
	width: 300px;
	margin: 0px 10px 10px 10px;
	vertical-align: top;
	border-radius: 20px; /* 圆角 */
	border: 1px solid #ddd;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1); /* 阴影 */
}

.section-title {
	border-radius: 20px 0px 20px 0px; /* 左上角和右下角的圆角 */
	font-size: 16px;
	background-color: red;
	color: white;
	padding: 10px;
	display: inline-block;
}

.heat-items-container {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	white-space: nowrap;
}

.heat-item {
	display: inline-block;
	width: 150px;
	text-align: center;
}

.block-name {
	font-size: 16px;
	margin: 5px 0;
}

.block-gain {
	font-size: 18px;
	margin: 5px 0;
}

.shares-name,
.shares-gain {
	font-size: 12px;
	margin: 5px 0;
}

.positive {
	color: red;
}

.negative {
	color: green;
}

.rise-fall-section {
	margin-top: 15px; /* 为涨跌条组件创建顶部间距 */
}
</style>
