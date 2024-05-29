<template>
    <view>
        <view class="custom-nav">
            <button class="avatar-btn" @tap="goToLoginPage">
                <image class="avatar" src="/static/pages/images/头像.png"></image>
            </button>
        </view>
        <view class="title">同花顺模拟炒股</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userInfo: null
        };
    },
    onLoad: function () {
        // 假设用户信息保存在全局的app实例中，这里只是一个示例
        let userInfo = getApp().globalData.userInfo;
        this.setData({
            userInfo: userInfo
        });
    },
    methods: {
        goToLoginPage: function () {
            uni.navigateTo({
                url: '/pages/loginByPhone/loginByPhone'
            });
        }
    }
};
</script>
<style>
.custom-nav {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
}
.avatar-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
