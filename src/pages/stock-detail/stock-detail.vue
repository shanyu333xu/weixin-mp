<template>
	<StockDetailNav :title="stock.name" :code="stock.code"></StockDetailNav>
	<view class="box">
		<view class="top">
			<view class="top-left">
				<view class="top-left-up">
					<text :class="stock.speedPercent < 0 ? 'nev' : 'pos'">
						{{ stock.currentPrice }}
					</text>
				</view>
				<view class="top-left-down">
					<text :class="stock.speedPercent < 0 ? 'nev' : 'pos'">
						<text v-if="stock.changePercent >= 0">+</text>
						{{ stock.changePercent }}%
					</text>
					<text :class="stock.speedPercent < 0 ? 'nev' : 'pos'">
						<text v-if="stock.speedPercent >= 0">+</text>
						{{ stock.speedPercent }}%
					</text>
				</view>
			</view>

			<view class="top-right">
				<view class="top-right-up">
					<view class="up">
						<text class="wz">高</text>
						<text class="sj" style="color: red">{{ stock.highPrice }}</text>
					</view>
					<view class="up">
						<text class="wz">开</text>
						<text class="sj" style="color: #33b26d">{{ stock.openPrice }}</text>
					</view>
					<view class="up">
						<text class="wz">量</text>
						<text class="sj">{{ stock.volume }}万</text>
					</view>
				</view>

				<view class="top-right-down">
					<view class="down">
						<text class="wz">低</text>
						<text class="sj" style="color: #33b26d">{{ stock.lowPrice }}</text>
					</view>
					<view class="down">
						<text class="wz">换</text>
						<text class="sj">{{ stock.change }}万</text>
					</view>
					<view class="down">
						<text class="wz">额</text>
						<text class="sj">{{ stock.amount }}亿</text>
					</view>
				</view>
			</view>
		</view>

		<view class="tapbox">
			<view class="taptop">
				<view class="tabs">
					<view
						:class="currentTab === 'min' ? 'selected' : 'tab-item '"
						data-tab="min"
						@click="switchTab"
						>分时
					</view>
					<view
						:class="currentTab === 'daily' ? 'selected' : 'tab-item '"
						data-tab="daily"
						@click="switchTab"
						>日k
					</view>
					<view
						:class="currentTab === 'weekly' ? 'selected' : 'tab-item '"
						data-tab="weekly"
						@click="switchTab"
						>周K
					</view>
					<view
						:class="currentTab === 'monthly' ? 'selected' : 'tab-item '"
						data-tab="monthly"
						@click="switchTab"
						>月K
					</view>
				</view>
			</view>

			<view class="tapdown">
				<image class="chart" :src="currentChart"></image>
				<view class="tapdown-right">
					<view class="right-up">
						<view
							class="sell"
							v-for="(item, index) in [5, 4, 3, 2, 1]"
							:key="index"
						>
							<view class="b-b label">卖{{ item }}</view>
							<view class="b-b value">
								{{
									stock["sell" + item + "Price"] == 0
										? "--"
										: stock["sell" + item + "Price"]
								}}
							</view>
							<view class="b-b value">{{
								stock["sell" + item + "Volume"]
							}}</view>
						</view>
					</view>

					<view class="right-down">
						<view class="buy">
							<view class="b-b label">买1</view>
							<view class="b-b value">{{ stock.buy1Volume }}</view>
							<view class="b-b value">{{ stock.buy1Price }}</view>
						</view>
						<view class="buy">
							<view class="b-b label">买2</view>
							<view class="b-b value">{{ stock.buy2Volume }}</view>
							<view class="b-b value">{{ stock.buy2Price }}</view>
						</view>
						<view class="buy">
							<view class="b-b label">买3</view>
							<view class="b-b value">{{ stock.buy3Volume }}</view>
							<view class="b-b value">{{ stock.buy3Price }}</view>
						</view>
						<view class="buy">
							<view class="b-b label">买4</view>
							<view class="b-b value">{{ stock.buy4Volume }}</view>
							<view class="b-b value">{{ stock.buy4Price }}</view>
						</view>
						<view class="buy">
							<view class="b-b label">买5</view>
							<view class="b-b value">{{ stock.buy5Volume }}</view>
							<view class="b-b value">{{ stock.buy5Price }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="tab-bar">
			<button :class="tradeClass" @click="navigateToTrade">交易</button>
			<view class="tab-item">
				<image :src="favoriteIconSrc" class="icon" @click="handleFavoriteTap" />
				<text class="tab-text">自选</text>
			</view>
			<button class="share-button tab-item" open-type="share">
				<image src="/static/images/fenxiang.png" class="icon"></image>
				<text class="tab-text">分享</text>
			</button>
		</view>
	</view>
	<NewsList />
</template>

<script>
const db = uniCloud.database();
import { fetchStockData } from "../../service/stockService";
import { store } from "../../../uni_modules/uni-id-pages/common/store.js";
import pageJson from "@/pages.json";
export default {
	props: ["code"],
	computed: {
		tradeClass() {
			return store.hasLogin ? "trade" : "trade disabled";
		},
	},
	data() {
		return {
			favoriteIconSrc: "/static/images/zixuan.png", // 默认显示未收藏的图标
			isFavorite: false,
			stock: {},
			currentTab: "min",
			currentChart: `http://image.sinajs.cn/newchart/min/n/sh${this.code}.gif`,
		};
	},
	mounted() {
		this.checkFavorite();
		this.loadStockData();
		this.setFavoriteState();
	},

	methods: {
		async loadStockData() {
			try {
				const stockData = await fetchStockData([this.code]);
				this.stock = stockData[0];
				this.currentChart = `http://image.sinajs.cn/newchart/min/n/sh${this.code}.gif`;
			} catch (error) {
				console.error("获取股票数据失败:", error);
			}
		},
		switchTab(e) {
			const tab = e.currentTarget.dataset.tab;
			const chartUrls = {
				daily: `http://image.sinajs.cn/newchart/daily/n/${this.code}.gif`,
				min: `http://image.sinajs.cn/newchart/min/n/${this.code}.gif`,
				weekly: `http://image.sinajs.cn/newchart/weekly/n/${this.code}.gif`,
				monthly: `http://image.sinajs.cn/newchart/monthly/n/${this.code}.gif`,
			};
			this.currentTab = tab;
			this.currentChart = chartUrls[tab];
		},
		navigateToTrade() {
			if (!store.hasLogin) {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
				});
			} else {
				uni.switchTab({
					url: `/src/pages/trade/trade?code=${this.code}`,
				});
			}
		},
		async handleFavoriteTap() {
			if (!store.hasLogin) {
				uni.showModal({
					title: "登录后才可进行后续操作",
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
							});
						}
					},
				});
				return;
			}
			let time = Date.now();
			if (time - this.likeTime < 2000) {
				uni.showToast({
					title: "操作太频繁，请稍后...",
					icon: "none",
				});
				return;
			}
			let count = await db
				.collection("stockDB")
				.where(`stockid=="${this.code}" && userid==$cloudEnv_uid`)
				.count();
			if (count.result.total) {
				db.collection("stockDB")
					.where(`stockid=="${this.code}" && userid==$cloudEnv_uid`)
					.remove();
				this.isFavorite = false;
				this.setFavoriteState();
				// 显示提示信息
				uni.showToast({
					title: "已删除",
					icon: "success",
				});
			} else {
				db.collection("stockDB").add({
					stockid: this.code,
				});
				this.isFavorite = true;
				this.setFavoriteState();
				uni.showToast({
					title: "已添加",
					icon: "success",
				});
			}
		},
		setFavoriteState() {
			if (this.isFavorite) {
				this.favoriteIconSrc = "/static/images/zixuanshanchu.png";
			} else {
				this.favoriteIconSrc = "/static/images/zixuan.png";
			}
		},
		async checkFavorite() {
			// 检查收藏列表中是否存在该股票
			const count = await db
				.collection("stockDB")
				.where(`stockid=="${this.code}" && userid==$cloudEnv_uid`)
				.count();

			// 根据数量判断用户是否已收藏该股票
			if (count.result.total) {
				this.isFavorite = true; // 标记已收藏
				this.favoriteIconSrc = "/static/images/zixuanshanchu.png"; // 显示已收藏的图标
				this.favoriteText = "已收藏"; // 显示已收藏的文字
			}
		},
	},
};
</script>

<style>
.box {
	display: flex;
	flex-direction: column;
	padding: 5px;
}

.top {
	display: flex;
	flex-direction: row;
	height: 60px;
	margin-bottom: 10px;
}

.top-left {
	display: flex;
	flex-direction: column;
	width: 100px;
}

.top-left-up {
	padding-left: 5px;
	font-size: x-large;
	font-weight: bolder;
	text-align: left;
}

.top-left-down {
	width: 110px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 6px;
	margin-right: 8px;
	margin-left: 5px;
	font-size: xx-small;
	text-align: center;
}

.top-right {
	display: flex;
	flex-direction: column;
	margin-left: 40px;
}

.top-right-up,
.top-right-down {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	justify-content: space-between;
	text-align: center;
}

.wz {
	margin-right: 6px;
	font-size: small;
	color: gray;
}

.sj {
	margin-right: 12px;
	font-size: xx-small;
}

.tapbox {
	display: flex;
	flex-direction: column;
}

.tabs {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	justify-content: space-between;
	width: 200px;
	text-align: center;
}

.tapdown {
	display: flex;
	flex-direction: row;
}

.chart {
	width: 210px;
	height: 220px;
}

.tapdown-right {
	display: flex;
	flex-direction: column;
}

.right-up {
	border-bottom: 2px solid gray;
}

.label {
	font-size: 13px;
	text-align: left;
}

.sell,
.buy {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	font-size: small;
}

.value {
	flex: 1;
	width: 50px;
	text-align: right;
}

.b-b {
	margin-bottom: 5px;
	margin-left: 10px;
	font-size: 12px;
}

.nev {
	color: green;
}

.pos {
	color: red;
}

.selected {
	font-size: medium;
	font-weight: bolder;
	border-bottom: 8rpx solid rgb(218, 149, 103);
}

.tab-item {
	font-size: small;
	font-weight: bolder;
}

.image {
	width: 25px;
	height: 25px;
	padding: 5px;
}

.share-button {
	padding: 0;
	background-color: transparent;
	border: none;
}
.share-button .icon {
	margin-top: 5px;
}
.icon {
	width: 25px;
	height: 25px;
}

.tab-bar {
	position: fixed;
	bottom: 0;
	display: flex;
	width: 100%;
	height: 50px;
	background-color: #ffffff;
	border-top: 1px solid #e0e0e0;
}

.trade {
	width: 140px;
	font-size: small;
	font-weight: bolder;
	padding: 10px 20px;
	color: #fff;
	background-color: #d84a36;
	border: none;
	border-radius: 15px;
	cursor: pointer;
}
.disabled {
	width: 140px;
	background-color: #ccc;
	cursor: pointer;
}
/* 导航栏中的每一项 */
.tab-item {
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-decoration: none;
}

/* 文字标签样式 */
.tab-text {
	margin-top: 2px;
	font-size: 12px;
}
</style>
