<template>
  <view class="detail">
    <text>新闻详情</text>
    <view>新闻标题：{{title}}</view>
    <view>新闻来源：{{source}}</view>
    <view>新闻内容{{digest}}</view>
    <view>
      <view>新闻ID: {{ docid }}</view>
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
      source: ''
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
      console.log('Fetching details for docid:', this.docid);
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
           console.log('digest:', digest);
           this.digest=digest
            this.title=title
             this.source=source
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

<style scoped>
.detail {
  padding: 20px;
}
</style>
