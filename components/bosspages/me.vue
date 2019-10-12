<template>
	<view class="baseSty" :style="{'height':isHeight+'px'}">
		<view class="container999" style="z-index:999">
			<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
				<view class="title-sty">
					<view style="color: white;">个人中心</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 200px;background: url(https://www.mastervan.cn/static/project/dolphin/static/images/beijing06.png) no-repeat;background-size: cover;">
		</view>
		<view style="background: white;width: 100%;height: 140px;border-radius: 12px 12px 0 0;box-shadow: 0 0 4px #CCCCCC;margin-top: -50px;">
			<view style="position: relative;top:-40px">
				<view v-on:tap="upHead(userMsg.headPhotoUrl)" style='width: 100px;height: 80px;background: white;margin:0 auto'>
					<image style="width: 100px;height: 80px;" :src="userMsg.headPhotoUrl" mode="aspectFill"></image>
				</view>
				<view style="font-size: 18px;">
					<text>{{userMsg.userName}}</text>
				</view>
				<view style="font-size: 12px;color: #cdcdcd;">
					<text>{{userMsg.address}}</text>
				</view>
				<view style="color: #959595;display: flex;flex-direction: row;justify-content: center;font-size: 16px;font-weight: bold;margin-top: 10px;">
					<view style="margin-right: 30px;">
						<text v-on:tap="guanList()">我的关注</text>
					</view>
					<view>|</view>
					<view style="margin-left: 30px;">
						<text v-on:tap="showTel">联系我们</text>
					</view>
				</view>
			</view>
		</view>


		<view v-show="isShow" style="width: 100%;box-shadow: 0 0 4px #CCCCCC;position: absolute;top:0px;padding-top: 40px;background: white;z-index: 9999;">
			<view style="width: 30px;height: 30px;background: url(https://www.mastervan.cn/static/project/dolphin/static/images/close.png) no-repeat;background-size: 100% 100%;"
			 v-on:tap="closeGuan">

			</view>
			<scroll-view scroll-y='true' :style="{'height': isHeight-70+'px'}" style="z-index: 999;">
				<view v-for="(item,index) in guan" :key='index'>
					<view style="display: flex;flex-direction: row;justify-content: center;border-bottom: 1px solid #CCCCCC;"
					 v-on:tap.stop="toOrder(item.byArUserId)">
						<view style="flex-grow: 1;">
							<image :src="item.photoUrl[0]" style="width: 30px;height: 30px;border-radius: 15px;" mode="aspectFit"></image>
						</view>
						<view style="font-size: 10px;flex-grow: 5;line-height: 30px;text-align: left;">
							<text>{{item.userName[0]}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="" style="background-color: #eeeeee;">
			<view style="display: flex;padding-left: 5%;height: 72rpx;border-bottom: 1px solid white;align-items: center;background: linear-gradient(180deg,#ffffff,#eeeeee);">
				<image src="/static/order.png" mode="widthFix" style="width: 48rpx;"></image>
				<view>订单状态</view>
			</view>
			<view style="width: 266px;margin: 0 auto">
				<scroll-view class='navTab' scroll-x="true" style="white-space: nowrap;overflow-y: hidden;">
					<!--  display: inline-block-->
					<view style="margin-right: 8px;font-size: 18px;" v-for="(item,index) in status" :key="index" class="navTabItem"
					 :class="index==navIndex?'navSelect':''" @click='navClick(index)'>{{item}}</view>
				</scroll-view>
			</view>

			<swiper :style="{'height': isH-308+'px'}" style="margin: 0 auto;width: 96%;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(item,index) in dataList" :key="index">
					<scroll-view style="height: 100%;">
						<view v-if="currentTab==0" :style="{'height': isH-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
							<view v-for="(item,index) in notStart" :key='index' v-if="item.activityName!=''" v-on:tap='orderMsg(item.oid)'
							 style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
								<view style="font-size: 14px;font-weight: bold;">
									<text>{{item.activityName}}</text>
								</view>
								<view>
									<text>{{item.activityBeginTime}}-{{item.activityAfterTime}}</text>
								</view>
								<view>
									<text>{{item.activityAddress}}</text>
								</view>
								<view style="color: red;position: relative;top:-32px;left: 76%;font-size: 16px;">
									<text>审核中</text>
								</view>
							</view>
						</view>
						<view v-if="currentTab==1" :style="{'height': isH-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
							<view v-for="(item,index) in start" :key='index' v-if="item.activityName!=''" v-on:tap='orderMsg(item.oid)'
							 style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
								<view style="font-size: 14px;font-weight: bold;">
									<text>{{item.activityName}}</text>
								</view>
								<view>
									<text>{{item.activityBeginTime}}-{{item.activityAfterTime}}</text>
								</view>
								<view>
									<text>{{item.activityAddress}}</text>
								</view>
								<view style="color: red;position: relative;top:-32px;left: 76%;font-size: 16px;">
									<text>进行中</text>
								</view>
							</view>
						</view>
						<view v-if="currentTab==2" :style="{'height': isH-308+'px'}" style="overflow-y: scroll;overflow-x: hidden;">
							<view v-for="(item,index) in end" :key='index' v-if="item.activityName!=''" v-on:tap='orderMsg(item.orderMessage.oid)'
							 style="width: 100%;height: 60px;background: white;font-size: 10px;text-align: left;padding-left: 20px;padding-top: 8px;margin-bottom: 10px;box-shadow: 0 0 4px #CCCCCC;">
								<view style="font-size: 14px;font-weight: bold;">
									<text>{{item.orderMessage.activityName}}</text>
								</view>
								<view>
									<text>{{item.orderMessage.activityBeginTime}}-{{item.orderMessage.activityAfterTime}}</text>
								</view>
								<view>
									<text>{{item.orderMessage.activityAddress}}</text>
								</view>
								<view style="color: red;position: relative;top:-32px;left: 66%;font-size: 16px;">
									<text style="margin-right: 10px;" v-on:tap.stop="showPing(index)">评价</text>
									<text>已完成</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- 评价弹窗 -->
			<!-- <view v-show="showOrder" style="position: absolute;top:290px;border-radius: 8px;width: 100%;background-color: white;box-shadow: 0 0 4px #CCCCCC;">
				<view style="display: flex;flex-direction: row;justify-content: flex-start;" v-on:tap="showOrder=false">
					<image src="https://www.mastervan.cn/static/project/dolphin/static/images/close.png" style="width: 30px;height: 30px;"
					 mode="aspectFit"></image>
					<text style="margin-left: 38%;margin-top: 4px;">{{oneOrder.orderMessage.activityName}}</text>
				</view>
				<view style="margin-top: 8px;">
					<scroll-view scroll-x="true">
						<view style="display: flex;flex-direction: row;flex-wrap: wrap;padding-left:10px" :style="{'width':isWidth*oneOrderLength+'px'}">
							<view v-for="(item,index) in oneOrder.list" :key='index'>
								<view style="width: 110px;border-radius: 6px;height: 150px;box-shadow: 0 0 4px #333333;margin-bottom:10px;margin-right: 10px;overflow: hidden;">
									<image style="width: 110px;height: 110px;" :src="item.photoUrl" mode="aspectFill"></image>
									<view style="position: relative;top:-26px;z-index: 999;">
										<view style="font-size: 12px;color: white;margin-bottom: 4px;">{{item.ctypeName}}</view>
										<view style="font-size: 14px;color: #333333;font-weight: bold;">{{item.userName}}</view>
										<view style="font-size: 14px;" v-on:tap="upStaff(item.userId,oneOrder.orderMessage.oid,item.userName,item.cid)">评价</view>
									</view>
									<view style="width: 110px;height: 40px;background: white;position: absolute;top:110px;border-radius: 0 0 6px 6px;"></view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view style="font-size: 10px;text-align: left;padding-left:10px">
						<view>
							<text>活动名称:{{oneOrder.orderMessage.activityName}}</text>
						</view>
						<view>
							<text>
								活动地址:{{oneOrder.orderMessage.activityAddress}}
							</text>
						</view>
						<view>
							<text>活动时间:{{oneOrder.orderMessage.activityBeginTime}}-{{oneOrder.orderMessage.activityAfterTime}}</text>
						</view>
					</view>
					<view style="margin-top: 20px;">
						<button type="primary" style="background: #f2e44b;color: white;width: 100%;height: 40px;line-height: 40px;"
						 v-on:tap="upAct(oneOrder.userId,oneOrder.orderMessage.oid,oneOrder.userName,oneOrder.cid)">活动评价</button>
					</view>
				</view>
			</view> -->

			<!-- 评价弹窗 -->
			<view class="mengban" v-show="showOrder" @tap="hideCommand"></view>
			<view class="Command" v-show="showOrder">
				<view class="Command_Name">{{oneOrder.orderMessage.activityName}}</view>
				<scroll-view scroll-x="true" class="command_User">
					<block>
						<view class="Command_Nav">
							<view class="command_User_Ch" v-for="(item,index) in oneOrder.list" :key='index'>
								<view class="command_Imgs">
									<image :src="item.photoUrl" mode=""></image>
								</view>
								<view class="command_UserMsgs">
									<text>{{item.ctypeName}}</text>
									<text>{{item.userName}}</text>
								</view>
								<view class="command_Ones_User" @tap="upStaff(item.userId,oneOrder.orderMessage.oid,item.userName,item.cid)">评价</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<view class="activityName">活动名称：{{oneOrder.orderMessage.activityName}}</view>
				<view class="activityAddress">活动地址：{{oneOrder.orderMessage.activityAddress}}</view>
				<view class="activityTime">活动时间：{{oneOrder.orderMessage.activityBeginTime}}-{{oneOrder.orderMessage.activityAfterTime}}</view>
				<view class="BtnCommand" @tap="upAct(oneOrder.userId,oneOrder.orderMessage.oid,oneOrder.userName,oneOrder.cid)">活动评价</view>
				<view class="BtnHide" @tap="hideCommand">点击关闭</view>
			</view>
			<!-- 对活动、人员评价 -->
			<view v-show="showUp" class="command_Activity">
				<view class="command_ATitle" v-if="userName!=''">对{{userName}}评价</view>
				<view class="command_ATitle" v-if="userName==''">对本次活动评价</view>
				<view class="command_ACommands">
					<text>填写评价:</text>
					<textarea value="" v-model="pingjia" placeholder="添加评价..." />
				</view>
				<view class="command_AImgs">     
					<text>活动照片:</text>
					<view class="command_AUpImgs" @tap="upAimg">
					<image v-if="aimg==''" src="../../static/addImgs.png" mode="aspectFit"></image>
					<image v-if="aimg!=''" :src="aimg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="user_Show_Label">
					<view v-if="tag!=''&&tag!=undefined" v-for="(istag,tagIndex) in tag" :key='tagIndex'>
						<view class="User_Lable" @tap="getTag(istag.elId)" :style="{'background-color':tagColor[tagIndex]}">{{istag.elName}}</view>
					</view>
				</view>
				<view class="BtnCommand" @tap="upOne()">确定提交</view>
				<view class="BtnHide" @tap="hideCommandDetail">点击关闭</view>
			</view>






			<!-- <view v-show="showUp" style="position: fixed;bottom: 0px;z-index: 9999;font-size: 12px;box-shadow: 0 0 4px #CCCCCC;width: 100%;background: white;">
				<view style="display: flex;flex-direction: row;justify-content: flex-start;" v-on:tap="showUp=false">
					<image src="https://www.mastervan.cn/static/project/dolphin/static/images/close.png" style="width: 30px;height: 30px;"
					 mode="aspectFit"></image>
				</view>
				<view v-if="userName!=''">对{{userName}}评价</view>
				<view v-if="userName==''">对本次活动评价</view>
				<view style='margin-top:20px;text-align: left;'>
					<input type="text" placeholder="填写评价" v-model="pingjia">
				</view>
				<view style='margin-top:20px;display: flex;flex-direction: row;justify-content: flex-start;'>
					<text>活动照片:</text>
					<view v-on:tap="upAimg" style="display: inline-block;width: 60px;height: 60px;border: 1px dotted #CCCCCC;font-size: 40px;text-align: center;line-height: 60px;">
						<image v-if="aimg==''" src="https://www.mastervan.cn/static/project/dolphin/static/images/jia.png" style="width: 30px;height: 30px;z-index: 999;"
						 mode="aspectFit"></image>
						<image v-if="aimg!=''" :src="aimg" style="width: 60px;height: 60px;z-index: 999;" mode="aspectFit"></image>
					</view>
				</view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
					<view v-if="tag!=''&&tag!=undefined" v-for="(istag,tagIndex) in tag" :key='tagIndex'>
						<view v-on:tap="getTag(istag.elId)" :style="{'background-color':tagColor[tagIndex]}" style="display:inline-block;width: 60px;text-align: center;margin-right: 6px;margin-top: 6px;border-radius: 4px;color: white;">{{istag.elName}}</view>
					</view>
				</view>
				<view style="margin-top: 20px;">
					<view>
						<button type="primary" style="background: #f2e44b;color: white;width: 100%;height: 50px;line-height: 50px;"
						 v-on:tap="upOne()">提交</button>
					</view>
				</view>
			</view> -->
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
				dataList: ['1', '2', '3'],
				status: ['审核中', '待完成', '已完成'],
				notStart: '',
				start: '',
				end: '',
				userMsg: '',
				guan: '',
				isShow: false,
				showOrder: false,   //弹出评价弹窗
				oneOrder: '',
				oneOrderLength: '',
				userName: '',
				userId: '',
				oid: '',
				aimg: '',
				showUp: false,    //弹出对活动或人员 的评价
				pingjia: '',
				tag: [],
				stag: [],
				type: '',
				tagColor: ['#f6b8f2', '#7ac9cc', '#d6c4ff', '#f6b8f2', '#7ac9cc', '#d6c4ff']
			}
		},
		computed: {
			isWidth: function() {
				return this.$store.state.windowWidth
			},
			isHeight: function() {
				return this.$store.state.windowHeight - 51
			},
			isModel: function() {
				return this.$store.state.model;
			},
			isH: function() {
				return this.$store.state.windowHeight
			}
		},
		onReady() {
			uni.loadFontFace({
				family: 'Alibaba PuHuiTi',
				source: 'url("https://www.mastervan.cn/static/project/dolphin/static/font/alifont/AlibabaPuHuiTi-Light.ttf")',
				success: function() {}
			})
			//用户信息
			let openId = uni.getStorageSync('openid');
			let _this = this;
			uni.request({
				url: _this.$store.state.baseurl + '/user/findArmourUserMessage',
				data: {
					openId: openId
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					_this.userMsg = res.data.data
				}
			})
			//审核中
			uni.request({
				url: _this.$store.state.baseurl + '/order/findOrderMessageByState',
				data: {
					openId: openId,
					orderState: 1
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					_this.notStart = res.data.data
				}
			})

		},
		methods: {
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
					uni.request({
						url: _this.$store.state.baseurl + '/order/findOrderMessageByState',
						data: {
							openId: openId,
							orderState: 2
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							_this.start = res.data.data
						}
					})
				} else if (index == 2) {
					//已完成
					uni.request({
						url: _this.$store.state.baseurl + '/order/findOrderMessageByState',
						data: {
							openId: openId,
							orderState: 4
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							_this.end = res.data.data
						}
					})
				} else if (index == 0) {
					//审核中
					uni.request({
						url: _this.$store.state.baseurl + '/order/findOrderMessageByState',
						data: {
							openId: openId,
							orderState: 1
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							_this.notStart = res.data.data
						}
					})
				}
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.navClick(index)
			},
			lower1() {
				uni.showLoading({
					content: '加载中'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 1000)
			},
			guanList: function() {
				uni.navigateTo({
					url: "/pages/myAttention/myAttention"
				})
			},
			closeGuan: function() {
				this.isShow = false
			},
			upHead: function(e) {
				uni.navigateTo({
					url: '/pages/upHead/index?pic=' + e
				})
			},
			showPing: function(i) {
				this.oneOrder = this.end[i];
				this.oneOrderLength = Math.ceil(this.end[i].list.length / 3)
				this.showOrder = true
			},
			upStaff: function(i, e, n, c) {
				this.userName = '';
				this.userName = n;
				this.showUp = true;
				this.oid = e;
				this.cid = c;
				this.userId = i,
					this.type = 2;
				let cid = c;
				let openId = uni.getStorageSync('openid');
				let _this = this;
				uni.request({
					url: _this.$store.state.baseurl + '/evaluateLabel/getLabelByCid',
					data: {
						openId: openId,
						cid: cid
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						_this.tag = res.data.data;
					}
				})
			},
			upAct: function(i, e, n, c) {
				this.tag = []
				this.userName = '';
				this.showUp = true;
				this.userName = n;
				this.oid = e;
				this.cid = c;
				this.userId = 1;
				this.type = 1;
			},
			upAimg: function() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						let tempFilePaths = chooseImageRes.tempFilePaths;
						_this.aimg = tempFilePaths[0];
					}
				});
			},
			upOne: function() {
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				let _this = this;
				let openId = uni.getStorageSync('openid');
				let data = {};
				data.oid = parseInt(this.oid);
				data.openId = openId;
				data.byErUserId = this.userId;
				data.evaluateText = this.pingjia;
				data.evaluateType = this.type;
				let tag = '';
				let stag = this.stag;
				var tagList = []
				// 对数组去重
				for(var i = 0;i<stag.length;i++) {
					if(tagList.indexOf(stag[i]) == -1) {
						tagList.push(stag[i])
					}
				}
				// 对数组重构
				for (let i = 0; i < tagList.length; i++) {
					if (i == 0) {
						tag += String(tagList[i])
					} else {
						tag += '-' + String(tagList[i])
					}
				}
				data.elIdStr = tag;
				uni.uploadFile({
					url: _this.$store.state.baseurl + '/evaluateRecord/create',
					filePath: _this.aimg,
					name: 'file',
					formData: data,
					success: (res) => {
						uni.hideLoading()
						let obj = JSON.parse(res.data)
						if (obj.data == 1) {
							_this.userName = '';
							_this.showUp = false;
							_this.showOrder = false;
							_this.pingjia = ''
							uni.showToast({
								title: '评价成功',
								icon:'none',
								duration:3000
							})
						}else if(obj.data == 0) {
							uni.showToast({
								title: '您已对该人员进行了评价',
								icon:'none',
								duration:3000
							})
						} else{
							uni.showToast({
								title: '抱歉，评价上传失败',
								icon:'none',
								duration:3000
							})
						}
					},
					fail() {
						uni.showToast({
							title: '抱歉，评价失败',
							icon:'none',
							duration:3000
						})
					}
				});
			},
			getTag: function(tid) {
				
				if (this.stag.length < 7) {
					this.stag.push(tid)
				}
			},
			showTel: function() {
				uni.makePhoneCall({
					phoneNumber: '18628188261' //仅为示例
				});
			},
			toOrder: function(e) {
				uni.navigateTo({
					url: '/components/bosspages/order?id=' + e
				})
			},
			orderMsg: function(oid) {
				uni.navigateTo({
					url: '/pages/bossOrderMsg/index?oid=' + oid
				})
			},
			// 关闭评价
			hideCommand() {
				this.showOrder = false
			},
			// 关闭对活动或人员的评价
			hideCommandDetail() {
				this.showUp = false
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
		overflow-x: hidden;
		overflow-y: scroll;
		font-family: Alibaba PuHuiTi
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

	/* 评价弹窗部分 */
	.Command,.command_Activity {
		width: 80%;
		height: 70%;
		background: white;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.Command {
		z-index: 10;
	}
	.command_Activity {
		z-index: 15;
	}
	.Command_Name, .command_ATitle {
		width: 100%;
		height: 50rpx;
		margin-top: 17rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.command_User {
		margin-top: 16rpx;
		width: 100%;
		height: 365rpx;
		list-style: none;
		white-space: nowrap; // 滚动必须加的属性
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		-ms-overflow-style: none;
	}
	.Command_Nav {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		margin-right: 20rpx;
	}

	.command_User_Ch {
		width: 200rpx;
		height: 365rpx;
		display: inline-block;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 4rpx 4rpx #EDEDED;
		margin-left: 10rpx;
	}
	.command_User_Ch:nth-of-type(1) {
		margin-left: 0rpx;
	}
	.command_UserMsgs {
		width: 70%;
		margin-left: 15%;
		display: flex;
		justify-content: space-between;
		height: 40rpx;
		line-height: 40rpx;
	}
	.command_UserMsgs text {
		font-size: 30rpx;
	}
	.command_Ones_User {
		font-size: 30rpx;
		color: #35A7FF;
	}
	.command_Imgs {
		width: 100%;
		height: 260rpx;
	}

	.command_Imgs image {
		width: 100%;
		height: 100%;
	}
	.activityName,.activityAddress, .activityTime {
		width: 100%;
		text-align: left;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre-wrap;
		font-size: 26rpx;
		color: #000000;
		opacity: 0.8;
		padding-left: 15rpx;
		margin-top: 10rpx;
	}
	.activityName {
		margin-top: 15rpx;
	}
	
	.BtnCommand, .BtnHide {
		width: 80%;
		margin-left: 10%;
		height: 70rpx;
		border-radius: 15rpx;
		border:1rpx solid #C0C0C0;
		font-size: 30rpx;
		text-align: center;
		line-height: 70rpx;
	}
	.BtnCommand {
		margin-top: 80rpx;
	}
	.BtnHide {
		margin-top: 15rpx;
	}
	/* 对活动评价 */
	.command_ACommands {
		margin-top: 20rpx;
		position: relative;
		width: 90%;
		margin-left: 5%;
		height: 170rpx;
	}
	.command_ACommands text {
		position: absolute;
		top:0rpx;
		left: 0rpx;
		width: 135rpx;
		font-size: 26rpx;
	}
	.command_ACommands textarea {
		position: absolute;
		left: 140rpx;
		text-align: left;
		height: 170rpx;
		font-size: 26rpx;
		width: 70%;
		border: 1rpx solid #CCCCCC;
	}
	.command_AImgs {
		position: relative;
		margin-top: 20rpx;
		width: 90%;
		margin-left: 5%;
		height: 250rpx;
	}
	.command_AImgs text {
		position: absolute;
		top:0rpx;
		left: 0rpx;
		width: 135rpx;
		font-size: 26rpx;
	}
	.command_AUpImgs {
		position: absolute;
		left: 140rpx;
		width: 200rpx;
		height: 200rpx;
		border: 1rpx solid #C9C9C9;
		font-size: 26rpx;
	}
	.command_AUpImgs image {
		width: 100%;
		height: 100%;
	}
	.mengban {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: .5;
		z-index: 5;
	}
	.user_Show_Label {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: 42rpx;
	}
	.User_Lable {
		display:inline-block;
		width: 60px;
		text-align: center;
		margin-right: 6px;
		margin-top: 6px;
		border-radius: 4px;
		color: white;
		font-size: 24rpx;
	}
</style>
