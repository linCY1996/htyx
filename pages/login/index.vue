<template>
    <view style="font-family: Alibaba PuHuiTi;">
        <!-- #ifdef MP-WEIXIN -->
        <view v-if="isCanUse">
            <view>
                <view class='header'>
					<image src='/static/logo.png'></image>
				</view>
                <view class='content' style="font-size: 32rpx;">
                    <view>海豚印象:申请获取以下权限</view>
                    <text>获得你的公开信息(昵称，头像、地区等)</text>
                </view>
                <button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true" lang="zh_CN">
                    授权登录
                </button>
            </view>
        </view>
        <!-- #endif -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                SessionKey: '',
                OpenId: '',
                nickName: '',
                avatarUrl: '',
                isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
            };
        },
		
		onLoad() {
			let _this=this;
			// 判断用户是否注册,已注册用户类型
			let openid=uni.getStorageSync('openid')
			console.log("openid", openid);
			if(openid==null||openid==undefined||openid==''){
				console.log("=+=");
			}else{
				that.$http.changeLogin({
					openId: openid
				}).then(res => {
					let type = res.data.data;
					if (type == -2) {
						// uni.reLaunch({
						// 	url:'/pages/login/index'
						// })
					} else if (type == 0) {
						uni.reLaunch({
							url: '/pages/status/index'
						})
					} else if (type == 2) {
						uni.setStorageSync('userType', 2)
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else if (type == 3) {
						uni.setStorageSync('userType', 3)
						uni.reLaunch({
							url: '/pages/index01/index'
						})
					}
				})
			}
			
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
　　　　　　//登录
            getUserInfo(e) {
				console.log(e);
				var that = this
				if(e.detail.errMsg == 'getUserInfo:fail auth deny') {
						console.log("未点击授权");
				}else if(e.detail.errMsg == 'getUserInfo:ok') {
					uni.login({
					    provider: 'weixin',
					    success: function(loginRes) {
							console.log(loginRes);
							uni.showLoading({
								title: '加载中...',
								mask: false
							});
							var code = loginRes.code;
							that.nickName = e.detail.userInfo.nickName; //昵称
							that.avatarUrl = e.detail.userInfo.avatarUrl; //头像
							uni.setStorageSync('pic', that.avatarUrl)
							uni.setStorageSync('headpic',that.avatarUrl)
							uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
							that.$http.Login({
								code:code,
								name:that.nickName,
								pic:that.avatarUrl
							}).then(res =>{
								console.log("userMsgs", res.data.data);
								uni.hideLoading();
								var msgs = res.data.data
								if(msgs.wxHeadPictureUrl!=null&&msgs.wxHeadPictureUrl!=''){
									uni.setStorageSync('headpic',msgs.wxHeadPictureUrl);
								}else{
									uni.setStorageSync('headpic',uni.getStorageSync('pic'))
								}
								uni.setStorageSync('openid', msgs.wxOpenid);
								uni.navigateTo({
									url:'/pages/identity/index'
								})
							})
					    }
					})
				}
            }
        }
    }
</script>

<style>
    .header {
        margin: 0 auto;
		margin-top: 100rpx;
        border-bottom: 1px solid #ccc;
        text-align: center;
        width: 650rpx;
        height: 300rpx;
        line-height: 450rpx;
    }

    .header image {
        width: 200rpx;
        height: 200rpx;
    }

    .content {
        margin-left: 50rpx;
        margin-bottom: 90rpx;
    }

    .content text {
        display: block;
        color: #9d9d9d;
        margin-top: 40rpx;
    }

    .bottom {
        border-radius: 80rpx;
        margin: 70rpx 50rpx;
        font-size: 35rpx;
    }
</style>