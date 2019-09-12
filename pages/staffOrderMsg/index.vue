<template>
	<view>
		<view class="baseSty" style="font-family: 'Alibaba PuHuiTi';background:#f4f4f4">
			<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
				<view class="title-sty" style="display: flex;flex-direction: row;">
					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view style="flex-grow: 8;">订单详情</view>
					<view style="flex-grow: 2;"></view>
				</view>
			</view>
			<view :style="{'height':isHeight+'px'}" style="overflow-y: scroll;font-size:16px">
				<view style="width:90%;margin:0 auto;border: 1px solid #dddddd;padding: 2%;border-radius: 15rpx;">
					<view style="margin-bottom:10px;display: flex;">
						  <image src="/static/icon/date.png" style="width:40rpx;height:40rpx"></image>
						<text>活动时间:{{dataList.activityBeginTime}}-{{dataList.activityAfterTime}}</text>
					</view>
					<view style="margin-bottom:10px;display: flex;">
						<image src="/static/location-b.png" style="width:40rpx;height:40rpx"></image>
						<text>活动地址:{{dataList.activityAddress}}</text>
					</view>
					<view style="margin-bottom:10px;display: flex;">
						<image src="/static/remark.png" style="width:40rpx;height:40rpx"></image>
						<text>订单备注:{{dataList.orderRemark}}</text>
					</view>
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
				dataList:''
			}
		},
		onLoad(option) {
			console.log(option.oid)
			this.oid=option.oid;
			
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
			let cid = uni.getStorageSync('cid')
			let _this=this;
			uni.request({
				url:_this.$store.state.baseurl+'/order/findOrderMessageByOid',
				data:{
					openId:openId,
					oid:_this.oid,
					cid: cid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					console.log(res)
					if(res.data.data.orderMessage!=undefined){
						//console.log(res.data.data.orderMessage)
						_this.dataList=res.data.data.orderMessage
					}
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
			}
		}
	}
</script>

<style>
	.title-sty{
		font-size: 18px;
		font-weight: 600;
		color: black;
		letter-spacing: 4px;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.baseSty{
		width: 100%;
		overflow-x: hidden;
	    overflow-y: scroll;
	}
	.baseSty::-webkit-scrollbar {
	    display: none;
	}
	
	.paddingTop01{
		padding-top: 30px;
	}
	.paddingTop02{
		padding-top: 50px;
	}
	.ctrlSty{
		margin-top: 30px;
	}
</style>
