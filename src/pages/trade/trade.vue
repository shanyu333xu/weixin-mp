<template>
	<NavigationBar />
	<view class="user-info">
		<view class="avatar">A股</view>
		<text class="nickname">{{ user.nickname }}</text>
		<button class="switch-button" @click="switchUser">切换用户</button>
	</view>

	<!-- 账户信息 -->
	<view class="asset-info">
		<view class="asset-row">
			<view class="asset-item">
				<text class="item-name">总资产</text>
				<text class="item-value">{{ formatNumber(assets.total) }}</text>
			</view>
			<view class="asset-item">
				<text class="item-name">浮动盈亏</text>
				<text class="item-value">{{
					formatNumber(assets.floatProfitLoss)
				}}</text>
			</view>
		</view>
		<view class="asset-row">
			<view class="asset-item">
				<text class="item-name">总市值</text>
				<text class="item-value">{{ formatNumber(assets.marketValue) }}</text>
			</view>
			<view class="asset-item">
				<text class="item-name">当日参考盈亏</text>
				<text class="item-value">{{
					formatNumber(assets.todayProfitLoss)
				}}</text>
			</view>
		</view>
	</view>
	
	<view class="custom-icons">
	    <view class="icon-item" @click="onBuyClicked">
	      <image class="icon" src="/static/images/buy.png"></image>
	      <text class="icon-text">买入</text>
	    </view>
	    <view class="icon-item" @click="onSellClicked">
	      <image class="icon" src="/static/images/sell.png"></image>
	      <text class="icon-text">卖出</text>
	    </view>
	    <view class="icon-item" @click="onCancelClicked">
	      <image class="icon" src="/static/images/cancel.png"></image>
	      <text class="icon-text">撤单</text>
	    </view>
	    <view class="icon-item" @click="onHoldingsClicked">
	      <image class="icon" src="/static/images/holding.png"></image>
	      <text class="icon-text">持仓</text>
	    </view>
	    <view class="icon-item" @click="onQueryClicked">
	      <image class="icon" src="/static/images/query.png"></image>
	      <text class="icon-text">查询</text>
	    </view>
	  </view>
	  
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const user = reactive({
	nickname: "A股模拟练习",
});

const assets = reactive({
	total: 200000,
	floatProfitLoss: 0,
	marketValue: 0,
	todayProfitLoss: 0,
});
function formatNumber(value: number) {
	return value.toFixed(2); // 格式化数字显示到后两位
}

function switchUser() {
	// 跳转到登录页面，请注意此处只是假设路径，需要根据云函数情况修改！
	uni.navigateTo({
		url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
	});
}
</script>

<style lang="scss" scoped>
.user-info {
	display: flex;
	align-items: center;
	padding: 10px;
}

.avatar {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	margin-right: 10px;
	font-size: 18px;
	font-weight: bold;
	color: white;
	background-color: red;
	border-radius: 50%;
}

.nickname {
	flex: 1;
	font-size: 16px;
}

.switch-button {
	padding: 5px 10px;
	color: #fff;
	cursor: pointer;
	background-color: #007bff;
	border: none;
	border-radius: 5px;
}
// 账号信息
.asset-info {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
}

.asset-row {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}

.asset-item {
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
}

.item-name {
	font-size: 14px;
	color: gray;
}

.item-value {
	margin-top: 5px;
	font-size: 16px;
	font-weight: bold;
	color: black;
}

.custom-icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.icon-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 40px;
  height: 40px;
}

.icon-text {
  margin-top: 5px;
  white-space: nowrap; /* 防止文字换行 */
}
</style>
