<template>
	<view class="navigation-bar">
		<view class="back-button">
			<image class="icon" @click="goBack" src="/static/images/back-arrow.png" />
		</view>
		<text class="nav-bar-title">{{ title }} ({{ code }})</text>
	</view>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
	title: string;
	code: string;
}>();

const goBack = () => {
	uni.navigateBack({
		delta: 1,
	});
};
</script>

<style scoped>
.navigation-bar {
	display: flex;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 10px;
	background-color: #fff;
	position: relative;
}

.back-button {
	display: flex;
	align-items: center;
	position: absolute;
	left: 10px; /* Adjust this value to your preference */
}

.icon {
	width: 30px;
	height: 30px;
}

.nav-bar-title {
	font-size: 15px;
	color: #333;
	text-align: center;
	flex-grow: 1;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
</style>
