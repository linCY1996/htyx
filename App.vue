<script>
	export default {
		onLaunch: function() {
			// 监听网络状态变化
			uni.onNetworkStatusChange(function(res) {
				console.log("resContent=", res);
				if (res.isConnected == false) {
					uni.showToast({
						title: '网络异常，请检查网络',
						icon: 'none',
						duration: 3000
					});
				}
			})
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log("版本", res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function(res) {
				console.log("新版本下载失败");
				uni.showModal({
					title: '新版本下载失败',
					content: '请检查自己的网络是否正常',
					success: res => {},
				});
			});
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide');
		},
		created() {
			console.log("App Create");
			uni.showLoading({
				title: '加载中',
				mask: true,
			});
			let _this = this;
			// 判断用户是否注册,已注册用户类型   
			let openid = uni.getStorageSync('openid')
			console.log("openid", openid);
			if (openid == '' || openid == null) { 
				console.log("here====");
				uni.redirectTo({
					url: '/pages/login/index',
					success() {
						uni.hideLoading()
					}
				})
			} else {
				_this.$http.changeLogin({
					openId: openid
				}).then(res => {
					uni.hideLoading()
					let type = res.data.data;
					console.log("type", type);
					if (type == -1 || type == -2) {
						uni.reLaunch({
							url: '/pages/identity/index'
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
			this.setHeight();
			this.getHeight();
			this.getWidth();
			this.statusBarHeight();
		},
		methods: {
			setHeight: function() {
				let _this = this;
				uni.getSystemInfo({
					success: function(res) {
						_this.$store.commit('setModel', res.model)
						//console.log(_this.$store.state.model)
					}
				})
			},
			statusBarHeight: function() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.$store.commit('statusBarHeight', res.statusBarHeight)
					}
				})
				//console.log(_this.$store.state.windowHeight)
			},
			getHeight: function() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.$store.commit('windowHeight', res.windowHeight)
					}
				})
				//console.log(_this.$store.state.windowHeight)
			},
			getWidth: function() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						//console.log(res.windowWidth)
						_this.$store.commit('windowwidth', res.windowWidth)
					}
				})
				//console.log(_this.$store.state.windowWidth)
			}
		}
	}
</script>

<style>
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

	/*每个页面公共css */
</style>
