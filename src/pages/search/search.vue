<template>
	<BackButton></BackButton>
	<!-- 搜索输入框 -->
	<view class="search-container">
		<input
			class="search-input"
			type="text"
			placeholder="请输入股票名称/股票代码"
			confirm-type="search"
			@confirm="onSearchConfirm"
		/>
	</view>
	<ThsStockList
		v-if="serched"
		ref="stockListRef"
		:stockCodes="stockCodes"
		:button="true"
	/>

	<view v-if="!serched">
		<p class="dajia">大家都在搜</p>
		<navigator
			class="stock_item"
			v-for="(item, index) in stockData1"
			:key="index"
			:url="`/src/pages/stock-detail/stock-detail?code=${item.code}`"
			open-type="navigate"
			hover-class="navigator-hover"
			role="row"
		>
			<view class="stock_cell" role="cell">
				<view class="stock_info">
					<img
						:src="`/static/images/数字${index + 1}.png`"
						class="stock_image"
					/>
					<view class="stock_name">{{ item.name }}</view>
					<text
						class="stock_number"
						:class="{
							positive: item.currentPrice > 0,
							negative: item.currentPrice < 0,
						}"
					>
						{{ formattedPrice(item.currentPrice) }}%
					</text>
				</view>
			</view>
			<FavoriteButton :code="item.code" />
		</navigator>
	</view>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { fetchStockData } from "/src/service/stockService";
import ThsStockList from "/components/ThsStockList/ThsStockList";
import { BaseStockData } from "../../types/stockService";
import BaseStocksList from "/src/store/BaseStocksList.json";
import { useStockList } from "/src/composables/exStockList";
import { StockData } from "/src/types/stockService";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import pageJson from "@/pages.json";
const db = uniCloud.database();
const stocks = ref<StockData[]>([]);
const searchText = ref<string>("");
const stockCodes = ref<string[]>([]);
const serched = ref(false);
const stockData1 = ref<StockData[]>([]);
const stockCodes1 = ref<string[] | null>([
	"sh600056",
	"sh688621",
	"sh600356",
	"sh600560",
]);

const isFavorite = ref<Record<string, boolean>>({});
let likeTime = ref<number>(0);

const getStockData1 = async () => {
	const res = await fetchStockData(stockCodes1.value);
	stockData1.value = res;

	const favoritesRes = await db
		.collection("stockDB")
		.where(`userid == $cloudEnv_uid`)
		.get();
	const favoriteStocks = favoritesRes.result.data.map(
		(item: { stockid: string }) => item.stockid
	);

	favoriteStocks.forEach((stockid: string) => {
		isFavorite.value[stockid] = true;
	});
};

onMounted(() => {
	getStockData1();
});

const onSearchConfirm: UniHelper.InputOnConfirm = (event) => {
	searchText.value = event.detail.value;
	console.log(`搜索内容： ${searchText.value}`);
	if (!searchText.value) {
		stockCodes.value = [];
		serched.value = false;
		return;
	}
	search(searchText.value);
	console.log(`搜索结果： ${stockCodes.value}`);
};

const search = (searchText) => {
	serched.value = true;
	const query = searchText.toLowerCase();
	stockCodes.value = BaseStocksList.filter(
		(stock: BaseStockData) =>
			stock.name.toLowerCase().includes(query) ||
			stock.code.toLowerCase().includes(query) ||
			stock.industry?.toLowerCase().includes(query)
	).map((stock: BaseStockData) => stock.code);
};

import type { ThsStockListInstance } from "../types/components";
const useStockList = () => {
	const stockListRef = ref<ThsStockListInstance | null>(null);

	const onScrolltolower = () => {
		console.log("Scroll to lower");
		stockListRef.value?.getStockData();
	};

	return { stockListRef, onScrolltolower };
};

import { onReachBottom } from "@dcloudio/uni-app";
const { stockListRef, onScrolltolower } = useStockList();
onReachBottom(async () => {
	await stockListRef.value.getStockData();
});

function formattedPrice(price: number): string {
	if (price > 0) {
		return `+${price}`;
	} else if (price < 0) {
		return `-${price}`;
	} else {
		return `${price}`;
	}
}
</script>

<style lang="scss" scoped>
.search-container {
	display: flex;
	justify-content: center;
	padding: 8px;
	margin: 10px;
	border: 1px solid #000000;
	border-radius: 20px;
}

.search-input {
	width: 100%;
	padding: 0px 10px 0px 10px;
	font-size: 16px;
	border: none;
	border-radius: 20px;
}
.dajia {
	margin-top: 30px;
	padding-left: 20px;
	font: optional;
	font-size: 16px;
	font-weight: bolder;
}

.stock_item {
	display: flex;
	justify-content: space-between;
	padding: 5px;
	text-decoration: none;
	background-color: #fff;
	margin-left: 15px;
	font-size: 15px;
}
.stock_cell {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
}
.stock_info {
	display: flex;
	align-items: center;
}
.stock_name {
	text-align: left;
}

.stock_number {
	text-align: left;
	margin-left: 10px;
	font-weight: bolder;
}
.positive {
	color: red;
}

.negative {
	color: green;
}
.stock_image {
	width: 15px;
	height: 15px;
	margin-right: 10px;
	object-fit: cover;
}
</style>
