<template>
	<view class="" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/背景02.png) no-repeat;background-size: cover;height: 700px;width: 100%;padding-top: 2%;font-family: Alibaba PuHuiTi;">
		<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
			<view class="title-sty">
				<view>等待审核</view>
			</view>
		</view>
		<view :style="{'height':isHeight+'px'}" style="width: 100%;position: absolute;top:0;background: rgba(0,0,0,0.4);">
			<view style="position: relative;top:160px;left: 16%;">
				<image src="https://www.mastervan.cn/static/project/dolphin/static/images/20190710093447.png" style="width: 70%;" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		computed: {
			isModel:function(){
				return this.$store.state.model;
			},
			isHeight:function(){
				return this.$store.state.windowHeight
			}
		},
		onLoad() {
			
			let openId=uni.getStorageSync('openid'); 
			let _this=this;
			let userType=uni.getStorageSync('userType');
			let t=setInterval(function(){
				uni.request({
				    url: _this.$store.state.baseurl+'/user/userCreateIsNo',
				    data: {
				        openId:openId
				    },
				    method: 'POST',
				    header: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    success: (res) => {
						console.log("==", res.data.data);
						if(res.data.data=='审核通过'){
							//console.log('123')
							clearInterval(t)
							if(userType==2){
								uni.reLaunch({
									url:'/pages/index/index'
								})
								}else if(userType==3){
									uni.reLaunch({
										url:'/pages/index01/index'
								})
							}
						}else if(res.data.data=='审核不通过'){
							clearInterval(t)
							console.log("123");
							uni.setStorageSync('openid', '')
							uni.reLaunch({
								url: '../login/index'
							})
						}else if(res.data.data=='还未审核'){
							//console.log('789')
							//clearInterval(t)
						}
				    }
				});
			},3000)
			
			// uni.connectSocket({
			//   url: 'wss://www.mastervan.cn/userCreate/'+openId
			// });
			// 
			// uni.onSocketOpen(function (res) {
			//   console.log('WebSocket连接已打开！');
			//   console.log(res)
			// });
			// 
			// let userType=uni.getStorageSync('userType');
			// 
			// uni.onSocketMessage(function (res) {
			//   //console.log(typeof res.data);
			//   let st=res.data;
			//   uni.closeSocket();
			//   
			//   if(st=='审核通过'){
			// 	  if(userType==2){
			// 		  uni.navigateTo({
			// 		  	url:'/pages/index/index'
			// 		  })
			// 	  }else if(userType==3){
			// 		  uni.navigateTo({
			// 		  	url:'/pages/index01/index'
			// 		  })
			// 	  }
			//   }else{
			// 	  uni.closeSocket();
			//   }
			// });
			// 
			// uni.onSocketClose(function (res) {
			//   console.log('WebSocket 已关闭！');
			// });
			// uni.onSocketError(function (res) {
			//   console.log('connent fail')
			//   uni.connectSocket({
			//     url: 'wss://www.mastervan.cn/userCreate/'+openId
			//   });
			// });
			
		},
		onShow() {
			// let openId=uni.getStorageSync('openid');
			// let _this=this;
			// let userType=uni.getStorageSync('userType');
			// let t=setInterval(function(){
			// 	uni.request({
			// 	    url: _this.$store.state.baseurl+'/user/userCreateIsNo',
			// 	    data: {
			// 	        openId:openId
			// 	    },
			// 	    method: 'POST',
			// 	    header: {
			// 	        "Content-Type": "application/x-www-form-urlencoded"
			// 	    },
			// 	    success: (res) => {
			// 	        //openId、或SessionKdy存储//隐藏loading
			// 	        //console.log(res.data.data)
			// 			if(res.data.data=='审核通过'){
			// 				//console.log('123')
			// 				clearInterval(t)
			// 				if(userType==2){
			// 					uni.navigateTo({
			// 						url:'/pages/index/index'
			// 					})
			// 					}else if(userType==3){
			// 						uni.navigateTo({
			// 							url:'/pages/index01/index'
			// 					})
			// 				}
			// 			}else if(res.data.data=='审核不通过'){
			// 				//console.log('456')
			// 				clearInterval(t)
			// 				
			// 			}else if(res.data.data=='还未审核'){
			// 				//console.log('789')
			// 				//clearInterval(t)
			// 			}
			// 	    }
			// 	});
			// },3000)
		}
	}
</script>

<style>
	.paddingTop01{
		padding-top: 30px;
	}
	.paddingTop02{
		padding-top: 50px;
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
</style>
