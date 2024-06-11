<template>
	<view>
		<view class="news">新闻</view>
		<view
			v-for="item in listArr"
			:key="item.docid"
			@click="goDetail(item.docid)"
			class="item"
		>
			<view class="text">
				<view class="title">{{ item.title }}</view>
				<view class="info">
					<text>{{ item.source }}</text>
					<text>{{ item.ptime }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Article {
	docid: string;
	title: string;
	source: string;
	ptime: string;
}

const listArr = ref<Article[]>([]);

const goDetail = (docid: string) => {
	uni.navigateTo({
		url: `/src/pages/news-detail/news-detail?docid=${docid}`, // 使用正确的页面路径
	});
};

const getData = () => {
	uni.request({
		url: "https://3g.163.com/touch/reconstruct/article/list/BA8D4A3Rwangning/0-10.html",
		method: "GET",
		success: (res) => {
			if (res.statusCode === 200) {
				try {
					const artiListString = res.data.substring(9, res.data.length - 1);
					const artiList = JSON.parse(artiListString);
					const key = "BA8D4A3Rwangning";
					if (artiList && artiList[key]) {
						listArr.value = artiList[key];
					} else {
						console.error("未找到期望的键:", key);
					}
				} catch (error) {
					console.error("解析返回数据时发生错误:", error);
				}
			} else {
				console.error("API调用失败", res);
			}
		},
		fail: (err) => {
			console.error("请求失败", err);
		},
	});
};

onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped>
.news {
	font-size: 18px;
	font-weight: bolder;
}
.content {
	padding: 30rpx;
}

.item {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}

.text {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: 20rpx;
}

.title {
	font-size: 15px;
	color: #333;
	text-align: justify;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.info {
	font-size: 10px;
	color: #888;
}

.info text {
	padding-right: 20rpx;
}
</style>
