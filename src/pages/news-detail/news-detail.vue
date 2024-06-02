<template>
    <BackButton/>
    <view class="detail">
    	<view>			
    		<view class="title">{{title}}</view>
    		<view class="info">
    			<text>{{source}}</text>
    			<text>{{ptime}}</text>
    		</view>
    		<view class="content">
    			{{digest}}
    		</view>
    	</view>
    </view>
</template>

<script>
export default {
  data() {
    return {
      docid: '', 
      digest:'',
      title:'',
      source: '',
      ptime:''
    };
  },
  onLoad(options) {
    if (options.docid) {
      this.docid = options.docid; 
      this.fetchArticleDetails();
    }
  },
  methods: {
    fetchArticleDetails() {
      uni.request({
        url: 'https://3g.163.com/touch/reconstruct/article/list/BA8D4A3Rwangning/0-10.html',
        method: 'GET',
        success: (res) => {
        const data = res.data;
        const jsonData = JSON.parse(data.substring(data.indexOf('(') + 1, data.lastIndexOf(')')));
        const articles = jsonData.BA8D4A3Rwangning;
       const article = articles.find(article => article.docid === this.docid);
       if (article) {
           const digest = article.digest;
           const title = article.title;
           const source = article.source;
            const ptime = article.ptime;
           console.log('digest:', digest);
           this.digest=digest
            this.title=title
             this.source=source
             this.ptime=ptime
       } else {
           console.error('未找到对应的新闻对象，docid:', docid);
       }
        },
        fail: (error) => {
          console.error('请求失败:', error);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
    	font-size: 50rpx;
    	color:#000;
    	text-align: justify;
    	line-height: 1.4em;
    }
    .info{
    	font-size: 30rpx;
    	color:#666;
    	padding:30rpx 0 60rpx;
    }
   .info text{
    	padding-right: 30rpx;
    }
.detail{
	padding:30rpx;	
}
.content{
		font-size: 36rpx;
		line-height: 1.7em;
	}
</style>
