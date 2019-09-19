<template>
	<view class="baseSty" :style="{'height':Height+'px'}">
		<view class='nav'>
			<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
			<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
				<view class="title-sty" style="display: flex;flex-direction: row;">
					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view style="flex-grow: 8;">我的关注</view>
					<view style="flex-grow: 2;"></view>
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
					<view class="swiper-item" v-for="(item,index) in attentionList[navIndex]" :key="index" v-on:tap.stop="toOrder(item.byArUserId)">
						<view class="headpic">
							<image :src="item.photoUrl[0]" mode="widthFix" style="width: 80rpx;"></image>
						</view>
						<view class="userInfo">
							<text>{{item.userName[0]}}</text>
						</view>
						<view class="nav">
							<image src="/static/more.png" mode="widthFix" style="width: 44rpx;"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				Height: '',
				stateBarHeight: '',
				attentionList: [[],[],[],[]],
				ctype: [],
				navIndex: 0
			}
		},
		onLoad() {	
			this.Height=this.$store.state.windowHeight
			this.stateBarHeight = this.$store.state.statusBarHeight
			let _this = this
			let openId=uni.getStorageSync('openid');
			_this.$http.getWork({
				openId:openId,
			}).then(res => {
				_this.ctype = res.data.data
				_this.attention(1)
			})
		},
		methods:{
			toOrder:function(e){
				uni.navigateTo({
					url:'/components/bosspages/order?id='+e
				})
			},
			goback:function(){
			
				this.$store.commit('change_page',2)
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			swiperChange:function(e){
				console.log(e.detail.current)
				let index = e.detail.current
				this.navClick(index)
			},
			attention: function(index){
				let openId=uni.getStorageSync('openid');
				let _this=this;
				//关注列表
				console.log(index)
				uni.request({
					url:_this.$store.state.baseurl+'/attention/list',
					data:{
						openId:openId,
						cid: index
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						console.log(res)
						var arr = _this.attentionList
						arr.splice(index-1,1,res.data.data);
						_this.attentionList = arr
						console.log(arr)
					}
				})
			},
			navClick: function(index){
				this.navIndex = index
				this.attention(index+1)
			},
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
	}
	.swiper-item .headpic{
		width: 13%;
		display: flex;
		align-items: center
	}
	.swiper-item .userInfo{
		width: 58%;
	}
	.swiper-item .nav{
		width: 23%;
		text-align: right;
		line-height: 100rpx;
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
</style>
