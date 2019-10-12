<template>
    <view style="font-family: Alibaba PuHuiTi;">
        <!-- <view v-if="isCanUse"> -->
			<image class="Top" :style="{width:width+'px'}" src="http://47.108.26.160:8080/pictures/fengmian.png" mode="">
				<button class='bottom' style="background: rgba(183, 189, 190, 0.4);font-family: Source Han Sans CN;" type='primary' open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true" lang="zh_CN">
				    授权登录
				</button>
				<view class="msgs">
					*本款小程序将用户和兼职同时融合，用户需要先授权登录，选择不同的角色，确定好不同的身份后，注册信息审核通过之后，用户即可在线下单，兼职人员即可在线接单。*
				</view>
			</image>
            <!-- <view>
                <view class='header'>
					<image src='/static/logo.png'></image>
				</view>
                <view class='content' style="font-size: 32rpx;">
                    <view>海豚印象:申请获取以下权限</view>
                    <text>获得你的公开信息(昵称，头像、地区等)</text>
                </view>
                
            </view> -->
        <!-- </view> -->
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
                isCanUse: uni.getStorageSync('isCanUse')||true,//默认为true
				width:''
            };
        },
		onLoad() {
			this.width = uni.getSystemInfoSync().windowWidth
		},
        methods: {
　　　　　　//登录
            getUserInfo(e) {
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
								uni.hideLoading();
								var msgs = res.data.data
								if(msgs.wxHeadPictureUrl!=null&&msgs.wxHeadPictureUrl!=''){
									uni.setStorageSync('headpic',msgs.wxUser.wxHeadPictureUrl);
								}else{
									uni.setStorageSync('headpic',uni.getStorageSync('pic'))
								}
								uni.setStorageSync('openid', msgs.wxUser.wxOpenid);
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
	.Top {
		position: relative;
		height: 1580rpx;
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
		position: absolute;
		bottom: 160rpx;
		left: 50%;
		transform: translateX(-50%);
        border-radius: 80rpx;
        font-size: 35rpx;
		width: 400rpx;
		text-align: center;
		line-height: 86rpx;
		background: #333333;
		z-index: 10;
    }
	.msgs {
		position: absolute;
		bottom: 15rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 570rpx;
		height: auto;
		font-size: 24rpx;
		font-weight: 500;
		font-family:Source Han Sans CN;
		line-height: 32rpx;
		text-align: center;
		color: #F8F8F8;
	}
</style>