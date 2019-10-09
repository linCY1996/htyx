<template>
	<view style="font-family: Alibaba PuHuiTi;overflow: hidden;">
		<video :class="!vSt?'isShow':'isClose'" src="https://www.mastervan.cn/static/project/dolphin/static/images/bg08.mp4" :style="{'height':isHeight}" style="width: 100%;" autoplay="true"  :controls='false' loop="true" objectFit="cover" @waiting="setImg" @play="closeImg">
			
		</video>
		<view :class="!vSt?'isClose':'isShow'" :style="{'height':isHeight}" style="width:100%;position: absolute;top:0;background:url(https://www.mastervan.cn/static/project/dolphin/static/images/背景11.png) no-repeat;background-size:100% 100%"></view>
		<view style="z-index: 9999;position: absolute;top:36px;left: 26px;color: rgba(248,248,255,0.6);font-size: 16px;font-weight: bold;" v-on:tap="goback">
			返回
		</view>
		<view class="contentArea" style="position: absolute;top:0;color: white;z-index: 2000">
			<view class="content">
				<swiper style="width: 80%;margin: 154rpx auto 0 auto;z-index: 2000;height: 950rpx;" :indicator-dots="true" indicator-active-color="#fff" :autoplay="false" @change="getThis">
					<swiper-item v-for="(item,index) in isSt" :key='index' v-if="item!=''">
						<view style="overflow-y: scroll;">
							<view style="padding:10px;margin:0 auto;text-align:center">
								<view class='contentTitle'>活动名称</view>
								<view style="font-size:20px;margin-top:8px;color: #F6522F;font-weight: bold;">{{item.activityName}}</view>
							</view>
							
							<view style="padding:10px;margin:0 auto;text-align:center;">
								<view class='contentTitle'>活动时间</view>
								<view style="font-size:20px;margin-top:8px;color: #F6522F;font-weight: bold;">{{item.activityBeginTime}}至{{item.activityAfterTime}}</view>
							</view>
							
							<view style="padding:10px;margin:0 auto;text-align:center;">
								<view class='contentTitle'>活动地点</view>
								<view style="font-size:20px;margin-top:8px;color: #F6522F;font-weight: bold;">{{item.activityAddress}}</view>
							</view>
							
							<view style="padding:10px;margin:0 auto;text-align:center;">
								<view class='contentTitle'>活动备注</view>
								<view style="font-size:26rpx;margin-top:8px;color: #F6522F;font-weight: bold;">{{item.orderRemark}}</view>
							</view>
							
							<view style="padding:10px;margin:0 auto;text-align:center">
								<view class='contentTitle'>订单价格</view>
								<view style="font-size:24px;margin-top:8px;color: #F6522F;font-weight: bold;">{{isPrice}}元</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view style="position: fixed;bottom: 40px;width: 88%;left:6%;z-index: 9999;">
			<move-verify @result='verifyResult'></move-verify>
		</view>
	</view>
</template>

<script>
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default{
		data(){
			return {
				setHeight:this.$store.state.windowHeight,
				st:'',
				current:0,
				vSt:true,
				count:0
			}
		},
		 components: {
		        moveVerify
		},
		onLoad(option) {
			this.st=JSON.parse(option.st);
		},
		onReady() {
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
		computed:{
			isHeight:function(){
				return this.$store.state.windowHeight+'px'
			},
			isWidth:function(){
				return this.$store.state.windowWeight+'px'
			},
			isZ:function(){
				return this.$store.state.windowHeight-120+'px'
			},
			isSt:function(){
				return this.st
			},
			isPrice:function(){
				let st=this.st;
				let cid='c'+uni.getStorageSync('cid');
				let str01=[];
				if(st!=''&&st!=undefined&&st!=null){
					if(st[this.current].ctypeStr!=undefined&&st[this.current].ctypeStr!=''&&st[this.current].ctypeStr!=null){
						str01=st[this.current].ctypeStr.split('_')
					}
				}
				let cidArr=[];
				let priceArr=[];
				
				for(let i in str01){
					let arr01=str01[i].split('-');
					cidArr.push(arr01[0]);
					priceArr.push(arr01[1])
				}
				let price=0;
				for(let h in cidArr){
					if(cidArr[h]==cid){
						price=priceArr[h]
					}
				}
				return price
			}
		},
		methods: {
			verifyResult:function(){
				let oid=parseInt(this.st[this.current].oid);
				//console.log(oid)
				let openId=uni.getStorageSync('openid');
				let _this=this;
				uni.request({
					url:_this.$store.state.baseurl+'/userOrder/create',
					data:{
						openId:openId,
						oId:oid
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						//let cart=res.data.data;
						//_this.$store.commit('setCart',cart);
						//console.log(_this.$store.state.cart)
						//console.log(typeof res)
						if(res.data.data==1){
							_this.st.splice(_this.current,1)
						}
						
						if(_this.st.length==0){
							uni.reLaunch({
								url:'/pages/index01/index'
							})
						}
					},
					fail(res) {
						//console.log(res)
					}
				})
			},
			getThis:function(e){
				//console.log(e.detail.current)
				this.current=e.detail.current
			},
			goback:function(){
				this.$store.commit('setSt',false);
				//console.log(123)
				uni.reLaunch({
					url:'/pages/index01/index'
				})
			},
			setImg:function(){
				if(this.count!=1){
					this.vSt=true;
					console.log('stop')
				}
			},
			closeImg:function(){
				if(this.count!=1){
					this.vSt=false;
					console.log('playing')
					this.count=1
				}
			}
		}
	}
</script>

<style>
	.contentArea{
		width: 100%;
	}
	.content{
		height: 260px;
		font-weight: 600;
	}
	.contentTitle{
		color: white;
		font-size: 16px;
	}
	
	.isShow{
		display: block;
	}
	.isClose{
		display: none;
	}
</style>
