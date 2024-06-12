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
				<text class="header-status">{{ isExpanded ? "🔼" : "🔽" }}</text>
			</view>
			<view class="panel-body" v-if="isExpanded">
				<view
					v-for="(item, index) in newsData"
					:key="item.seq"
					class="news-item"
                   
				>
					<img
						:src="`/static/images/数字${index + 1}.png`"
						class="stock_image"
					/>
					<view
						
						class="news-title"
                        
                         @click="handleClick(item.seq)"
					>
						{{ truncateText(item.title) }}
					</view>
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

const handleClick = (seq: string) => {
   // 阻止默认行为
  console.log("Navigating to detail with seq:", seq);
  uni.navigateTo({
    url: `/src/pages/news-detail/news-detail2?seq=${seq}`,
  });
};


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

.stock_image {
	width: 15px;
	height: 15px;
	margin-right: 10px;
	object-fit: cover;
}
</style>
