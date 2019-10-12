<template>
	<view class="content">

	</view>
</template>

<script>
	export default {
		// mounted() {
		// 	console.log("main");
		// 	uni.showLoading({ 
		// 		title: '加载中',
		// 		mask: false
		// 	});
		// 	var that = this;
		// 	// 判断用户是否注册,已注册用   
		// 	let openid = uni.getStorageSync('openid')
		// 	console.log("openid====", openid);
		// 	if (openid == '') {
		// 		console.log("hereMain");
		// 		uni.reLaunch({
		// 			url: '/pages/login/index',
		// 			success() {
		// 				uni.hideLoading()
		// 			}
		// 		})
		// 	} else {
		// 		that.$http.changeLogin({
		// 			openId: openid
		// 		}).then(res => {
		// 			uni.hideLoading()
		// 			let type = res.data.data;
		// 			console.log("type", type);
		// 			if (type == -1 || type == -2) {
		// 				uni.reLaunch({
		// 					url: '/pages/identity/index'
		// 				})
		// 			} else if (type == 0) {
		// 				uni.reLaunch({
		// 					url: '/pages/status/index'
		// 				})
		// 			} else if (type == 2) {
		// 				uni.setStorageSync('userType', 2)
		// 				uni.reLaunch({
		// 					url: '/pages/index/index'
		// 				})
		// 			} else if (type == 3) {
		// 				uni.setStorageSync('userType', 3)
		// 				uni.reLaunch({
		// 					url: '/pages/index01/index'
		// 				})
		// 			}
		// 		})
		// 	}
		// }
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
</style>
