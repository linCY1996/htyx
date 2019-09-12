<template>
	<view class="baseSty" style="font-family: 'Alibaba PuHuiTi'">
	
		<view class='nav'>
			<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
			<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
				<view class="title-sty" style="display: flex;flex-direction: row;">
				
					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view style="flex-grow: 8;">搜索结果</view>
					<view style="flex-grow: 2;"></view>
				</view>	
			</view>
		</view>
		<view>
			<swiper :style="{'height':ismH+'px'}" style="width: 98%;margin: 0 auto;position: fixed;margin-left: 1%;" :current="currentTab" @change="swiperTab">
				<swiper-item>
					<scroll-view :style="{'height':isHeight+'px'}" style="width: 110%;" scroll-y="true" @scrolltolower="lower1">
					
						<view style="width: 90.6%;">
							<content :list="dataList"></content>
						</view>
					
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class='noCard' style="width: 90%;margin: 0 auto;box-sizing: border-box;border: 1px solid #dcdfe6;text-align: center;" v-if="dataList.length===0">
				暂无信息
			</view>
		</view>
	</view>
</template>

<script>
	import content from '../../components/xyz-masonry/xyz-masonry.vue'
	export default{
		data(){
			return {
				ismH:9999,
				currentTab: 0,
				tabClick: 0,
				navIndex:'',
				dataList:[],
				isPage:1,
				addPage:1,
				iscid:1,
				jobArr:'',
				jobId:'',
				cIndex:1,
				inputContent:'',
				Height: '',
				stateBarHeight: ''
			}
		},
		components: {
			content
		},
		computed:{
			isModel:function(){
				return this.$store.state.model;
			},
			isHeight:function(){
				return this.$store.state.windowHeight-51
			}
		},
		onLoad(option) {
			this.inputContent=option.content
			this.Height=this.$store.state.windowHeight
			this.stateBarHeight = this.$store.state.statusBarHeight
		},
		onReady() {
			this.getResult();
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
				
						resolve()
					}, 1000)
				})
			},
			lower1(){
				// uni.showLoading({
				// 	content: '加载中'
				// })
				
				let openid=uni.getStorageSync('openid');
				// console.log(openid)
				let _this=this;
		        console.log(_this.addPage)
				uni.request({
					url:_this.$store.state.baseurl+'/user/findCondition',
					data:{
						openId:openid,
						page:_this.addPage,
						cid:_this.cIndex
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						//uni.hideLoading()
						let list=res.data.data.list;
						console.log(list)
						if(list!=undefined){
							for(let i in list){
								_this.dataList.push(list[i]);
							}
							_this.addPage+=1
						}
						console.log(_this.dataList)
					}
				})
			},
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			getResult:function(){
				let openid=uni.getStorageSync('openid');
				// console.log(openid)
				let _this=this;
				uni.request({
					url:_this.$store.state.baseurl+'/user/findCondition',
					data:{
						openId:openid,
						page:_this.isPage,
						condition:_this.inputContent
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						//uni.hideLoading()
						let list=res.data.data.list;
						_this.dataList=list;
						_this.addPage+=1;
						//console.log(_this.dataList)
					}
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
