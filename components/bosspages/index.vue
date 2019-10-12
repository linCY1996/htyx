<template>
	<view class="baseSty" :style="{'height':isBgH+'px'}">
		<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend.self="refreshEnd">
			<refresh ref="refresh" :isRequest="isRequest" :cid="cIndex"></refresh>
			<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
				<view class="title-sty">
					<view>海豚美芽</view>
				</view>
				<!-- 搜索 -->
				<view class='searchInput999'>
					<view class='searchBox999'>
						<image src='https://www.mastervan.cn/static/project/dolphin/static/icon-search.png' class='search999'></image>
					</view>
					<input class='input999' placeholder="输入关键词" v-model="ContentMsg" maxlength="100"></input>
					<text style="color: #999;font-size: 14px" v-on:tap.stop="toSearch">搜索</text>
				</view>
				<!-- 导航栏 -->
				<scroll-view class='navTab' scroll-x="true" style=" white-space: nowrap; display: flex;overflow-y: hidden;" >
				<!--  display: inline-block-->
				  <view style="width: 80px; height: 44px; display: inline-block;text-align: center;line-height: 48px;" v-for="(item,index) in jobArr" :key="index" class="navTabItem" :class="index==navIndex?'navSelect':''" v-on:tap.stop='navClick(index)'>{{item}}</view>
				</scroll-view>
			</view>
			<swiper :style="{'height':ismH+'px'}" style="width: 98%;margin: 0 auto;position: fixed;margin-left: 1%;" :current="currentTab" @change.stop="swiperTab">
				<swiper-item v-for="(item,index) in jobId" :key="index" style="margin-top: 170px;">
					<scroll-view :style="{'height':contentH+'px'}" style="width: 110%;" scroll-y="true" @scrolltolower.stop="lower1">
						<view style="width: 90.6%;">
							<content :list="dataList"></content>
						</view>
					</scroll-view>
				</swiper-item> 
			</swiper>
		</view>
	</view>
	
</template>

<script>
	import refresh from "../refresh.vue";
	import content from '../xyz-masonry/xyz-masonry.vue';
	import MescrollUni from "../mescroll-uni/mescroll-uni.vue"; 
	export default {
		components: {
			refresh,
			content,
			MescrollUni
		},
		data() {
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
				cid: null,
				ContentMsg:'', //搜索
			}
		},
		watch: {
			masonryList(newVal, oldVal) {
				this.handleData(newVal);
			}
		},
		computed:{
			isModel:function(){
				return this.$store.state.model;
			},
			isHeight:function(){
				return this.$store.state.windowHeight-51
			},
			isBgH:function(){
				return this.$store.state.windowHeight-220
			},
			contentH:function(){
				return this.$store.state.windowHeight-220
			}
		},
		onLoad() {
			this.handleData(this.masonryList);
			
		},
		onReady() {
			var cid = JSON.stringify(this.cIndex)
			this.$store.commit('changeCid',cid)
			this.initData()
		},
		methods: {
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
						// this.navClick(this.tabClick)
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
		
			isRequest(){
				return new Promise(function( reslove,reject ) {
						reslove()
				    })
			
			},
			refresh(){
				var _this = this
				   let openid=uni.getStorageSync('openid');
				   let page = _this.isPage
				   let cid = _this.cIndex
				   let addPage = _this.addPage
				   addPage = 1
				   _this.addPage = addPage
				   _this.$http.getList({
					   openId:openid,
					   page: page,
					   cid: cid
				   }).then(res => {
					   let list=res.data.data.list;
					   if(list!=undefined){
					   	_this.dataList=list;
					   }
				   })
			},
			// 导航栏点击
			navClick(index) {
				this.currentTab = index	//设置swiper的第几页
				this.tabClick = index	//设置导航点击了哪一个
				this.navIndex=index
				let openid=uni.getStorageSync('openid');
				let _this=this;
				let cIndex=this.jobId[index];
				_this.$store.commit('changeCid',cIndex)
				_this.cIndex=cIndex;
				_this.$http.getList({
					openId:openid,
					page:_this.isPage,
					cid:cIndex
				}).then(res => {
					let list=res.data.data.list;
					if(list!=undefined){
						_this.dataList=list;
					}
				})
				
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current
				let cIndex=this.jobId[index];
				this.cIndex=cIndex;
				 this.currentTab = index	//设置swiper的第几页
				 this.tabClick = index	//设置导航点击了哪一个
				 this.navIndex=index//获取索引
				this.navClick(index)
			},
			lower1(){
				let openid=uni.getStorageSync('openid');
				let _this=this;
				_this.addPage+=1;
				_this.$http.getList({
					openId:openid,
					page:_this.addPage,
					cid:_this.cIndex
				}).then(res => {
					let list=res.data.data.list;
					if(list!=undefined){
						for(let i in list){
							_this.dataList.push(list[i]);
						}
					}
				})
			},
			initData:function(){
				let openid=uni.getStorageSync('openid');
				let _this=this;
				_this.$http.getWork({
					openId:openid
				}).then(res => {
					let arr1=[];
					let arr2=[];
					let dataArr=res.data.data;
					for(let i in dataArr){
						arr1.push(dataArr[i].cname);
						arr2.push(dataArr[i].cid)
					}
					_this.jobArr=arr1;
					_this.jobId=arr2;
				})
				_this.$http.getList({
					openId:openid,
					page:_this.isPage,
					cid:1
				}).then(res => {
					let list=res.data.data.list;
					if(list!=undefined){
						for (let i in list) {
							_this.dataList.push(list[i]);
						}
					}
				})
			},
			toSearch:function(){
				let _this=this;
				uni.navigateTo({
					url:'/pages/search/index?content='+_this.ContentMsg
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}

	.noCard {
		width: 96%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}

	.navTab {
		display: flex;
		width: 96%;
		height: 50px;
		margin: 0 auto;
		position: relative;
		color: white;
	}

	.navTabItem {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 15px;
	}
	.navSelect{
		border-bottom: 5rpx solid white;
		font-weight: 900;
	}

	.nav {
		position: fixed;
		left: 0;
		color: white;
		width: 100%;
		height: 126px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		z-index: 998;
	}

	.searchInput999 {
		width: 96%;
		margin: 0 auto;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
		background-color: rgba(255,255,255,0.8);
	}

	.search999 {
		width: 32upx;
		height: 32upx;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input999 {
		color: #999;
		width: 76%;
	}
	
	.title-sty{
		font-size: 18px;
		font-weight: 600;
		color: white;
		letter-spacing: 4px;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.baseSty{
		width: 100%;
		overflow: hidden;
		font-family: 'Alibaba PuHuiTi';
		background: url('http://47.108.66.16:8088/static/project/dolphin/static/images/beijing06.png');
		background-repeat: no-repeat;
		background-size: 100%;
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
