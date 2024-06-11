<template>
	<button
		:class="{
			'favorite-button': true,
			'delete-button': isFavorite,
		}"
		@click.stop="handleFavoriteTap"
	>
		{{ isFavorite ? "删自选" : "加自选" }}
	</button>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { store } from "@/uni_modules/uni-id-pages/common/store";
const db = uniCloud.database();

interface Props {
	code: string;
}

const props = defineProps<Props>();

const isFavorite = ref(false);
let likeTime = ref<number>(0);

const handleFavoriteTap = async () => {
	if (!store.hasLogin) {
		uni.showModal({
			title: "登录后才可进行后续操作",
			success: (res) => {
				if (res.confirm) {
					uni.navigateTo({
						url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode",
					});
				}
			},
		});
		return;
	}

	let time = Date.now();
	if (time - likeTime.value < 2000) {
		uni.showToast({
			title: "操作太频繁，请稍后...",
			icon: "none",
		});
		return;
	}

	likeTime.value = time; // 更新 likeTime 的值

	try {
		let count = await db
			.collection("stockDB")
			.where(`stockid == "${props.code}" && userid == $cloudEnv_uid`)
			.count();

		if (count.result.total) {
			await db
				.collection("stockDB")
				.where(`stockid == "${props.code}" && userid == $cloudEnv_uid`)
				.remove();

			isFavorite.value = false;

			// 显示提示信息
			uni.showToast({
				title: "已删除",
				icon: "success",
			});
		} else {
			await db.collection("stockDB").add({
				stockid: props.code,
			});

			isFavorite.value = true;

			uni.showToast({
				title: "已添加",
				icon: "success",
			});
		}
	} catch (error) {
		console.error("操作失败", error);
		uni.showToast({
			title: "操作失败",
			icon: "none",
		});
	}
};

const checkFavoriteStatus = async () => {
	const favoritesRes = await db
		.collection("stockDB")
		.where(`stockid == "${props.code}" && userid == $cloudEnv_uid`)
		.get();

	if (favoritesRes.result.data.length > 0) {
		isFavorite.value = true;
	} else {
		isFavorite.value = false;
	}
};

onMounted(() => {
	checkFavoriteStatus();
});
</script>

<style scoped>
.favorite-button {
	background-color: #fff;
	border: 1px solid #f17958;
	color: #f17958;
	font-size: 14px;
	border-radius: 20px;
	padding: 0px 10px;
	cursor: pointer;
}
.delete-button {
	background-color: #ccc;
	border-color: #ccc;
	color: #fff;
}
</style>
