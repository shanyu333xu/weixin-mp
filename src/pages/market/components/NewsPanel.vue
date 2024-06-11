<!-- src/components/NewsPanel.vue -->
<template>
	<view v-if="newsData">
		<view class="panel" @click="togglePanel">
			<view class="panel-header">
				<image
					class="header-image"
					src="/static/images/logo.png"
					mode="aspectFit"
				/>
				<text class="header-title">
					{{ isExpanded ? "" : truncatedTitle }}
				</text>
				<text class="header-status">{{ isExpanded ? "收起" : "展开" }}</text>
			</view>
			<view class="panel-body" v-if="isExpanded">
				<view
					v-for="(item, index) in newsData"
					:key="item.seq"
					class="news-item"
				>
					<text class="news-index">{{ index + 1 }}.</text>
					<navigator
						:url="`/components/NewsDetail/NewsDetail?url=${item.url}`"
						class="news-title"
						@click.stop
					>
						{{ truncateText(item.title) }}
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { getMarketNewsAPI, newsData } from "../service/marketNews";

const isExpanded = ref(false);
const currentIndex = ref(0);

const togglePanel = () => {
	isExpanded.value = !isExpanded.value;
};

const truncatedTitle = computed(() => {
	if (newsData.value.length > 0) {
		return truncateText(newsData.value[currentIndex.value].title);
	}
	return "";
});

const truncateText = (text: string, length: number = 18) => {
	return text.length > length ? text.substring(0, length) + "..." : text;
};

const switchTitle = () => {
	if (!isExpanded.value && newsData.value.length > 1) {
		currentIndex.value = (currentIndex.value + 1) % newsData.value.length;
	}
};

const getMarketNewsData = async () => {
	try {
		await getMarketNewsAPI();
		console.log("获取新闻数据成功", newsData.value);
	} catch (error) {
		console.error("获取新闻数据失败", error);
	}
};

onMounted(async () => {
	await getMarketNewsData();
	setInterval(switchTitle, 1000);
});
</script>

<style scoped>
.panel {
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	margin: 20px 0px;
	padding: 10px;
	background-color: white;
}

.panel-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-image {
	width: 80px;
	height: 40px;
}

.header-title {
	flex: 1;
	margin: 0 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.header-status {
	color: blue;
	cursor: pointer;
}

.panel-body {
	margin-top: 10px;
}

.news-item {
	display: flex;
	align-items: center;
	margin: 5px 0;
}

.news-index {
	width: 20px;
}

.news-title {
	flex: 1;
	text-decoration: none;
}
</style>
