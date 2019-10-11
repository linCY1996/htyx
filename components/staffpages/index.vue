<template>
	<view class="baseSty">
		<view class="container999">
			<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
				<view class="title-sty">
					<view style="color: white;">个人中心</view>
				</view>
			</view>
		</view>
		<view class="Tops" style="height: 230px;background: url(https://www.mastervan.cn/static/project/dolphin/static/images/beijing06.png) no-repeat;background-size: cover;color: white;">
			<view>
				<view style="position: absolute;top:100px;left: 50px;display: flex;flex-direction: row;">
					<view v-on:tap="upHead(userMsg.headPictureUrl)" style="display: inline-block;width: 70px;height: 70px;border-radius: 35px;background: white;overflow: hidden;">
						<image :src="userMsg.headPictureUrl" style="width: 70px;height: 70px;" mode="aspectFit"></image>
					</view>
					<view style="font-size: 20px;margin-top: 8px;margin-left: 8px;">
						<text style="display: inline-block;width: 120px;">
							{{userMsg.name}}
						</text>

						<text style="text-align: right;font-size: 12px;border:1px solid #f0e53c;border-radius: 12px;padding-left:6px;padding-right:6px"
						 v-on:tap="showlv">上传履历+</text>

						<view style="margin-top: 6px;font-size: 12px;height: 20px;overflow: hidden;width: 210px;height: 40px;">
							<text>{{userMsg.address}}</text>
							<view>
								<text style="color: #f0e53c;font-size: 30rpx;">{{height}}CM</text>
								<text style="margin-left: 30rpx;color: #f0e53c;font-size: 30rpx;">{{width}}KG</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="TopPrice" style="width: 80%;border-top-right-radius: 20rpx;border-top-left-radius: 20rpx;margin: 0 auto;height: 48px;background-color: white;z-index: 999;">
				<view style="text-align: center;height: 44rpx;">
					<view style="display: inline-block;width: 70px;text-align: center;font-size:16px;color: #c9c9c9;margin-right: 80px;">{{userMsg.orderNum}}单</view>
					<view style="display: inline-block;width: 70px;text-align: center;font-size:16px;color: #c9c9c9">{{userMsg.price}}元</view>
				</view>
				<view style="text-align: center;">
					<view style="display: inline-block;width: 70px;text-align: center;font-size:16px;color: #c9c9c9;margin-right: 80px;">累计接单</view>
					<view style="display: inline-block;width: 70px;text-align: center;font-size:16px;color: #c9c9c9">累计收入</view>
				</view>
			</view>
		</view>
		<view class="NavMsgs" style="background-color: #eeeeee;">
			<view style="">
				<view style="border-bottom: 2px solid white;">
					<view style="padding-left: 5%;display: flex;align-items: center;">
						<image src="/static/photo.png" mode="widthFix" style="width: 44rpx;"></image>
						<view style="font-size: 18px">我的照片</view>
					</view>
					<scroll-view scroll-x style="margin: 10rpx 0">
						<view style="width: 90%; margin: 0 auto;display: flex;flex-direction: row;">
							<image :src="item" mode="" v-for="(item,index) in picsList" :key="index" style="width:30%;margin-right: 3.3%;border-radius: 10rpx;"
							 mode="widthFix" @tap="preivewImgs" :id="index"></image>
						</view>
					</scroll-view>
				</view>
				<view style="border-bottom: 2px solid white;">
					<view style="padding-left: 5%;display: flex;align-items: center;">
						<image src="/static/video.png" mode="widthFix" style="width: 44rpx;"></image>
						<view style="font-size: 18px">我的视频</view>
					</view>
					<scroll-view scroll-x style="margin: 10rpx 0">
						<view style="width: 90%;margin: 0 auto;display: flex;flex-direction: row;">
							<video :src="item" v-for="(item,index) in videoList" :key="index" controls style="z-index: 5;width:45%;margin-right: 5%;height: 240rpx;border-radius: 10rpx;">
							</video>
						</view>
					</scroll-view>
				</view>
			</view>
			<view style="display: flex;padding-left: 5%;align-items: center;">
				<image src="/static/order.png" mode="widthFix" style="width: 44rpx;"></image>
				<view style="font-size: 18px">订单状态</view>
			</view>
			<view style="width: 266px;margin: 0 auto">
				<scroll-view class='navTab' scroll-x="true" style="white-space: nowrap;overflow-y: hidden;">
					<!--  display: inline-block-->
					<view style="margin-right: 8px;font-size: 18px;" v-for="(item,index) in status" :key="index" class="navTabItem"
					 :class="index==navIndex?'navSelect':''" @click='navClick(index)'>{{item}}</view>
				</scroll-view>
			</view>
			<swiper style="margin: 0 auto;width: 96%;" :current="currentTab" @change="swiperTab">
				<swiper-item>
					<view :style="{'height': isHeight-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
						<view v-for="(item,index) in notStart" :key='index' v-if="item.orderName!=''" v-on:tap='orderMsg(item.oid)' style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
							<view style="font-size: 14px;font-weight: bold;">
								<text>{{item.orderName}}</text>
							</view>
							<view>
								<text>{{item.beginTime}}-{{item.afterTime}}</text>
							</view>
							<view>
								<text>{{item.address}}</text>
							</view>
							<view style="color: red;position: relative;top:-32px;left: 76%;font-size: 16px;">
								<text>审核中</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view :style="{'height': isHeight-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
						<view v-for="(item,index) in start" :key='index' v-on:tap='orderMsg(item.oid)' style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
							<view style="font-size: 14px;font-weight: bold;">
								<text>{{item.orderName}}</text>
							</view>
							<view>
								<text>{{item.beginTime}}-{{item.afterTime}}</text>
							</view>
							<view>
								<text>{{item.address}}</text>
							</view>
							<view style="color: red;position: relative;top:-32px;left: 76%;font-size: 16px;">
								<text>进行中</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view :style="{'height': isHeight-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
						<view v-for="(item,index) in end" :key='index' v-on:tap='orderMsg(item.oid)' style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
							<view style="font-size: 14px;font-weight: bold;">
								<text>{{item.orderName}}</text>
							</view>
							<view>
								<text>{{item.beginTime}}-{{item.afterTime}}</text>
							</view>
							<view>
								<text>{{item.address}}</text>
							</view>
							<view style="color: red;position: relative;top:-32px;left: 76%;font-size: 16px;">
								<text>已完成</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="position: absolute;bottom:40px;right:20px">
			<view style='width:40px;height:40px;background:url(https://www.mastervan.cn/static/project/dolphin/static/images/beijing12.png);background-size:100% 100%'
			 v-on:tap='callMe'>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				tabClick: 0,
				navIndex: '',
				status: ['审核中', '进行中', '已完成'],
				notStart: '',
				start: '',
				end: '',
				userMsg: '',
				aimg: '',
				date: '',
				uplv: false,
				cid: '',
				videoList: [],
				picsList: [],
				height: '',
				width: '',
			}
		},
		watch: {

		},
		onLoad(option) {
			uni.loadFontFace({
				family: 'Alibaba PuHuiTi',
				source: 'url("https://www.mastervan.cn/static/project/dolphin/static/font/alifont/AlibabaPuHuiTi-Light.ttf")',
				success: function() {
					console.log('load font success')
				},
				fail() {
					//console.log(456)
				}
			})

		},
		onReady() {
			//用户信息
			let openId = uni.getStorageSync('openid');
			let that = this;
			let orderList = []
			that.$http.getUserMsgs({
				openId: openId
			}).then(res => {
				let h = res.data.data.partTimeMessage.height
				let w = res.data.data.partTimeMessage.weight
				that.height = h
				that.width = w
				that.$http.findDetailUserMsgs({
					openId: openId,
					userId: res.data.data.userId
				}).then(res => {
					let picsList = res.data.data.photoUrlList
					let videoList = []
					videoList.push(res.data.data.videoUrl)
					if (res.data.data.dolphinVideoUrl != null) {
						videoList.push(res.data.data.dolphinVideoUrl)
					}
					if (res.data.data.dolphinPhotoList.length > 0) {
						picsList = picsList.concat(res.dada.data.dolphinPhotoList)
					}
					that.videoList = videoList
					console.log("videoList", that.videoList);
					that.picsList = picsList
				})
			})
			that.$http.partTimeMsgs({
				openId: openId
			}).then(res => {
				// console.log("userdetailMsgs=", res)
				that.userMsg = res.data.data
				uni.setStorageSync('cid', res.data.data.cid)
				var cid = res.data.data.cid;
				that.cid = cid;
				console.log("cid",cid);
				var set = setInterval(function() {
				that.$http.findOrderList({
					cid: cid,
					openId: openId
				}).then(res => {
					orderList = res.data.data
					that.$http.findOrderID({
						openId: openId
					}).then(res =>{
						var arr3 = res.data.data
						var allOid = []
						for(let i in arr3) {
							allOid.push(arr3[i].orderId)
						}
						for (var i = 0; i < orderList.length; i++) {
							let value = orderList[i].oid
							for (var j = 0; j < allOid.length; j++) {
								if(value == allOid[j]) {
									orderList.splice(i, 1)
									i = i-1
								}
							}
						}
						var st = JSON.stringify(orderList)
						if (orderList.length != 0) {
							clearInterval(set);
							uni.navigateTo({
								url: '/pages/competed/index?st=' + st
							})
						}
					})
				})
				}, 3000)
			})
			//审核中
			that.$http.findOrderMsgs({
				openId: openId,
				orderStart: 3
			}).then(res => {
				that.notStart = res.data.data
			})
		},
		computed: {
			isModel: function() {
				//console.log(this.$store.state.model)
				return this.$store.state.model;
			},
			isHeight: function() {
				return this.$store.state.windowHeight
			}
		},
		methods: {
			// 视频进入全屏显示
			findDetailUserMsg(e) {
				console.log("video=",e);
				console.log("123");
			},
			// 请求事件
			isRequest() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						uni.showToast({
							icon: 'success',
							title: '请求数据成功'
						})
						resolve()
					}, 1000)
				})
			}, 
			// 导航栏点击
			navClick(index) {
				this.currentTab = index //设置swiper的第几页
				this.tabClick = index //设置导航点击了哪一个
				this.navIndex = index;
				let _this = this;
				let openId = uni.getStorageSync('openid');

				if (index == 1) {
					//进行中
					_this.$http.findOrderMsgs({
						openId: openId,
						orderStart: 2
					}).then(res => {
						_this.start = res.data.data
					})
				} else if (index == 2) {
					//已完成
					_this.$http.findOrderMsgs({
						openId: openId,
						orderStart: 4
					}).then(res => {
						_this.end = res.data.data
					})

				} else if (index == 0) {
					//审核中
					_this.$http.findOrderMsgs({
						openId: openId,
						orderStart: 3
					}).then(res => {
						_this.notStart = res.data.data
					})
				}
			},
			// swiper 滑动
			swiperTab: function(e) {
				//console.log(e)
				var index = e.detail.current //获取索引
				this.navClick(index)
			},
			lower1() {
				//console.log(`加载${this.currentTab}`)
				uni.showLoading({
					content: '加载中'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 1000)
			},
			upHead: function(e) {
				this.$store.commit('setQiangSt', true);
				uni.navigateTo({
					url: '/pages/upHead/index?pic=' + e
				})
			},
			upAimg: function() {
				let _this = this;
				//console.log(123)
				this.$store.commit('setQiangSt', true);
				uni.chooseImage({
					count: 3,
					success: (chooseImageRes) => {
						console.log(chooseImageRes)
						let tempFilePaths = chooseImageRes.tempFilePaths;
						_this.aimg = tempFilePaths
					}
				});
			},
			upLvli: function(e) {
				let _this = this;
				let openId = uni.getStorageSync('openid');
				// console.log(e.detail.value)
				e.detail.value.activityBeginTime = this.date;
				e.detail.value.openId = openId;

				if (e.detail.value.activityBeginTime == null || this.date == '' || this.aimg == '') {
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
						var uuid = res.data.data
						for (var i = 0; i <= _this.aimg.length; i++) {
							uni.uploadFile({
								url: _this.$store.state.baseurl + '/record/fileUpload',
								filePath: _this.aimg[i],
								name: 'file',
								formData: {
									uuid: uuid,
									openId: e.detail.value.openId
								},
								success: (res) => {
									console.log(res)
									_this.$store.commit('setQiangSt', false)
									setTimeout(function() {
										_this.uplv = false
										uni.reLaunch({
											url: '/pages/index01/index'
										})
									}, 1000)
								},
								fail() {
									uni.showToast({
										title: '上传失败'
									})
								}
							});
						}
						_this.notStart = res.data.data
						//console.log( _this.notStart)
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			showlv: function() {
				uni.navigateTo({
					url: '/pages/uploadCareer/uploadCareer'
				})
			},
			showMessage: function() {
				uni.navigateTo({
					url: '/pages/userInfo/userInfo'
				})
			},
			closeLvli: function() {
				this.uplv = false;
				this.$store.commit('setQiangSt', false)
				let upLv = this.$store.getters.isSt;
			},
			callMe: function() {
				uni.makePhoneCall({
					phoneNumber: '18628188261'
				});
			},
			orderMsg: function(oid) {
				uni.navigateTo({
					url: '/pages/staffOrderMsg/index?oid=' + oid
				})
			},
			// 预览图片
			preivewImgs(res) {
				console.log("res", res);
				let Imgsindex = res.currentTarget.id;  
				uni.previewImage({
					urls:this.picsList,
					current:Imgsindex
				})
			}
		}
	}
</script>

<style>
	.nav {
		position: fixed;
		left: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-repeat: no-repeat;
		background-size: cover;
		z-index: 998;
	}
	.Tops {
		position: relative;
	}
	.TopPrice {
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.title-sty {
		font-size: 18px;
		font-weight: 600;
		color: black;
		letter-spacing: 4px;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
	}

	.baseSty {
		width: 100%;
		font-family: 'Alibaba PuHuiTi';
		height: auto;
	}

	.baseSty::-webkit-scrollbar {
		display: none;
	}

	.paddingTop01 {
		padding-top: 30px;
	}

	.paddingTop02 {
		padding-top: 50px;
	}

	.ctrlSty {
		margin-top: 30px;
	}

	.navTabItem {
		width: 80px;
		height: 44px;
		display: inline-block;
		text-align: center;
		line-height: 48px;
		color: #c9c9c9;
		font-size: 20px;
		margin-bottom: 18px;
	}

	.navSelect {
		border-bottom: 3px solid #f0e53c;
		color: black;
	}
</style>
