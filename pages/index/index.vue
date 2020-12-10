<template>
	<view class="content">
		<view @click="gotoFunction('../get/get')" class="button">增加训练数据</view>
		<view @click="gotoFunction('../test/test')" class="button">验证训练结果</view>
		<view class="submit name" style="color: #0059B9!important;font-weight: 900;position: fixed;bottom: 0;">版本：1</view>
		<input class="submit name" v-model="name" placeholder="请输入姓名" />
		<view class="submit" @click="changeName">保存姓名</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ""
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('name');
		},
		methods: {
			changeName() {
				uni.setStorageSync('name', this.name);
				uni.showToast({
					title: '修改成功',
					duration: 500
				})
			},
			gotoFunction(url) {
				if (this.name.replace(' ', '').length <= 0) {
					uni.showModal({
						title: '提示',
						content: '请输入姓名',
						showCancel: false
					});
				} else {
					uni.setStorageSync('name', this.name);
					uni.navigateTo({
						url: url
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../all.css");
</style>
