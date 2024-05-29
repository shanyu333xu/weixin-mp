<template>
    <view class="container">
        <text class="title">登录界面</text>
        <view class="input-wrapper">
            <input type="number" placeholder="请输入手机号" @input="inputPhone" />
        </view>
        <view class="input-wrapper">
            <input class="code-input" type="number" placeholder="请输入验证码" @input="inputCode" />
            <button class="code-btn" @tap="getCode" :disabled="!phoneNumber || isCodeButtonDisabled">
                {{ isCodeButtonDisabled ? countdown + 's' : '获取验证码' }}
            </button>
        </view>

        <button class="login-btn" :style="'background-color: ' + btnColor" @tap="login">登录</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: '',
            verificationCode: '',
            isCodeButtonDisabled: false,
            // 控制获取验证码按钮的禁用状态
            btnColor: '#ccc',
            // 默认按钮灰色不可用
            countdown: 60 // 倒计时初始值
        };
    },
    methods: {
        inputPhone: function (e) {
            this.setData({
                phoneNumber: e.detail.value
            });
            this.checkInput(); // 检查输入内容
        },

        inputCode: function (e) {
            this.setData({
                verificationCode: e.detail.value
            });
            this.checkInput(); // 检查输入内容
        },

        checkInput: function () {
            if (this.phoneNumber && this.verificationCode) {
                this.setData({
                    btnColor: 'red' // 输入内容后，按钮变为红色可用状态
                });
            } else {
                this.setData({
                    btnColor: '#ccc' // 否则按钮为灰色不可用状态
                });
            }
        },

        getCode: function () {
            // 模拟获取验证码的逻辑，这里只是一个示例
            console.log('获取验证码');
            // 禁用获取验证码按钮
            this.setData({
                isCodeButtonDisabled: true
            });
            // 开始倒计时
            this.startCountdown();
        },

        // 倒计时函数
        startCountdown: function () {
            let that = this;
            let count = that.countdown;
            // 设置一个定时器，每隔一秒执行一次
            let timer = setInterval(function () {
                count--;
                // 更新倒计时的值
                that.setData({
                    countdown: count
                });
                // 倒计时结束时清除定时器，并恢复获取验证码按钮的可点击状态
                if (count === 0) {
                    clearInterval(timer);
                    that.setData({
                        isCodeButtonDisabled: false,
                        countdown: 60 // 重置倒计时
                    });
                }
            }, 1000);
        },

        login: function () {
            console.log('手机号：', this.phoneNumber);
            console.log('验证码：', this.verificationCode);
            uni.switchTab({
                url: '/pages/hangqing/hangqing'
            });
        }
    }
};
</script>
<style>
.container {
    padding: 100rpx;
}
.title {
    font-size: 24px;
    text-align: center; /* 文本居中对齐 */
}
.input-wrapper {
    margin-bottom: 20rpx;
}
.login-btn {
    background-color: #ccc;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
}

.login-btn:disabled {
    background-color: #ccc;
}

.input-wrapper {
    display: flex;
}

.input-wrapper input {
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
}

.code-btn {
    background-color: #336699;
    color: #ffffff;
    border: none;
    width: 5px;
    border-radius: 5px;
    padding: 8px 2px; /* 调整按钮的内边距 */
    font-size: 13px;
}
.code-input {
    width: 96px !important;
}
.code-btn {
    background-color: #336699;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 8px 2px; /* 调整按钮的内边距 */
    font-size: 13px;
    width: 80px !important;
}
</style>
