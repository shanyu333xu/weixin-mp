<template>
	<view class="navigation-bar">
		<!-- 已登录操作 -->
		<template v-if="hasLogin">
			<image
				src="@/static/images/hasLogin.png"
				class="nav-bar-logo"
				@click="showPopup"
			/>
			<!-- 弹层 -->
			<uni-popup ref="popup" type="center" background-color="#fff">
				<view class="popup-content">
					<!-- 默认头像 -->
					<image class="avatar" src="@/static/images/hasLogin.png"></image>
					<!-- 退出登录按钮 -->
					<button @click="logout" class="logout-button">退出登录</button>
					<!-- 切换账号文本 -->
					<text @click="switchAccount" class="switch-account">切换账号</text>
				</view>
			</uni-popup>
		</template>
		<!-- 未登录头像 -->
		<template v-else>
			<image
				class="nav-bar-logo"
				src="@/static/images/login.png"
				@click="navigateToLogin"
			></image>
		</template>
		<text class="nav-bar-title">{{ title }}</text>
		<view class="nav-bar-placeholder"></view>
	</view>
</template>

<script>
import { store, mutations } from "@/uni_modules/uni-id-pages/common/store.js";

export default {
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	computed: {
		userInfo() {
			return store.userInfo;
		},
		hasLogin() {
			return store.hasLogin;
		},
	},
	data() {
		return {};
	},
	methods: {
		navigateToLogin() {
			uni.navigateTo({
				url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
			});
		},
		showPopup() {
			//有登录的情况点击弹出弹层，显示默认头像，退出登录和切换账号
			this.$refs.popup.open("center");
		},
		logout() {
			mutations.logout();
			uni.showToast({
				title: "该账号已退出登录",
				icon: "success",
			});
			this.$refs.popup.close();
		},
		switchAccount() {
			uni.navigateTo({
				url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
			});
			this.$refs.popup.close();
		},
	},
};
</script>

<style scoped>
.navigation-bar {
	display: flex;
	align-items: center;
	padding: 24px;
	background-color: #fff;
}
.nav-bar-logo {
	width: 30px;
	height: 30px;
	margin-right: 10px;
}
.nav-bar-title {
	font-size: 15px;
	color: #333;
	text-align: center;
}
.popup-content {
	width: 150px;
	padding: 20px;
	text-align: center;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 20px;
}

.logout-button {
	display: block;
	width: 100px;
	height: 68px;
	padding: 10px;
	margin-bottom: 20px;
	background-color: #f56c6c;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.switch-account {
	color: #409eff;
	cursor: pointer;
}
</style>
