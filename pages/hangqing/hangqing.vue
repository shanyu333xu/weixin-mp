<template>
    <view>
        <view class="header">
            <button class="login-button" @tap="navigateToLogin">
                <image src="/static/pages/images/登录.png"></image>
            </button>
            <button type="primary" @tap="toStockInfo">股票页面</button>
            <view class="title-space"></view>
            <view class="title-space"></view>
        </view>
        <view class="page-header">
            <text>{{ stockDate }}</text>
        </view>
        <text>今日板块</text>
        <scroll-view :scroll-x="true" class="modules-scroll-view">
            <view class="module" v-for="(item, index) in modules" :key="index">
                <view :class="'module-header ' + (index == 2 ? 'second' : 'first')">{{ item.title }}</view>

                <view class="stocks-container">
                    <view class="stock-row" v-for="(item, index1) in item.stocks" :key="index1">
                        <view class="stock-card">
                            <view class="stock-name">{{ item.name }}</view>
                            <view :class="'stock-percent ' + (item.percent.startsWith('-') ? 'negative' : 'positive')">{{ item.percent }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <text>股票排行</text>
        <view class="page-header"></view>
        <view class="tabs">
            <text :class="'tab ' + (activeTab === 'rise' ? 'active' : '')" data-type="rise" @tap="handleTabChange">涨幅榜</text>
            <text :class="'tab ' + (activeTab === 'fall' ? 'active' : '')" data-type="fall" @tap="handleTabChange">跌幅榜</text>
            <text :class="'tab ' + (activeTab === 'volume' ? 'active' : '')" data-type="volume" @tap="handleTabChange">成交额</text>
            <text :class="'tab ' + (activeTab === 'speed' ? 'active' : '')" data-type="speed" @tap="handleTabChange">涨速榜</text>
        </view>
        <scroll-view :scroll-y="true" style="height: 300px">
            <view class="stock-list-header">
                <text class="header-item">股票名称</text>
                <text class="header-item">最新价</text>
                <text class="header-item">涨跌幅</text>
                <text class="header-item">涨速</text>
            </view>
            <view class="stocks-list">
                <block v-for="(item, index) in displayStocks" :key="index">
                    <view class="stock-item">
                        <view class="name-code">
                            <text class="stock-name">{{ item.name }}</text>
                            <text class="stock-code">{{ item.code }}</text>
                        </view>
                        <text :class="'price ' + (item.change[0] == '-' ? 'negative' : 'positive')">{{ item.price }}</text>
                        <text :class="'change ' + (item.change[0] == '-' ? 'negative' : 'positive')">{{ item.change }}</text>
                        <text :class="'speed ' + (item.speed[0] == '-' ? 'negative' : 'positive')">{{ item.speed }}</text>
                    </view>
                </block>
            </view>
        </scroll-view>
    </view>
</template>

<script>
// 获取util.js中定义的函数
const util = require('../../utils/util.js');
export default {
    data() {
        return {
            stockDate: '',
            // 初始化空字符串用于存储格式化后的日期
            modules: [
                /*今日板块股票数据 */
                {
                    title: '热门概念',
                    stocks: [
                        {
                            name: '东方财富',
                            percent: '+20.45%'
                        },
                        {
                            name: '京东方A',
                            percent: '+18.75%'
                        },
                        {
                            name: '中兴通讯',
                            percent: '+16.88%'
                        },
                        {
                            name: '格力电器',
                            percent: '+15.22%'
                        },
                        {
                            name: '中国平安',
                            percent: '+13.68%'
                        },
                        {
                            name: '比亚迪',
                            percent: '+11.85%'
                        }
                    ]
                },
                {
                    title: '热门行业',
                    stocks: [
                        {
                            name: '隆基股份',
                            percent: '+22.10%'
                        },
                        {
                            name: '五粮液',
                            percent: '+19.55%'
                        },
                        {
                            name: '恒瑞医药',
                            percent: '+18.03%'
                        },
                        {
                            name: '海康威视',
                            percent: '+16.47%'
                        },
                        {
                            name: '泸州老窖',
                            percent: '+14.32%'
                        },
                        {
                            name: '阳光电源',
                            percent: '+12.98%'
                        }
                    ]
                },
                {
                    title: '5日持续热度板块',
                    stocks: [
                        {
                            name: '宁德时代',
                            percent: '+23.69%'
                        },
                        {
                            name: '天齐锂业',
                            percent: '+21.34%'
                        },
                        {
                            name: '金风科技',
                            percent: '+19.58%'
                        },
                        {
                            name: '荣盛石化',
                            percent: '+17.85%'
                        },
                        {
                            name: '亿纬锂能',
                            percent: '+15.98%'
                        },
                        {
                            name: '三一重工',
                            percent: '+14.06%'
                        }
                    ]
                }
            ],
            allStocks: [
                /*股票排行数据*/
                {
                    name: '宁德时代',
                    code: '688523',
                    price: '44.92',
                    change: '+20.01%',
                    speed: '+0.50%',
                    volume: '15.2亿'
                },
                {
                    name: '药石科技',
                    code: '300725',
                    price: '8.72',
                    change: '+19.95%',
                    speed: '+0.40%',
                    volume: '9.8亿'
                },
                {
                    name: '新能源',
                    code: '600312',
                    price: '10.24',
                    change: '+5.24%',
                    speed: '+0.33%',
                    volume: '2.8亿'
                },
                {
                    name: '旗滨集团',
                    code: '601636',
                    price: '6.27',
                    change: '-2.15%',
                    speed: '-0.05%',
                    volume: '3.1亿'
                },
                {
                    name: '比亚迪',
                    code: '002594',
                    price: '210.00',
                    change: '+1.25%',
                    speed: '+0.25%',
                    volume: '13.6亿'
                },
                {
                    name: '京东方A',
                    code: '000725',
                    price: '3.55',
                    change: '-1.67%',
                    speed: '-0.22%',
                    volume: '11.3亿'
                },
                {
                    name: '隆基股份',
                    code: '601012',
                    price: '41.82',
                    change: '+3.33%',
                    speed: '+0.47%',
                    volume: '12.7亿'
                },
                {
                    name: '中兴通讯',
                    code: '000063',
                    price: '34.12',
                    change: '+1.98%',
                    speed: '+0.32%',
                    volume: '7.5亿'
                },
                {
                    name: '三一重工',
                    code: '600031',
                    price: '21.60',
                    change: '+0.50%',
                    speed: '+0.12%',
                    volume: '5.2亿'
                },
                {
                    name: '海康威视',
                    code: '002415',
                    price: '42.38',
                    change: '-0.90%',
                    speed: '-0.20%',
                    volume: '4.8亿'
                },
                {
                    name: '华泰证券',
                    code: '601688',
                    price: '16.78',
                    change: '+2.56%',
                    speed: '+0.41%',
                    volume: '3.9亿'
                },
                {
                    name: '美的集团',
                    code: '000333',
                    price: '72.50',
                    change: '+1.77%',
                    speed: '+0.29%',
                    volume: '6.6亿'
                },
                {
                    name: '中国平安',
                    code: '601318',
                    price: '79.55',
                    change: '+1.05%',
                    speed: '+0.21%',
                    volume: '8.4亿'
                },
                {
                    name: '格力电器',
                    code: '000651',
                    price: '59.27',
                    change: '-1.45%',
                    speed: '-0.35%',
                    volume: '7.8亿'
                },
                {
                    name: '招商银行',
                    code: '600036',
                    price: '39.22',
                    change: '+0.98%',
                    speed: '+0.19%',
                    volume: '5.1亿'
                },
                {
                    name: '宝钢股份',
                    code: '600019',
                    price: '7.42',
                    change: '+2.47%',
                    speed: '+0.41%',
                    volume: '4.5亿'
                },
                {
                    name: '中国石油',
                    code: '601857',
                    price: '5.23',
                    change: '+0.77%',
                    speed: '+0.14%',
                    volume: '8.9亿'
                },
                {
                    name: '兴业银行',
                    code: '601166',
                    price: '18.55',
                    change: '-1.02%',
                    speed: '-0.26%',
                    volume: '2.6亿'
                },
                {
                    name: '中国中车',
                    code: '601766',
                    price: '8.90',
                    change: '+0.34%',
                    speed: '+0.07%',
                    volume: '4.2亿'
                },
                {
                    name: '贵州茅台',
                    code: '600519',
                    price: '1800.00',
                    change: '+1.25%',
                    speed: '+0.23%',
                    volume: '15.4亿'
                }
            ],
            displayStocks: [],
            // 显示在界面上的股票数据
            activeTab: 'rise' // 当前活跃的标签页，默认为涨幅榜
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        this.setDate();
        this.sortAndSetStocks('rise'); // 默认加载涨幅榜
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        navigateToLogin: function () {
            uni.navigateTo({
                url: '../loginByPhone/loginByPhone'
            });
        },

        toStockInfo: function () {
            uni.navigateTo({
                url: '../stockInfo/stockInfo'
            });
        },

        setDate: function () {
            const now = new Date();
            const formattedDate = util.formatDate(now); // 使用util.js中的函数格式化日期
            this.setData({
                stockDate: formattedDate
            });
        },

        sortAndSetStocks(type) {
            let sortedStocks = this.allStocks.slice();
            switch (type) {
                case 'rise':
                    sortedStocks.sort((a, b) => parseFloat(b.change.replace('%', '')) - parseFloat(a.change.replace('%', '')));
                    break;
                case 'fall':
                    sortedStocks.sort((a, b) => parseFloat(a.change.replace('%', '')) - parseFloat(b.change.replace('%', '')));
                    break;
                case 'speed':
                    sortedStocks.sort((a, b) => parseFloat(b.speed.replace('%', '')) - parseFloat(a.speed.replace('%', '')));
                    break;
                case 'volume':
                    sortedStocks.sort((a, b) => parseFloat(b.volume.replace('亿', '')) - parseFloat(a.volume.replace('亿', '')));
                    break;
            }
            this.setData({
                displayStocks: sortedStocks,
                activeTab: type
            });
        },

        handleTabChange(e) {
            const tabType = e.currentTarget.dataset.type;
            this.sortAndSetStocks(tabType);
        }
    }
};
</script>
<style>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 确保子元素分散对齐 */
    padding: 10px;
}

.login-button {
    /* background-color: gray; */
    color: gray;
    border: none;
    padding: 2px 5px;
    font-size: 15px;
    border-radius: 4px;
    max-width: 50px;
}

.login-button image {
    width: 25px;
    height: 25px;
    vertical-align: middle;
}

.title-space {
    flex-grow: 1; /* 使两侧空间均匀分配 */
}

.page.title {
    flex: 0; /* 不允许标题增长，保持内容宽度 */
    font-size: 16px;
    text-align: center; /* 文本居中对齐 */
}

.page-header {
    padding: 10px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
}

.modules-scroll-view {
    display: inline-block;
    white-space: nowrap;
    overflow-x: auto;
    padding: 10px 0;
}

.module {
    display: inline-block;
    width: 67%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.module-header.first {
    font-size: 16px;
    color: #fff;
    margin-bottom: 10px;
    background-color: red;
    width: 30%;
    padding: 2px;
    border-radius: 5px;
}

.module-header.second {
    font-size: 16px;
    color: white;
    margin-bottom: 10px;
    background-color: red;
    width: 60%;
    padding: 2px;
    border-radius: 5px;
}

.stocks-container {
    display: flex;
    flex-wrap: wrap;
}

.stock-card {
    width: 66%; /* 一行显示三个 */
    margin: 2%; /* 调整间距 */
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 1 2px 2px rgba(0, 0, 0, 0.1);
}

.stock-name {
    font-size: 13px;
    color: #333;
}

.stock-percent {
    font-size: 14px;
    font-weight: bold;
}

.stock-percent.positive {
    color: red; /* 涨幅红色 */
}

.stock-percent.negative {
    color: green; /* 跌幅绿色 */
}

.tabs {
    display: flex;
    justify-content: space-around;
    background-color: #f8f8f8;
    padding: 3px 0;
    font-size: 13px;
}

.tab {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    color: #666;
}

.tab.active {
    color: #ff4444;
    font-weight: bold;
}

.stock-list-header {
    display: flex;
    justify-content: space-between;
    /* background-color: #eee; */
    padding: 10px;
    font-size: 10px;
    color: #999;
}

.header-item {
    flex: 1;
    text-align: center;
    font-weight: bold;
}

.stocks-list {
    padding: 10px;
}

.stock-item {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid #eee;
    align-items: center; /* 确保所有项在同一行内垂直居中 */
}

.name-code {
    flex: 2; /* 为名称和代码分配更多空间 */
    display: flex;
    flex-direction: column; /* 让名称和代码垂直堆叠 */
    justify-content: center; /* 垂直居中名称和代码 */
    align-items: flex-start; /* 左对齐名称和代码 */
}

.price,
.change,
.speed {
    display: block;
    flex: 2; /*为价格、涨跌幅和涨速分配相等的空间*/
    text-align: center; /* 中心对齐文本确保数字对齐 */
    font-family: 'monospace'; /*使用等宽字体确保数字对齐*/
    font-size: 12px;
}

.stock-name,
.stock-code {
    text-align: left; /* 保持文本左对齐 */
}

.stock-code {
    color: #999; /* 股票代码使用较浅的颜色 */
    font-size: 10px;
}

.price.positive,
.change.positive,
.speed.positive {
    color: red;
}
.price.negative,
.change.negative,
.speed.negative {
    color: green;
}
</style>
