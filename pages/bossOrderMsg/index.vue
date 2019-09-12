<template>
	<view>
		<view class="baseSty" style="font-family: 'Alibaba PuHuiTi';">
			
			<view class='nav'>
				<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
				<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
					<view class="title-sty" style="display: flex;flex-direction: row;">
					
						<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
							<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
						</view>
						<view style="flex-grow: 8;">订单详情</view>
						<view style="flex-grow: 2;"></view>
					</view>
				</view>
			</view>
			<view :style="{'height':isHeight+'px'}" style="overflow-y: scroll;font-size:16px">
				<view class="myInfo">
					<view class="headIcon">
						<image src="/static/location.png" mode="widthFix" style="margin-top: 20%; width: 80rpx;"></image>			
					</view>
					<view class="detail">
						<view class="bossNamePhone">
							<view>
								对接人:{{dataList.dockingPeopleName}}
							</view>
							<view>
								{{dataList.dockingPeoplePhone}}
							</view>
						</view>
						<view class="bossTimeAdress">
							<view class="">
								活动时间:{{dataList.activityBeginTime}}至{{dataList.activityAfterTime}}
								
							</view>
							<view class="">
								活动地址:{{dataList.activityAddress}}
							</view>
						</view>
						<view class="other">
							<view class="">
								备注:{{dataList.orderRemark}}
								
							</view>
							
						</view>
						
					</view>
		
					
					
					
				</view>
				<view class="centerNav">
					<view style="width: 80%;height: 100%;" class="nav80">
						<view v-for="(item,index) in ctype" :key="index" class="navItem" :class="index==navIndex?'navSelect':''" @click='navClick(index)'>
								{{item.cname}}
						</view>
					</view>		
				</view>
				<view class="oderList">
					<swiper :current="navIndex" @change="swiperChange" style="width: 100%;">
						<swiper-item v-for="(it,id) in ctype" :key="id">
							<view class="swiper-item" v-for="(item,index) in orderList[navIndex]" :key="index" v-on:tap.stop="toOrder(item.userId)">
								<view class="headpic">
									<image :src="item.photoUrl" mode="widthFix" style="width: 80rpx;"></image>
								</view>
								<view class="userInfo">
									<text>{{item.userName}}</text>
								</view>
								<view class="nav">
									<text>{{item.price}}¥</text>
								</view>
								<view class="nav">
									<image src="/static/more.png" mode="widthFix" style="width: 44rpx;"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				oid:'',
				dataList:'',
				staffList:'',
				stateBarHeight:'',
				ctype: [],
				navIndex: 0,
				orderList: [[],[],[],[]]
			}
		},
		onLoad(option) {
			console.log(option.oid)
			this.oid=option.oid;
			this.stateBarHeight=this.$store.state.statusBarHeight
			uni.loadFontFace ({
			  family: 'Alibaba PuHuiTi',
			  source: 'url("https://www.mastervan.cn/static/project/dolphin/static/font/alifont/AlibabaPuHuiTi-Light.ttf")',
			  success: function(){
					console.log('load font success')
				  },
				fail() {
					//console.log(456)
				}
			})
			
			let openId=uni.getStorageSync('openid');
			let _this=this;
			uni.request({
				url:_this.$store.state.baseurl+'/careerType/getType',
				data:{
					openId:openId,
				},
				method:'GET',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					console.log(res)
					_this.ctype = res.data.data
						_this.getOrderLsit(1)
				}
			})
	
		},
		computed: {
			isModel:function(){
				//console.log(this.$store.state.model)
				return this.$store.state.model;
			},
			isHeight:function(){
				return this.$store.state.windowHeight
			}
		},
		methods: {
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			navClick: function(index){
				console.log(index)
				this.navIndex = index
				this.getOrderLsit(index+1)
			},
			swiperChange: function(e){
				console.log(e)
				let index = e.detail.current
				this.navClick(index)
			},
			getOrderLsit: function(index){
				let openId=uni.getStorageSync('openid');
				let _this=this;
				uni.request({
					url:_this.$store.state.baseurl+'/order/findOrderMessageByOid',
					data:{
						openId:openId,
						oid:_this.oid,
						cid: index
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						console.log(res)
						if(res.data.data.orderMessage!=undefined){
							console.log(res)
							//console.log(res.data.data.orderMessage)
							_this.dataList=res.data.data.orderMessage;
							var arr = _this.orderList
							arr.splice(index-1,1,res.data.data.list);
							_this.orderList = arr
						}
					}
				})
			},
			toOrder:function(e){
				//console.log(e)
				uni.navigateTo({
					url:'/components/bosspages/order?id='+e
				})
			}
		}
	}
</script>

<style>
	.swiper-item{
		display: flex;
		height: 100rpx;
		width: 95%;
		margin: 1% auto;
		justify-content: space-between;
		border: 1px solid #dddddd;
		border-radius: 10rpx;
	}
	.swiper-item view{
		padding:1%;
		display: flex;
		align-items: center
	}
	.swiper-item .headpic{
		width: 13%;
	
	}
	.swiper-item .userInfo{
		width: 58%;
	}
	.swiper-item .nav{
		width: 11.5%;
		text-align: right;
		line-height: 100rpx;
		justify-content: flex-end;
	}
	.nav text{
		font-size: 44rpx;
		color: #FF5959;
	}
	.bossNamePhone>view{
		float: left;
		font-size:36rpx;
		font-weight: bold;
	}
	.bossTimeAdress>view{
		font-size:28rpx
	}
	.other>view{
		font-size:24rpx
	}
	
	.headIcon{
		width:25%;
		height:100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.detail{
		display: flex;
		flex-direction: column;
		flex-wrap:wrap;
		width: 75%;
		height: 100%;
	}
	.bossNamePhone{
		width:90%;
		height:40%;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}
	.bossTimeAdress{
		width:100%;
		height:40%
	}
	.other{
		width:100%;
		height:20%
	}

	
	
	.myInfo,.centerNav{
		box-shadow: 5upx 0 5upx #cccccc;
	}
	.myInfo,.centerNav,.oderList,.nav80{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.navItem{
		width: 25%;
		height: 80%;
		text-align: center;
		color: #50b1ff;
		box-sizing: border-box;
	}
	.navSelect{
	
		border-bottom: 5rpx solid #50b1ff;
	}
	.centerNav,.oderList{
		margin-top: 30upx;
	}
	.myInfo{
		height: 225upx;
	}
	.centerNav{
		height: 70upx;
		font-size: 35upx;
	}
.title-sty{
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
	.title-sty view{
		line-height: 88rpx;
	}
	.whiteBlock1{
		height: 132rpx;
		position: fixed;
		background-color: #FFFFFF;
		width: 100%;
		z-index: 999;

	}
	.whiteBlock2{
		height: 88rpx;
		background: #FFFFFF;
		width: 100%;
		padding-top: 132rpx;
	}
	.baseSty{
		width: 100%;
		overflow-x: hidden;
	    overflow-y: scroll;
	}
	.baseSty::-webkit-scrollbar {
	    display: none;
	}
	.ctrlSty{
		margin-top: 30px;
	}
	
	.jian{
	    background: -webkit-linear-gradient(rgba(0,0,0,0),black); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(rgba(0,0,0,0),black); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(rgba(0,0,0,0),black); /* Firefox 3.6 - 15 */
	    background: linear-gradient(rgba(0,0,0,0),black); /* 标准的语法（必须放在最后） */
	}
</style>
