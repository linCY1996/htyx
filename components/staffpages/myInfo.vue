<template>
	<view class="baseSty" :style="{'height':Height+'px'}">
		<view class='nav'>
			<view class="whiteBlock1" :style="{'height': stateBarHeight+'px'}"></view>
			<view class="whiteBlock2" :style="{'padding-top': stateBarHeight+'px'}">
				<view class="title-sty" style="display: flex;flex-direction: row;">
				
					<view style="flex-grow: 1;z-index: 999;" v-on:tap="goback">
						<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
					</view>
					<view style="flex-grow: 8;">个人资料</view>
					<view style="flex-grow: 2;"></view>
				</view>	
			</view>
		</view>
		<view class="myVideo">
			
		</view>
		<view class="myPics">
			
		</view>
		<view class="myInfo">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Height: '',
				stateBarHeight: ''
			}
		},
		onReady() {
			this.Height=this.$store.state.windowHeight
			this.stateBarHeight = this.$store.state.statusBarHeight
		},
		methods: {
			goback: function(){
				uni.navigateBack({})
			},
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
