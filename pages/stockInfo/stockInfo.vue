<template>
    <view class="box">
        <view class="top">
            <view class="top-left">
                <view class="top-left-up">
                    <text :class="dataArray.speed < 0 ? 'nev' : 'pos'">{{ stockData[3] }}</text>
                </view>
                <view class="top-left-down">
                    <text :class="dataArray.speed < 0 ? 'nev' : 'pos'">
                        <text v-if="dataArray.changeprice >= 0">+</text>
                        {{ dataArray.changeprice }}
                    </text>
                    <text :class="dataArray.speed < 0 ? 'nev' : 'pos'">
                        <text v-if="dataArray.speed >= 0">+</text>
                        {{ dataArray.speed }}%
                    </text>
                </view>
            </view>

            <view class="top-right">
                <view class="top-right-up">
                    <view class="up">
                        <text class="wz">高</text>
                        <text class="sj" style="color: red">{{ dataArray.max }}</text>
                    </view>
                    <view class="up">
                        <text class="wz">开</text>
                        <text class="sj" style="color: #33b26d">{{ dataArray.kpj }}</text>
                    </view>
                    <view class="up">
                        <text class="wz">量</text>
                        <text class="sj">{{ dataArray.num }}万</text>
                    </view>
                </view>

                <view class="top-right-down">
                    <view class="down">
                        <text class="wz">低</text>
                        <text class="sj" style="color: #33b26d">{{ dataArray.min }}</text>
                    </view>
                    <view class="down">
                        <text class="wz">换</text>
                        <text class="sj">{{ dataArray.kpj }}</text>
                    </view>
                    <view class="down">
                        <text class="wz">额</text>
                        <text class="sj">{{ dataArray.cje }}亿</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="tapbox">
            <view class="taptop">
                <view class="tabs">
                    <view :class="currentTab === 'min' ? 'selected' : 'tab-item '" data-tab="min" @tap="switchTab">分时</view>
                    <view :class="currentTab === 'daily' ? 'selected' : 'tab-item '" data-tab="daily" @tap="switchTab">日k</view>
                    <view :class="currentTab === 'weekly' ? 'selected' : 'tab-item'" data-tab="weekly" @tap="switchTab">周K</view>
                    <view :class="currentTab === 'monthly' ? 'selected' : 'tab-item'" data-tab="monthly" @tap="switchTab">月K</view>
                </view>
            </view>

            <view class="tapdown">
                <image class="chart" :src="currentChart"></image>
                <view class="tapdown-right">
                    <view class="right-up">
                        <view class="sell">
                            <view class="b-b label">卖5</view>
                            <view class="b-b value">{{ stockData[29] == 0 ? '--' : stockData[29] }}</view>
                            <view class="b-b value">{{ stockData[28] / 100 }}</view>
                        </view>

                        <view class="sell">
                            <view class="b-b label">卖4</view>
                            <view class="b-b value">{{ stockData[27] == 0 ? '--' : stockData[27] }}</view>
                            <view class="b-b value">{{ stockData[26] / 100 }}</view>
                        </view>

                        <view class="sell">
                            <view class="b-b label">卖3</view>
                            <view class="b-b value">{{ stockData[25] == 0 ? '--' : stockData[25] }}</view>
                            <view class="b-b value">{{ stockData[24] / 100 }}</view>
                        </view>

                        <view class="sell">
                            <view class="b-b label">卖2</view>
                            <view class="b-b value">{{ stockData[23] == 0 ? '--' : stockData[23] }}</view>
                            <view class="b-b value">{{ stockData[22] / 100 }}</view>
                        </view>

                        <view class="sell">
                            <view class="b-b label">卖1</view>
                            <view class="b-b value">{{ stockData[21] == 0 ? '--' : stockData[21] }}</view>
                            <view class="b-b value">{{ stockData[20] / 100 }}</view>
                        </view>
                    </view>
                    <view class="right-down">
                        <view class="buy">
                            <view class="b-b label">买1</view>
                            <view class="b-b value">{{ stockData[11] }}</view>
                            <view class="b-b value">{{ stockData[10] / 100 }}</view>
                        </view>
                        <view class="buy">
                            <view class="b-b label">买2</view>
                            <view class="b-b value">{{ stockData[13] }}</view>
                            <view class="b-b value">{{ stockData[12] / 100 }}</view>
                        </view>
                        <view class="buy">
                            <view class="b-b label">买3</view>
                            <view class="b-b value">{{ stockData[15] }}</view>
                            <view class="b-b value">{{ stockData[14] / 100 }}</view>
                        </view>
                        <view class="buy">
                            <view class="b-b label">买4</view>
                            <view class="b-b value">{{ stockData[17] }}</view>
                            <view class="b-b value">{{ stockData[16] / 100 }}</view>
                        </view>
                        <view class="buy">
                            <view class="b-b label">买5</view>
                            <view class="b-b value">{{ stockData[19] }}</view>
                            <view class="b-b value">{{ stockData[18] / 100 }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="tab-bar">
            <button class="tab-item trade" @tap="navigateToTrade">交易</button>
            <view class="tab-item" @tap="handleFavoriteTap">
                <image :src="zixuanImage" class="icon" />
                <text class="tab-text">自选</text>
            </view>
            <button class="share-button tab-item" open-type="share">
                <image src="/static/pages/images/fenxiang.png" class="icon"></image>
                <text class="tab-text">分享</text>
            </button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            zixuanImage: '/static/pages/images/zixuanshanchu.png',
            // 初始自选图片路径
            isFavorite: true,
            // 初始自选状态
            stockData: {},
            // 存储原始股票信息的对象
            dataArray: {
                speed: 0,
                changeprice: 0,
                max: '',
                kpj: '',
                num: '',
                min: '',
                cje: ''
            },
            // 存储格式化后的股票信息的对象
            currentChart: '',
            // 当前显示的图表链接
            stockCode: '688523',
            // 股票代码
            currentTab: 'min' // 当前选中的页签，默认为分钟图
        };
    }
    /**
     * 用户点击右上角分享
     */,

    onLoad: function () {
        // 设置当前页面导航栏标题
        uni.setNavigationBarTitle({
            title: '航天环宇（688523）'
        });
        // 请求股票数据
        this.requestStockData();
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: '转发自选股票页面',
            path: '/pages/stockInfo/stockInfo.wxml'
            // imageUrl: '/pages/images/fenxiang.png'  // 自定义分享图片
        };
    },
    methods: {
        handleFavoriteTap() {
            if (this.isFavorite) {
                uni.showModal({
                    title: '取消自选',
                    content: '确定取消自选？',
                    success: (res) => {
                        if (res.confirm) {
                            this.setData({
                                isFavorite: false,
                                zixuanImage: '/static/pages/images/zixuan.png'
                            });
                            uni.showToast({
                                title: '已取消自选',
                                icon: 'success',
                                duration: 2000
                            });
                        }
                    }
                });
            } else {
                this.setData({
                    isFavorite: true,
                    zixuanImage: '/static/pages/images/zixuanshanchu.png'
                });
                uni.showToast({
                    title: '已添加到自选',
                    icon: 'success',
                    duration: 2000
                });
            }
        },

        // 请求股票数据
        requestStockData: function () {
            uni.request({
                url: 'https://hq.sinajs.cn/',
                data: {
                    list: 'sh' + this.stockCode
                },
                success: (res) => {
                    console.log(res.data);
                    // 提取股票数据
                    const dataArray = res.data
                        .match(/".*?"/g)
                        .map((item) => item.replace(/"/g, '').replace(/，/g, ','))[0]
                        .split(',');
                    // 格式化股票数据
                    const formattedData = this.formatStockData(dataArray);

                    // 更新页面数据
                    this.setData({
                        stockData: dataArray,
                        dataArray: formattedData.dataArray,
                        currentChart: formattedData.chartUrl
                    });
                },
                fail: (error) => {
                    console.error('请求股票数据失败:', error);
                }
            });
        },

        // 格式化股票数据
        formatStockData: function (dataArray) {
            // 格式化股票信息
            let formattedData = {
                dataArray: {
                    speed: (((parseFloat(dataArray[3]) - parseFloat(dataArray[2])) / parseFloat(dataArray[2])) * 100).toFixed(2),
                    changeprice: (parseFloat(dataArray[3]) - parseFloat(dataArray[2])).toFixed(2),
                    cje: (parseFloat(dataArray[9]) / 100000000).toFixed(1),
                    num: (parseFloat(dataArray[8]) / 1000000).toFixed(1),
                    max: parseFloat(dataArray[4]).toFixed(2),
                    min: parseFloat(dataArray[5]).toFixed(2),
                    kpj: parseFloat(dataArray[1]).toFixed(2)
                },
                // 设置默认显示的图表链接为分钟图
                chartUrl: `http://image.sinajs.cn/newchart/min/n/sh${this.stockCode}.gif`
            };
            return formattedData;
        },

        // 切换图表页签
        switchTab: function (e) {
            // 获取当前点击的页签
            const tab = e.currentTarget.dataset.tab;
            // 定义不同页签对应的图表链接
            const chartUrls = {
                daily: `http://image.sinajs.cn/newchart/daily/n/sh${this.stockCode}.gif`,
                min: `http://image.sinajs.cn/newchart/min/n/sh${this.stockCode}.gif`,
                weekly: `http://image.sinajs.cn/newchart/weekly/n/sh${this.stockCode}.gif`,
                monthly: `http://image.sinajs.cn/newchart/monthly/n/sh${this.stockCode}.gif`
            };
            // 获取对应页签的图表链接
            const chartUrl = chartUrls[tab] || '';
            // 更新当前选中的页签
            this.setData({
                currentTab: tab,
                currentChart: chartUrl
            });
        },

        navigateToTrade() {
            console.log('占位：函数 navigateToTrade 未声明');
        }
    }
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
    text-align: left;
    font-size: x-large;
    font-weight: bolder;
}

.top-left-down {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    font-size: xx-small;
    margin-left: 5px;
    margin-right: 8px;
    margin-top: 6px;
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
    justify-content: space-between;
    align-items: center;
    text-align: center;
}

.wz {
    font-size: small;
    color: gray;
    margin-right: 6px;
}

.sj {
    font-size: xx-small;
    margin-right: 12px;
}

.tapbox {
    display: flex;
    flex-direction: column;
}

.tabs {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 200px;
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
    justify-content: space-between;
    align-items: center;
    font-size: small;
    width: 100%;
}
.value {
    flex: 1;
    text-align: right;
    width: 50px;
}
.b-b {
    font-size: 12px;
    margin-left: 10px;
    margin-bottom: 5px;
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
    padding: 0; /* 去除按钮内边距 */
    border: none; /* 去除按钮边框 */
    background-color: transparent; /* 透明背景 */
}
.icon {
    width: 25px; /* 图片宽度 */
    height: 25px; /* 图片高度 */
}
.tab-bar {
    display: flex;
    height: 50px; /* 增加高度以容纳图标和文字 */
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.trade {
    border: none;
    color: #fff;
    background-color: #d84a36;
    border-radius: 15px;
    padding: 10px 20px;
}
/* 导航栏中的每一项 */
.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}
/* 文字标签样式 */
.tab-text {
    font-size: 12px;
    margin-top: 2px;
}
</style>
