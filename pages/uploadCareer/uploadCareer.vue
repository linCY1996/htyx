<template>
	<view class="baseSty" :style="{'height':Height+'px'}">
		<view class='nav'>
			<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
			<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
				<view class="title-sty" style="display: flex;flex-direction: row;">

					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;"
						 mode=""></image>
					</view>
					<view style="flex-grow: 8;">履历上传</view>
					<view style="flex-grow: 2;"></view>
				</view>
			</view>
		</view>
		<view class="form">
			<form @submit="uploadLvli">
				<view class="section">
					<text>*</text>
					<view class="section__title">活动名称:</view>
					<input name="activityName" />
				</view>
				<view class="section">
					<text>*</text>
					<view class="section__title">活动时间:</view>
					<picker mode="date" :range="actTime" name='activityBeginTime' @change="chooseTime">
						<view v-if="actTime==''">点击选择</view>
						<view v-else>{{actTime}}</view>
					</picker>
				</view>
				<view class="uploadPics">
					<view class="div80">
						<view class="uploadIcon" @click="uploadImages">
							<image src="../../static/camera.png" mode="widthFix" id="camera"></image>
							<view>点击上传</view>
						</view>
						<view class="uploadIcon" v-for="(item,index) in uploadPics" :key='index' @click="changeImages(index)">
							<image :src="item" mode="widthFix"></image>
						</view>

					</view>
					<view class="btn">
						<button formType="submit">确认上传</button>
					</view>


				</view>
			</form>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Height: '',
				stateBarHeight: '',
				uploadPics: ['', '', ''],
				actTime: [],
				canChange: false
			}
		},
		onReady() {
			this.Height = this.$store.state.windowHeight
			this.stateBarHeight = this.$store.state.statusBarHeight
		},
		methods: {
			goback: function() {
				uni.navigateBack({})
			},
			chooseTime: function(e) {
				this.actTime = e.detail.value
			},
			uploadImages: function(index) {
				let _this = this;
				this.$store.commit('setQiangSt', true);
				uni.chooseImage({
					count: 3,
					success: (chooseImageRes) => {
						_this.canChange = true
						let tempFilePaths = chooseImageRes.tempFilePaths;
						if (tempFilePaths.length === 1) {
							_this.uploadPics = tempFilePaths.concat('', '')
						} else if (tempFilePaths.length === 2) {
							_this.uploadPics = tempFilePaths.concat('')
						} else {
							_this.uploadPics = tempFilePaths
						}
					}
				});
			},
			changeImages: function(index) {
				let _this = this;
				if (_this.canChange == true) {
					uni.chooseImage({
						count: 1,
						success: (chooseImageRes) => {
							let tempFilePaths = chooseImageRes.tempFilePaths;
							let arr = _this.uploadPics
							arr.splice(index, 1, tempFilePaths[0])
						}
					});
				}
			},
			uploadLvli: function(e) {
				let _this = this;
				let openId = uni.getStorageSync('openid');
				e.detail.value.openId = openId;
				if (e.detail.value.activityBeginTime == '' || e.detail.value.activityName == '' || _this.uploadPics[0] == '') {
					uni.showModal({
						title: '提示',
						content: '请填写完整信息'
					})
					return false
				}
				uni.request({
					url: _this.$store.state.baseurl + '/record/create',
					data: e.detail.value,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log("create", res);
						var uuid = res.data.data
						var imgList = []
						_this.uploadPics.forEach(function(item, i) {
							if (item != '') {
								imgList.push(item)
							}
						})
						if(res.data.data == -1) {
							uni.showModal({
								title: '提交履历失败',
								content: '您已经上传过此次活动的履历',
								success: res => {},
							});
						} else {
							uni.showLoading({
								title: '正在上传',
								mask: true
							})
							for (var i = 0; i < imgList.length; i++) {
								uni.uploadFile({
									url: _this.$store.state.baseurl + '/record/fileUpload',
									filePath: imgList[i],
									name: 'file',
									formData: {
										uuid: uuid,
										openId: e.detail.value.openId
									},
									success: (res) => {
										var resp = JSON.parse(res.data)
										if (i == imgList.length) {
											uni.hideLoading()
											uni.showToast({
												title: '上传成功',
												duration: 2000,
												icon: 'none'
											})
											setTimeout(function(){
												uni.reLaunch({
													url:'/pages/index01/index'
												})
											},2000)
										}
										if(resp.data == 1) {
											i += 1
										}
									},
									fail: (res) => {
										uni.showToast({
											title: '上传失败',
											duration: 3000,
											icon: 'none'
										})
									}
								});
							}
						}
					}
				})
			},
		}
	}
</script>

<style>
	.section {
		width: 94%;
		height: 60rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 16rpx;
		background: #DDDDDD;
		border-radius: 10rpx;
		color: #aaa8a9;
		line-height: 60rpx;
		font-size: 32rpx;

	}

	.div80 {
		width: 90%;
		height: 70%;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		margin: 0 auto;
		margin-top: 2%;
	}

	.btn {
		width: 90%;
		height: 25%;
		margin: 0 auto
	}

	.btn button {
		width: 150rpx;
		height: 50rpx;
		font-size: 24rpx;
		float: right;
		line-height: 50rpx;
		padding: 0;
		border-radius: 60rpx;
		background: #35a7ff;
		color: white;

	}

	button::after {
		border: none;
	}

	.form {
		letter-spacing: 4rpx;
	}

	.section__title {
		width: 26%;
	}

	.section text {
		width: 4%;
		color: #DD524D;
		text-align: right;
	}

	.uploadPics {
		width: 100%;
		height: 250rpx;
		margin-top: 32rpx;
		border: 1px solid #DDDDDD;
	}

	.section input {
		width: 70% !important;
		height: 100%;
	}

	.uploadIcon {
		width: 150rpx;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #DDDDDD;
		flex-wrap: wrap;
	}

	.uploadIcon view {
		font-size: 24rpx;
		color: #aaa8a9;
		margin-top: -30%;
	}

	.uploadIcon image {
		width: 100%;
		height: 100%;
	}

	#camera {
		width: 85rpx;
		height: 85rpx;
	}

	.title-sty {
		font-size: 18px;
		font-weight: 600;
		color: black;
		letter-spacing: 4px;
		text-align: center;
		margin: 0 auto;
		height: 88rpx;
		position: fixed;
		z-index: 999;
		width: 100%;
		background-color: #ffffff;
	}

	.title-sty view {
		line-height: 88rpx;
	}

	.whiteBlock1 {
		height: 132rpx;
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		z-index: 999;

	}

	.whiteBlock2 {
		height: 88rpx;
		background: #FFFFFF;
		width: 100%;
		padding-top: 132rpx;
	}
</style>
