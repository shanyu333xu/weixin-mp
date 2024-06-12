<template>
	<BackButton />
	<view class="detail">
		<view>
			<view class="title">{{ title }}</view>
			<view class="info">
				<text>{{ source }}</text>
				<text>{{ formatUnixTimestamp(ctime) }}</text>
			</view>
		 <view class="content" v-html="content"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			seq: "",
			content: "",
			title: "",
			source: "",
			ctime: "",
		};
	},
	onLoad(options) {
			if (options && options.seq) {
				this.seq = options.seq;
				this.fetchArticleDetails();
			}
		},
	methods: {
		fetchArticleDetails() {
			uni.request({
				url: "https://news.10jqka.com.cn/server-page/app/v1/" + this.seq,
				method: "GET",
				success: (res) => {
					 const newsInfo = res.data.data.newsInfo;
                       this.title = newsInfo.title;
                        this.source = newsInfo.source;
                        this.ctime = newsInfo.ctime;
                        this.content = newsInfo.content;
                      
             
                  console.log("新闻内容:", this.content);
                            
                   }
		})
        },
         formatUnixTimestamp(timestamp) {
                const date = new Date(timestamp * 1000); // 将秒数转换为毫秒数
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
                const day = String(date.getDate()).padStart(2, '0');
                const hour = String(date.getHours()).padStart(2, '0');
                const minute = String(date.getMinutes()).padStart(2, '0');
                const second = String(date.getSeconds()).padStart(2, '0');
                
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            }
        
	},
};
</script>

<style lang="scss" scoped>
.title {
	font-size: 50rpx;
	color: #000;
	text-align: justify;
	line-height: 1.4em;
}
.info {
	font-size: 30rpx;
	color: #666;
	padding: 30rpx 0 60rpx;
}
.info text {
	padding-right: 30rpx;
}
.detail {
	padding: 30rpx;
}
.content {
	font-size: 36rpx;
	line-height: 1.7em;
}
</style>
