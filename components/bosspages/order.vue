<template>
	<view class="baseSty" style="font-family: 'Alibaba PuHuiTi';padding-bottom: 30px;">

		<view class='nav'>
			<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
			<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
				<view class="title-sty" style="display: flex;flex-direction: row;">
				
					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view style="flex-grow: 8;">个人详情</view>
					<view style="flex-grow: 2;"></view>
				</view>
			</view>
			
		</view>
		<view style="display: flex;flex-direction: row;border-bottom: 1px solid #C9C9C9;">
			<view style="flex-grow: 1;">
				<image :src='dataList.headPicUrl' style="width: 36px;height: 36px;margin-left: 10px;margin-top: 2px;border: 1px solid #FFECEC;border-radius: 18px;" mode="aspectFill"></image>
			</view>
			<view style="flex-grow: 5;">
				<view style="font-size: 16px;font-weight: 600;">
					<text>{{dataList.userName}}</text>
				</view>
				<view style="display: flex;flex-direction: row;">
					<view style="flex-grow: 4;font-size: 12px;">
						<text>{{dataList.address}}</text>
					</view>
					<view style="flex-grow: 1;font-size: 18px;font-weight: 600;color: red;">
						<text>{{dataList.price}}元/场</text>
					</view>
				</view>
			</view>
		</view>
		
		<swiper style="min-height: 500rpx;width: 100%;" autoplay='false' interval='20000' duration='500' :current='tabbarIndex' @change="swiperChange">
			<swiper-item v-if="dataList.dolphinVideoUrl!=''&&dataList.dolphinVideoUrl!=null&&dataList.dolphinVideoUrl!=undefined">
				<video style="width: 100%;height:100%" :src="dataList.dolphinVideoUrl" :controls='true' objectFit='contain' autoplay='true'></video>
			</swiper-item>
			<swiper-item v-if="dataList.videoUrl!=''&&dataList.videoUrl!=null&&dataList.videoUrl!=undefined">
				<video style="width: 100%;height:100%" :src="dataList.videoUrl" :controls='true' objectFit='contain' autoplay='true'></video>
			</swiper-item>
			<swiper-item v-for="(item,index) in imgList" :key="index" @tap="previewOwnPics(index)" >
				<image style="width: 100%;height: 100%" :src="item" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="notice">	
			<view :class="tabbarIndex==0?'checked':''" @tap="tabbarTap" data-index=0>
				视频
			</view>
			<view :class="tabbarIndex>0?'checked':''" @tap="tabbarTap" data-index=1>
				图片
			</view>
		</view>
	<!-- 	<view class="notice" v-else style="height: 44rpx;">
		</view> -->
		
		<view class="joinOder" style="position: fixed;bottom: 0;width: 100%;z-index: 999;display: flex;">
			<view style="background: linear-gradient(to right, #f6cc45 , #f09a38);border-top-left-radius: 20rpx;" @tap="buy">
				加入订单
			</view>
			<view style="background: linear-gradient(to right, #ee7f31 , #eb5829);border-top-right-radius: 20rpx;" @tap="buy" data-nav=1>
				立即下单
			</view>
		</view>
		<view style="width: 96%;margin: 0 auto;">
			<view class="dolphin">
				<view style='font-size:16px;font-weight:600;margin-bottom: 10px;width: 100%;'>海豚认证</view>
				<view v-if="dolList.length==0||dolList==''||dolList==undefined" style="text-align: center;font-size: 14px;height: 160px;line-height: 160px;">
					<image src="/static/nodata.png" mode="widthFix" style="width: 240rpx;"></image>
				</view>
				<view v-else style="width: 100%;margin: 10px auto;overflow: hidden;">
					<scroll-view scroll-x='true' style="height: 100%;">
						<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
							<view style="width: 110px;border-radius: 6px;height: 150px;border:1px solid #E5E5E5;margin-bottom:10px;overflow: hidden;margin-right: 9px;" v-for="(item,index) in dolList" :key='index' @click="previewDoplhin">
								<image :src="item" style="width: 110px;height: 150px;" mode="aspectFit"></image>
							</view>
						</view>
					
					</scroll-view>
			
				</view>
				
					
			</view>
			<view style="border-top: 1px solid #DDDDDD;">
				<view style='font-size:16px;font-weight:600;'>个人履历</view>
				<view style="width: 100%;height: 160px;margin: 10px auto;overflow: hidden;">
					<view v-if="nvli.length==0||nvli==''||nvli==undefined" style="text-align: center;font-size: 14px;line-height: 160px;">
						<image src="/static/nodata.png" mode="widthFix" style="width: 240rpx;"></image>
					</view>
					<scroll-view scroll-x="true">
						<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
							<view v-for="(item,index) in nvli" :key='index' @click="previewImages(index)">
								<view style="width: 110px;border-radius: 6px;height: 150px;border:1px solid #E5E5E5;margin-bottom:10px;margin-right: 10px;overflow: hidden;">
									<image :src="item.activityPicUrl" style="width: 110px;height: 110px;" mode="aspectFill"></image>
									<view style='font-size:12px;text-align:center'>{{item.activityName}}</view>
									<view style='font-size:10px;text-align:center'>{{item.activityBeginTime}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<!-- <view>
				<view style='font-size:16px;font-weight:600;margin-bottom: 10px;'>个人照片</view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
					<view v-for="(item,index) in imgList" :key='index'>
						<view style="width: 110px;border-radius: 6px;height: 150px;box-shadow: 0 0 4px #333333;margin-bottom:10px;margin-right: 10px;overflow: hidden;">
							<image :src="item" style="width: 110px;height: 150px;" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view> -->
			
		
				
			<view v-if="ping>0">
				<view style='font-size:16px;font-weight:600;margin-bottom: 10px;border-top: 1px solid #DDDDDD;' >甲方评价</view>
				<view v-if="ping.length==0" style="text-align: center;font-size: 14px;line-height: 160px;">
					<image src="/static/nodata.png" mode="widthFix" style="width: 240rpx;"></image>
				</view>
				<view v-else style="width: 100%;height: 480rpx;margin: 10px auto;overflow: hidden;">
					<scroll-view scroll-y="true">
						<view style="display: flex;flex-direction: row;flex-wrap: wrap;" :style="{'width':isWidth*isPingLength+'px'}">
							<view style='width: 100%;'>
<!-- 								<view style="width: 280px;border-radius: 6px;height: 160px;border:1px solid #E5E5E5;margin-bottom:10px;margin-right: 10px;overflow: hidden;" v-for="(item,index) in ping" :key='index'>
									<view style='font-size:12px;text-align:center;font-weight: 600;'>{{item.companyName}}
										<view style="display: flex;flex-direction: row-reverse;margin-bottom: 8px;color: #CCCCCC;" v-on:tap="zan(item.eid)">
											<image src="https://www.mastervan.cn/static/project/dolphin/static/images/zan.png" style="width: 14px;height: 14px;" mode="aspectFill"></image>
											{{item.likeNumber}}人赞同
										</view>
									</view>
									<view style='font-size:10px;text-align:left;margin-bottom: 6px;'>{{item.evaluateText}}</view>
									<image v-for="(img,imgindex) in item.evaluatePicUrlList" :src="img" style="width: 60px;" mode="widthFix" :key='imgindex'></image>
								</view> -->
								<view class="mark" v-for="(item,index) in ping" :key='index'>
									<view class="head">
										<image src="/static/defaultUser.png" mode="widthFix"></image>
										<view class="cname">{{item.companyName}}</view>
										<view class="ctime">{{item.createTime}}</view>
									</view>
									<view class="markcontent">
										{{item.evaluateText}}
									</view>
									<image v-for="(img,imgindex) in item.evaluatePicUrlList" :src="img" style="width: 280rpx;" mode="widthFix" :key='imgindex'></image>
									<view style="display: flex;flex-direction: row-reverse;margin-bottom: 8px;color: #CCCCCC;font-size: 32rpx;align-items: center;" v-on:tap="zan(item.eid)">
										<image src="https://www.mastervan.cn/static/project/dolphin/static/images/zan.png" style="width: 32rpx;height: 32rpx;" mode="aspectFill"></image>
										{{item.likeNumber}}人赞同
									</view>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				isModel:'',
				stateBarHeight:'',
				dataList:'',
				imgList:'',
				dolList:'',
				nvli:'',
				ping:[],
				uid:'',
				isLength:'',
				isPingLength:'',
				moreNotice: false,
				tabbarIndex: 0
			}
		},
		onLoad(option) {
			// console.log(option)
			this.uid=option.id;
		},
		onReady() {
			//console.log(this.$store.state.model)
			// var Model=[
			// 		// iPhone X,iPhone XS,iPhone Xs Max
			// 		{
			// 			stateBarHeight: '132upx',
			// 			navBarHeight: '132upx'
			// 		},
			// 		// iPhone XR
			// 		{
			// 			stateBarHeight: '88upx',
			// 			navBarHeight: '88upx'
			// 		},
			// 		// iPhone 6Plus,6sPlus ,iPhone 8Plus,7Plus
			// 		{
			// 			stateBarHeight: '60upx',
			// 			navBarHeight: '132upx'
			// 		},
			// 		// 其他机型
			// 		{
			// 			stateBarHeight: '40upx',
			// 			navBarHeight: '88upx'
			// 		}
			// 	]
			this.isModel=this.$store.state.model;
			this.stateBarHeight=this.$store.state.statusBarHeight
			console.log(this.isModel)
			console.log(this.$store.state.statusBarHeight)
			let _this=this;
			let openId=uni.getStorageSync('openid');
			let uid=this.uid;
			uni.request({
				url:_this.$store.state.baseurl+'/user/findDetailUserMessage',
				data:{
					openId:openId,
					userId:uid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					console.log(res)
					_this.dataList=res.data.data;
					let arr = res.data.data.recordList;
					let newarr = []
					for(let i in arr){
						newarr.push(arr[i].activityPicUrl.split(/-/))
						var n = arr[i].activityPicUrl.search(/-/)
						if(n>0){
							arr[i].activityPicUrl = arr[i].activityPicUrl.substr(0,n);
						}
					}
					_this.nvli = arr;
					_this.lvliImages = newarr;
					var m = res.data.data.evaluateList

					for(let i in m){
						console.log(m[i].createTime.slice(0,10))
						m[i].createTime = m[i].createTime.slice(0,10)
					}		
					_this.ping = m
					var k = res.data.data.photoUrlList
					var g = res.data.data.cardUrl 
					k.unshift(g)
					_this.imgList = k;
					_this.dolList=res.data.data.dolphinPhotoList;
					_this.isLength=Math.ceil(res.data.data.recordList.length/3);
					_this.isPingLength=res.data.data.evaluateList.length;
				}
			})
			
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
			tabbarTap:function(e){
				console.log(e.currentTarget.dataset.index)
				var s = parseInt(e.currentTarget.dataset.index)
				this.tabbarIndex = s
			},
			swiperChange:function(e){
				let c = e.detail.current
				this.tabbarIndex = c
			},
			previewImages:function(index){
				uni.previewImage({
					urls: this.lvliImages[index]
				})
			},
			previewOwnPics:function(index){
				uni.previewImage({
					current: index,
					urls: this.imgList
				})
			},
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			previewDoplhin:function(){
				uni.previewImage({
					urls: this.dolList
				})
			},
			buy:function(e){
				let openId=uni.getStorageSync('openid');
				let uid=this.uid;
				//console.log(uid)
				let _this=this;
				
				uni.showLoading({
					title: ''
				});
				uni.request({
					url:_this.$store.state.baseurl+'/order/joinShopping',
					data:{
						openId:openId,
						userId:uid
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						console.log(res)
						let cart=res.data.data;
						_this.$store.commit('setCart',cart);
						uni.hideLoading();
						if(e.currentTarget.dataset.nav=='1'){
							_this.$store.commit('change_page',1)
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
						uni.showToast({
							icon: 'success',
							title: '加入成功'
						})
						//console.log(_this.$store.state.cart)
					}
				})
				
			},
			zan:function(e){
				let openId=uni.getStorageSync('openid');
				let _this=this;
				//console.log(e)
				uni.request({
					url:_this.$store.state.baseurl+'/evaluateRecord/likeNum',
					data:{
						openId:openId,
						eid:e
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						// console.log(res.data.data)
						if(res.data.data){
							uni.showLoading({
								title:'点赞成功'
							})
							setTimeout(function(){
								uni.hideLoading()
							},1000)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.joinOder view{
		width: 50%;
		line-height: 2.5;
		text-align: center;
		color: white;
		font-weight: 700;
		font-size: 34rpx;
	}
	.notice{
		width: 30%;
		margin: 0 auto;
		font-size: 28rpx;
		height: 56rpx;
		line-height: 56rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.notice view{
		width: 45%;
		background: rgba(220,220,220,0.8);
		text-align: center;
		line-height: 44rpx;
		height: 44rpx;
		border-radius: 44rpx;
	}
	.checked{
		background: linear-gradient(to right, #ef9235 , #eb5f2a)!important;
		color: white!important;
	}
	.mark{
		width: 100%;
		display: flex;
		flex-direction: column;
		
	}
	.mark .head{
		display: flex;
	}
	.head image{
		width: 10%!important;
	}
	.cname{
		width: 60%;
		line-height: 72rpx;
		font-size: 32rpx;
	}
	.ctime{
		width: 30%;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #808080;
		text-align: right;
	}
	
	.dolphin{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		border-top: 1px solid #dddddd;
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
	
</style>
