<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			let that = this;
			// 判断用户是否注册,已注册用户类型
			let openid = uni.getStorageSync('openid')
			console.log("openid", openid);
			if (openid == null || openid == undefined || openid == '') {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			} else {
				that.$http.changeLogin({
					openId: openid
				}).then(res => {
					let type = res.data.data;
					console.log("type", type);
					if (type == -2) {
						uni.reLaunch({
							url:'/pages/identity/index'
						})
					} else if (type == 0) {
						uni.reLaunch({
							url: '/pages/status/index'
						})
					} else if (type == 2) {
						uni.setStorageSync('userType', 2)
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else if (type == 3) {
						uni.setStorageSync('userType', 3)
						uni.reLaunch({
							url: '/pages/index01/index'
						})
					}
				})
			}
			uni.hideLoading()
		}
	}
</script>

<style>
</style>
