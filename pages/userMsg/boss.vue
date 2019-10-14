<template>
	<view class="" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/beijing02.png) no-repeat;background-size: cover;height: 700px;width: 100%;padding-top: 2%;font-family: Alibaba PuHuiTi;">
		<my-header></my-header>
		<form @submit="submitData">
			<view class="normal-color" style="height: 110px;overflow: hidden;">
				<view class="" style="width: 80px;height: 80px;margin: 0 auto;border: 1px solid #9D9D9D;border-radius: 160upx;background-color: white;overflow: hidden">
					<image style="width: 80px;height: 80px;" :src="avatar" mode="aspectFit"></image>
				</view> 
			</view>
			<view class="normal-color" style="margin-left: 10%;margin-right: 10%;">
				<view class="setFlex title-base">
					<view style="flex-grow: 1;">公司名称</view>
				</view>
				<view class="setFlex title-base">
					<view style="flex-grow: 1;">
						<input class="inputShadow" type="text" name='userName' maxlength="100" value="" />
					</view>
				</view>

				<view class="setFlex title-base">
					<view class="">
						<view class="" style="width: 100px;">对接人姓名</view>
					</view>
					<view class="">
						<view class="" style="width: 28px;"></view>
					</view>
					<view class="">对接人电话</view>
				</view>
				<view class="setFlex title-base">
					<view class="" style="width: 100px;">
						<input class="inputShadow" type="text" name='jointName' value="" maxlength="10" style="width: 100px;" />
					</view>
					<view class="">
						<view class="" style="width: 28px;"></view>
					</view>
					<view class="" style="flex-grow: 1;">
						<input class="inputShadow" type="number" name='phone' maxlength="11" value="" />
					</view>
				</view>

				<view class="setFlex title-base">
					<view class="" style="flex-grow: 1;">
						公司地址
					</view>
				</view>
				<view class="setFlex title-base">
					<picker mode="region" @change="bossArea" style="display: block;width: 100%;text-align: center;line-height: 30px;"
					 class="inputShadow">
						<view v-if="city[1]==''&&city[2]==''">
							{{city[0]}}<text class="iconfont icon-xiasanjiaoxing"></text>
						</view>
						<view v-if="city[1]!=''&&city[2]!=''">
							{{city[0]}}-{{city[1]}}-{{city[2]}}
						</view>
					</picker>
				</view>
				<view class="setFlex title-base">
					<view class="" style="flex-grow: 1;">
						<input type="text" name='address' placeholder="详细地址" maxlength="200" placeholder-style="color: #cccccc" value=""
						 style="background-color:#f3f3f3;padding-left: 10px;height: 30px;border-radius: 6px" />
					</view>
				</view>
				<view class="setFlex title-base" style="display: block;width: 100%;text-align: center;">营业执照上传</view>
				<view class="setFlex title-base">
					<view class="inputBorder uplicense">+</view>
				</view>
				<view class="setFlex title-base" style="width: 100%;position: relative;top:-180px;" v-on:tap="upLicense">
					<image :src="License" style="height: 160px;" mode="aspectFit"></image>
				</view>

				<view class="setFlex title-base" style="width: 100px;margin: 0 auto;position: relative;top:-160px">
					<button form-type="submit" style="width: 100px;height: 34px;color: white;font-size: 15px;background-color: rgb(45,70,226);line-height: 34px;">就这样</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city: ['选择地址', '', ''],
				bossarea: '',
				avatar: '',
				upAvatar: false,
				License: '',
				uplicense: false,
				submitUrl: this.$store.state.baseurl + '/user/insertUser'
			}
		},
		onLoad(option) {
			let _this = this;
			// 判断用户是否注册,已注册用户类型 
			let openid = uni.getStorageSync('openid')
			_this.$http.changeLogin({
				openId: openid
			}).then(res => {
				let type = res.data.data;
				console.log("type", type);
				if (type == 2) {
					uni.setStorageSync('userType', 2)
					uni.reLaunch({
						url: '../index/index'
					})
				} else if (type == 3) {
					uni.setStorageSync('userType', 3)
					uni.reLaunch({
						url: '../index01/index'
					})
				}
			})
			uni.loadFontFace({
				family: 'Alibaba PuHuiTi',
				source: 'url("https://www.mastervan.cn/static/project/dolphin/static/font/alifont/AlibabaPuHuiTi-Light.ttf")',
				success: function() {
					console.log('load font success')
				},
				fail() {
				}
			})
			this.avatar = uni.getStorageSync('headpic') 
		},
		methods: {
			bossArea: function(e) {
				this.city = '';
				this.city = e.detail.value
			},
			changHeadpic: function() {
				uni.navigateTo({
					url: '/pages/upHead/index?status=' + 0
				})
			},
			upLicense: function() {
				var that = this;
				wx.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9   
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					success: function(res) {
						let avatar = res.tempFilePaths;
						that.License = avatar;
						that.uplicense = true; 
					},
				})
			},
			submitData: function(e) {
				let _this = this;
				let openid = uni.getStorageSync('openid');
				if (e.detail.value.address != '' && e.detail.value.address != undefined) {
					e.detail.value.address = this.city[0] + this.city[1] + this.city[2] + e.detail.value.address;
				} else {
					e.detail.value.address = this.city[0] + this.city[1] + this.city[2];
				}
				e.detail.value.openId = openid;
				e.detail.value.roleType = 2;
				console.log("e=====", e);
				if(!_this.util.phoneNumber(e.detail.value.phone)) {
					return
				}
				if (e.detail.value.userName == '' || e.detail.value.jointName == '' || e.detail.value.address == '' || this.uplicense ==
					false) {
					uni.showModal({
						title: '提示',
						content: '请输入完整信息'
					})
					return false
				}
				uni.showLoading();
				uni.uploadFile({
					url: _this.$store.state.baseurl + '/user/fileUpload',
					filePath: _this.avatar,
					name: 'headUrl',
					formData: {
						openId: openid
					},
					method: 'POST',
					header: {
						"Content-Type": "multipart/form-data"
					},
					success: (res) => {
						
					},
					fail() {
						uni.hideLoading()
					}
				});
				uni.uploadFile({
					url: _this.$store.state.baseurl + '/user/insertUser',
					filePath: _this.License[0],
					name: 'file',
					formData: e.detail.value,
					method: 'POST',
					header: {
						"Content-Type": "multipart/form-data"
					},
					success: (res) => {
						//openId、或SessionKdy存储//隐藏loading
						uni.hideLoading();
						// uni.navigateTo({//信息更新成功后跳转到小程序首页
						//     url: '/pages/identity/index'
						// });
						uni.reLaunch({
							url: '/pages/status/index'
						})
					},
					fail() {
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>
	.normal-color {
		font-size: 16px;
		color: #cccccc;
	}

	.setFlex {
		display: flex;
	}

	.inputShadow {
		padding-left: 10px;
		height: 30px;
		border-radius: 6px;
		border: 1px solid #9D9D9D;
	}

	.inputBorder {
		border: 2px dashed #b4b4b4;
	}

	.title-base {
		margin-bottom: 18px;
	}

	.uplicense {
		width: 100%;
		height: 160px;
		font-size: 80px;
		text-align: center;
		line-height: 150px;
	}


	@font-face {
		font-family: "iconfont";
		src: url('https://www.mastervan.cn/static/font/iconfont.eot?t=1562922258628');
		/* IE9 */
		src: url('https://www.mastervan.cn/static/font/iconfont.eot?t=1562922258628#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAREAAsAAAAACNwAAAP2AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDKgqEbIN/ATYCJAMUCwwABCAFhG0HYBubB8gekoSigEIqAEgAODKUz5db9SuCVLA2z6gKUoE0+kJaT+NKM3py1b0uPNCf+v5UCSYUynkXdZ+XegWMFrzKG7y/UXZmff3P5fTuKvH5rbbT2psH9QKMAwporE29SAokMG8Yu7zIw0AAVL66yNC971CYCPRRBEDOqtcJU8JAqCgnTAhDwcIMMqMwxdncNQALve+THxoHE8ARE/SJA7fdPOj4bPbazE9K3CwcBMLhbADYMoAH1AUIQI6FDg8+SNTFo3KuoCXAZPTj4EOzZ5ePmxMN4TuLtsKvdFDo+sfjCEAqdIUFEjrKhSMTWjTg4UNnGhD40IUGHHzcLHooChENp4B0wBHAc0CoWmpmJCK62uLeUZBb22zOc9oD9vKk0gnrdtViy+dmeLfuaT4ue+eITbur2Q/ura3E5qSqUcuc2OQKyTp3Y8aIVdkxSuObSHNrLV+TOTR+SKEkFpuzDKhNnLRckkCcW5FBpGGTY6Msc7Zkj155ghbvMndz1qg1tZZtwv343JM5K7OleGYwevIJOnHOlslb526etMlKNnTPSVdiK0/s2EMmP5TmXr5+OK3i6M2r8KL7k4Z6lnVtVG+67V5LI68tbnV3tnoTHzl23P/V/3bZyFLO1QplneX+7MhZvwulI0eN+gH2fJPnXdpknGWbZRwo1a/TdMew3dsdd5NZd+Vx7eBOXH+ldkqHTp3FWda4oXOnQmknNxG3zjJ0SvT9VOZL3tazc//QsOyaFRvXtPVo0qV/8fTP9hT7ig6b7cbTf08b7Zs7yNNWygE9eVbVmVVLqpaOSS7FPP/9SGApSbN0fpX16J/vioRYzhJ0rYkluZ5I6DxjaVIJSgFA4nSakwi3FQD4DbfJNXMPf4XfwLbu+WOCve1/JkkAADzuH0qGvsQZzZR4n8LGwhcvbFgnKGLdKGap2hJIxaISZriF5aAo4IVngGQvhlGlNS4FCJO0CDhGecAzqYoKhLogkjQFA5MOQNXRY7kkhYZHshlAbdMBEA47gWNzEngO11GB8BxE6b6DgSPwQA0PKRtKqgeVdtGYU2ce2VUmq+5wSDHNOvXLBzNvUcCpxcUecTjTompYblS/YTrdg4WYNsSUaLG3sa4rsqKFg3J3cBwLBMJyRAsXMrde36frkdYNGihFL6rvDgdBdaFhnHSMh8yljEzlFhaiOM11NPP5wRivIgFOWkVNmXs4RhOlti9rpL6GDdAeilCjmkt5JqqYV2M6nUKm0IQFyboDGxMwEmGySHG/Qoybrj5fh1hEaw1QI6Wpov70quA9bgGg9I3EwBGeCEQkBtguqjPqDBU6rOFSNeR1RH3OylQXkzdcVFLk9jEjz4d6AAAA') format('woff2'),
			url('https://www.mastervan.cn/static/font/iconfont.woff?t=1562922258628') format('woff'),
			url('https://www.mastervan.cn/static/font/iconfont.ttf?t=1562922258628') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('https://www.mastervan.cn/static/font/iconfont.svg?t=1562922258628#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-xiasanjiaoxing:before {
		content: "\e642";
	}

	.icon-shangsanjiaoxing:before {
		content: "\e643";
	}

	.icon-gouwuche:before {
		content: "\e635";
	}

	.icon-xinxing:before {
		content: "\e7a9";
	}
</style>
