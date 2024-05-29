<template>
    <!-- index.wxml -->
    <!-- <view class="date">{{currentDate}}</view> -->
    <view class="stock-list">
        <view class="stock-header">
            <text>股票名称</text>
            <text>最新价</text>
            <text>涨跌幅</text>
        </view>
        <block v-for="(item, index) in stocks" :key="index">
            <view class="stock-item">
                <view class="stock-info">
                    <text class="stock-name">{{ item.name }}</text>
                    <text class="stock-code">{{ item.code }}</text>
                </view>
                <text class="stock-price">{{ item.price }}</text>
                <text :class="'stock-change ' + (item.change[0] === '-' ? 'fall' : 'rise')">
                    {{ item.change }}
                </text>
            </view>
        </block>
    </view>
</template>

<script>
// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const util = require('../../utils/util.js');
export default {
    data() {
        return {
            motto: 'Hello World！',
            userInfo: {
                avatarUrl: defaultAvatarUrl,
                nickName: ''
            },
            hasUserInfo: false,
            canIUseGetUserProfile: uni.canIUse('getUserProfile'),
            canIUseNicknameComp: uni.canIUse('input.type.nickname'),
            currentDate: '',
            // 存储当前日期的变量
            stocks: [
                {
                    name: '股票A',
                    code: '000001',
                    price: '10.00',
                    change: '+0.5%'
                },
                {
                    name: '股票B',
                    code: '000002',
                    price: '20.50',
                    change: '-1.2%'
                },
                {
                    name: '股票C',
                    code: '000003',
                    price: '15.75',
                    change: '+2.0%'
                },
                {
                    name: '股票D',
                    code: '000004',
                    price: '10.00',
                    change: '+0.5%'
                },
                {
                    name: '股票F',
                    code: '000005',
                    price: '21.50',
                    change: '-1.8%'
                },
                {
                    name: '股票G',
                    code: '000006',
                    price: '15.75',
                    change: '+2.8%'
                }
            ]
        };
    },
    onLoad: function () {
        this.setCurrentDate(); // 页面加载时设置当前日期
    },
    methods: {
        setCurrentDate: function () {
            const currentDate = util.formatDate(new Date()); // 使用util.js中的格式化函数获取当前日期
            this.setData({
                currentDate: currentDate
            });
        },

        bindViewTap() {
            uni.navigateTo({
                url: '../zixuan/zixuan'
            });
        },

        onChooseAvatar(e) {
            const { avatarUrl } = e.detail;
            const { nickName } = this.userInfo;
            this.setData({
                'userInfo.avatarUrl': avatarUrl,
                hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl
            });
        },

        onInputChange(e) {
            const nickName = e.detail.value;
            const { avatarUrl } = this.userInfo;
            this.setData({
                'userInfo.nickName': nickName,
                hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl
            });
        },

        getUserProfile(e) {
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            uni.getUserProfile({
                desc: '展示用户信息',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    console.log(res);
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    }
};
</script>
<style>
.date {
    position: absolute;
    font-size: 10px;
}

.stock-list {
    padding: 10px;
}
.stock-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 2px solid #e9e9e9;
    margin-bottom: 10px;
    color: #000000;
}

.stock-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.stock-name-code {
    flex-grow: 1;
}

.stock-name {
    font-size: 16px;
    color: #333;
}

.stock-code {
    font-size: 14px;
    color: #999;
    padding-top: 3px;
    display: block;
}

.stock-price-change {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.stock-price {
    font-size: 16px;
    color: #333;
    margin-top: 6px;
    text-align: center;
}

.stock-change {
    font-size: 15px;
    margin-top: -15px;
    text-align: center;
}

.rise {
    color: #ff4444; /* 涨为红色 */
}

.fall {
    color: #33cc33; /* 跌为绿色 */
}
</style>
