<template>
	<view>
		<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/beijing08.png) no-repeat;background-size: 100% 100%;">
			<view class="title-sty">
				<view>我的菜们</view>
			</view>
			<view style="width: 96%;height: 220px;margin: 40px auto;overflow: hidden;">
				<scroll-view scroll-x="true">
					<view style="display: flex;flex-direction: row;flex-wrap: wrap;" :style="{'width':isWidth*isLength+'px'}">
						<view v-for="(item,index) in cart" :key='index'>
							<view style="width: 110px;border-radius: 6px;height: 150px;box-shadow: 0 0 4px #333333;margin-bottom:10px;margin-right: 10px;overflow: hidden;background: white;">
								<image style="width: 110px;height: 110px;" :src="item.photoUrl" mode="aspectFill"></image>
								<view style="position: relative;top:-22px;z-index: 999;">
									<view class="jian">
										<view style="font-size: 12px;color: white;margin-bottom: 4px;text-algin:center">{{item.careerName}}</view>
									</view>
									<view style="font-size: 14px;color: #333333;font-weight: bold;line-height: 14px;">{{item.uname}}</view>
									<view style="font-size: 14px;color: red;">{{item.price}}元/场</view>
									<view v-on:tap="isDelete(item.userId,item.uname)" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/close.png) no-repeat;background-size: 100% 100%;width: 20px;height: 20px;position: absolute;top:-86px;left: 4px;border-radius: 10px;z-index: 999;"></view>
								</view>
								<view style="width: 110px;height: 40px;background: white;position: absolute;top:110px;border-radius: 0 0 6px 6px;"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="width: 96%;height: 760px;margin: 0 auto;box-shadow: 0 0 8px #CCCCCC;overflow: hidden;position: relative;top:-30px;background: white;border-radius: 8px;">
			<form @submit="submitOrder">
				<view style="color: #FF0000;margin-bottom: 20px;margin-top: 20px;font-size: 26px;text-algin:center" v-if="istotal!=undefined">￥{{istotal}}</view>

				<view style="font-size: 14px;width: 90%;margin: 0 auto;">
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px">
						<text style="flex-grow: 2;margin-right: 14px;">对接人:</text>
						<input style="flex-grow: 6;text-align: left;height: 30px;" class="inputShadow" type="text" value="" maxlength="10"
						 name='dockingPeopleName' />
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px">
						<text style="flex-grow: 2;">联系电话:</text>
						<input style="flex-grow: 6;text-align: left;height: 30px;" class="inputShadow" type="number" value="" maxlength="11"
						 name='dockingPeoplePhone' />
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px">
						<text style="flex-grow: 2;">活动名称:</text>
						<input style="flex-grow: 6;text-align: left;height: 30px;" class="inputShadow" type="text" value="" maxlength="100"
						 name='activityName' />
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px">
						<text style="width: 26%;">活动地点:</text>
						<picker mode="region" @change="chooseArea" name='area' style="width: 72%;text-align: left;height: 30px;" class="inputShadow">
							<view>{{area[0]}}-{{area[1]}}-{{area[2]}}</view>
						</picker>
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px">
						<text style="flex-grow: 2;">具体地址:</text>
						<input style="flex-grow: 6;text-align: left;height: 30px;" class="inputShadow" type="text" value="" maxlength="200"
						 name='xiang' placeholder="具体地址" placeholder-style="color:#c3c3c3" />
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px;">
						<text style="flex-grow: 1;">开始时间:</text>
						<view class="chooseTime" style='flex-grow: 7;'>
								<picker mode="multiSelector" :value="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1"
								 :range="dateTimeArray1">
								 <view class="tui-picker-detail" v-if="startdate==''">选择时间</view>
								 <view class="tui-picker-detail" v-if="startdate!=''">{{dateTimeArray1[0][dateTime1[0]]}}-{{dateTimeArray1[1][dateTime1[1]]}}-{{dateTimeArray1[2][dateTime1[2]]}}
										{{dateTimeArray1[3][dateTime1[3]]}}:{{dateTimeArray1[4][dateTime1[4]]}}</view>
								</picker>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;height: 30px;line-height: 30px;margin-bottom:30px;">
						<text style="flex-grow: 1;">结束时间:</text>
						<view class="chooseTime" style='flex-grow: 7;'>
							<!-- :value:startdate -->
							<!-- <picker style="color: #CCCCCC;" class="inputShadow" mode="date" :start="getNow" :value="enddate"  @change="endChange"> -->
								<picker mode="multiSelector" :value="dateTimeEnd" @change="changeDateTimeEnd" @columnchange="changeDateTimeColumnEnd"
								 :range="dateTimeArrayEnd">
								 <view class="tui-picker-detail" v-if="enddate==''">选择时间</view>
								 <view class="tui-picker-detail" v-if="enddate!=''">{{dateTimeArrayEnd[0][dateTimeEnd[0]]}}-{{dateTimeArrayEnd[1][dateTimeEnd[1]]}}-{{dateTimeArrayEnd[2][dateTimeEnd[2]]}}
										{{dateTimeArrayEnd[3][dateTimeEnd[3]]}}:{{dateTimeArrayEnd[4][dateTimeEnd[4]]}}</view>
								</picker>
							<!-- </picker> -->
						</view>
					</view>
					<view class="textParent">
						<text style="flex-grow: 2;">订单备注:</text>
						<textarea class="textAreaShadow" value="" name='orderRemark' />
					</view>
				</view>
				<view>
					<button form-type="submit" style="width: 120px;height: 32px;line-height: 32px;font-size: 16px;color: white;background-color: #488dd8;margin: 0 auto;">确认下单</button>
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import chooseDate from "@/components/chooseDate.vue"
	var dateTimePicker = require('../../src/utils/date.js')
	export default {
		components: {
			MxDatePicker,
			chooseDate
		},
		data() {
			return {
				isColor: 'rgba(255,255,255,0.6)',
				activeColor: 'rgb(255,255,255)',
				isLength: '',
				total: '',
				allId: '',
				startdate: '',
				enddate: '',
				area: ['选择地址', '', ''],
				dateTimeArray1: null,
				dateTime1: null,
				dateTimeArrayEnd: null,
				dateTimeEnd: null,
				startYear: 2000,
				endYear: 2040
			}
		},
		computed: {
			isModel: function() {
				return this.$store.state.model;
			},
			cart: function() {
				let cart = this.$store.state.cart;
				let _this = this;
				_this.isLength = Math.ceil(cart.length / 3);
				return cart
			},
			isWidth: function() {
				return this.$store.state.windowWidth
			},
			istotal: function() {
				let cart = this.$store.state.cart;
				let _this = this;
				let price = [];
				for (let i in cart) {
					price.push(cart[i].price)
				}
				var s = 0;
				for (var i = price.length - 1; i >= 0; i--) {
					s += price[i];
				}
				_this.total = s;
				return s
			}
		},
		onReady() {
			let openId = uni.getStorageSync('openid');
			let _this = this;
			uni.request({
				url: _this.$store.state.baseurl + '/order/findShopping',
				data: {
					openId: openId
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					let cart = res.data.data;
					_this.$store.commit('setCart', cart);
					//console.log(_this.$store.state.cart)
				}
			})
		},
		mounted() {
			// 获取完整的年月日 时分秒，以及默认显示的数组
			var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
			// 精确到分的处理，将数组的秒去掉
			var lastArray = obj1.dateTimeArray.pop();
			var lastTime = obj1.dateTime.pop();
			this.dateTimeArray1 = obj1.dateTimeArray
			this.dateTime1 = obj1.dateTime  //选择开始时间
			// 选择结束时间
			this.dateTimeArrayEnd = obj1.dateTimeArray
			this.dateTimeEnd = obj1.dateTime
		},
		methods: {
			isDelete: function(id, name) {
				let openId = uni.getStorageSync('openid');
				let _this = this;
				uni.showModal({
					title: '提示',
					content: name + '   将被删除',
					success: function(res) {
						if (res.confirm) {
							//console.log('用户点击确定');
							uni.request({
								url: _this.$store.state.baseurl + '/order/delOne',
								data: {
									openId: openId,
									userId: id
								},
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: function(res) {
									if (res.data.success == true) {
										let cart = res.data.data;
										_this.$store.commit('setCart', cart);
									} else {
										uni.showModal({
											title: '提示',
											content: '删除失败',
											success: function(res) {
											}
										});
									}
								}
							})
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
			},
			// 选择时间
			changeDateTime1(e) {
				this.dateTime1 = e.detail.value
				this.startdate = this.dateTimeArray1[0][this.dateTime1[0]]+'-'+this.dateTimeArray1[1][this.dateTime1[1]]+'-'+this.dateTimeArray1[2][this.dateTime1[2]]+' '+this.dateTimeArray1[3][this.dateTime1[3]]+':'+this.dateTimeArray1[4][this.dateTime1[4]]
			},
			changeDateTimeColumn1(e) {
				var arr = this.dateTime1
				var dateArr = this.dateTimeArray1;
				arr[e.detail.column] = e.detail.value;
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
				this.dateTimeArray1 = dateArr
				this.dateTime1 = arr
			},
			// 选择结束时间
			changeDateTimeEnd(e) {
				this.dateTimeEnd = e.detail.value
				this.enddate = this.dateTimeArrayEnd[0][this.dateTimeEnd[0]]+'-'+this.dateTimeArrayEnd[1][this.dateTimeEnd[1]]+'-'+this.dateTimeArrayEnd[2][this.dateTimeEnd[2]]+' '+this.dateTimeArrayEnd[3][this.dateTimeEnd[3]]+':'+this.dateTimeArrayEnd[4][this.dateTimeEnd[4]]
			},
			changeDateTimeColumnEnd(e) {
				var arr = this.dateTimeEnd
				var dateArr = this.dateTimeArrayEnd;
				arr[e.detail.column] = e.detail.value;
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
				this.dateTimeArrayEnd = dateArr
				this.dateTimeEnd = arr
			},
			chooseArea: function(e) {
				this.area = e.detail.value
			},
			submitOrder: function(e) {
				let cart = this.$store.state.cart;
				let _this = this;
				let allId = '';
				for (let i in cart) {
					if (i == 0) {
						allId = cart[i].userId
					} else {
						allId = allId + '-' + cart[i].userId
					}
				}
				let total = this.total;
				let openId = uni.getStorageSync('openid');
				e.detail.value.orderPrice = total;
				e.detail.value.openId = openId;
				e.detail.value.orderUserId = allId;
				e.detail.value.address = this.area[0] + this.area[1] + this.area[2];
				e.detail.value.activityBeginTime = this.startdate;
				e.detail.value.activityAfterTime = this.enddate;
				e.detail.value.activityAddress = e.detail.value.address + e.detail.value.xiang
				//判断是否填写数据
				if(!_this.util.phoneNumber(e.detail.value.dockingPeoplePhone)) {
					return
				}
				if (e.detail.value.address == '选择地址' || e.detail.value.xiang == '' || e.detail.value.dockingPeopleName == '' || e.detail
					.value.dockingPeoplePhone == '' || e.detail.value.activityName == '' || e.detail.value.activityBeginTime == '' ||
					e.detail.value.activityAfterTime == '') {
					uni.showModal({
						title: '提示',
						content: '请填写完整信息'
					})
				} else if (cart.length == 0) {
					uni.showModal({
						title: '提示',
						content: '购物车不能为空'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '确认提交',
						success: function(res) {
							if (res.confirm) {
								//console.log('用户点击确定');
								uni.showLoading({
									content: '提交中'
								})
								uni.request({
									url: _this.$store.state.baseurl + '/order/createOrder',
									data: e.detail.value,
									method: 'POST',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									success: function(res) {
										if (res.data.data == 1) {
											let cart = '';
											_this.$store.commit('setCart', cart);
											uni.hideLoading()
											uni.showModal({
												title: '提交成功',
												content: '稍后会有公司人员与你联系......',
												success: function(res) {
													if (res.confirm) {
														console.log('用户点击确定');
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												}
											});
											setTimeout(function() {
												_this.$store.commit('change_page', 0)
												uni.navigateTo({
													url: '/pages/index/index'
												})
											}, 1000)
										}
									}
								})
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});

				}
			}
		}
	}
</script>

<style>
	.nav {
		background: #178ab6;
		height: 270px;
	}

	.paddingTop01 {
		padding-top: 30px;
	}

	.paddingTop02 {
		padding-top: 50px;
	}

	.title-sty {
		font-size: 18px;
		font-weight: 600;
		color: white;
		letter-spacing: 4px;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
	}

	.inputShadow {
		padding-left: 10px;
		border-radius: 6px;
		box-shadow: 0 0 6px #c0c0c0;
		cursor: auto;
		display: block;
		height: 1.4rem;
		text-overflow: clip;
		overflow: hidden;
		white-space: nowrap;
	}
	.textParent {
		display: flex;
		flex-direction: row;
		height: 240rpx;
		/* line-height: 240rpx; */
		margin-bottom:100rpx
	}
	.textAreaShadow {
		flex-grow: 6;
		text-align: left;
		height: 240rpx;
		width: 362rpx;
		padding-left: 20rpx;
		border-radius: 12rpx;
		box-shadow: 0 0 12rpx #c0c0c0;
	}
	.jian {
		background: -webkit-linear-gradient(rgba(0, 0, 0, 0), black);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(rgba(0, 0, 0, 0), black);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(rgba(0, 0, 0, 0), black);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(rgba(0, 0, 0, 0), black);
		/* 标准的语法（必须放在最后） */
	}

	.chooseTime {
		padding-left: 10px;
		border-radius: 6px;
		-webkit-box-shadow: 0 0 6px #c0c0c0;
		box-shadow: 0 0 6px #c0c0c0;
		cursor: auto;
		display: block;
		height: 1.4rem;
		-o-text-overflow: clip;
		text-overflow: clip;
		overflow: hidden;
		white-space: nowrap;
	}
	.chooseTimeText {
		width: 500rpx;
		
	}
</style>
