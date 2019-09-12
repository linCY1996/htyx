<template>
	<view class="baseSty" style="font-family: 'Alibaba PuHuiTi'">
	
		<view class='nav' :class="isModel=='iPhone X'?'paddingTop02':'paddingTop01'">
			<view class="title-sty" style="display: flex;flex-direction: row;">
				<view style="flex-grow: 1;" v-on:tap="goback">
					<image src="https://www.mastervan.cn/static/project/dolphin/static/images/back.png" style="width: 16px;height: 16px;" mode=""></image>
				</view>
				<view style="flex-grow: 8;">更换头像</view>
				<view style="flex-grow: 2;"></view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 200px;">
			<avatar 
				selWidth="200px" selHeight="200px" @upload="myUpload" :avatarSrc="url"
				avatarStyle="width: 200px; height: 200px; border-radius: 100%;border:1px solid #CCCCCC">
			</avatar>
		</view>
	</view>
</template>

<script>
//script部分
    import avatar from "../../components/yq-avatar/yq-avatar.vue";
    export default {
        data() {
            return {
                url: "",
				status:''
            }
        },
		onLoad(option) {
			//console.log(option.pic)
			this.status=option.status
			let _this=this;
			if(option.status==0){
				_this.url=uni.getStorageSync('headpic')
			}else{
				this.url=option.pic;
			}
		},
		computed: {
			isModel:function(){
				return this.$store.state.model;
			},
		},
        methods: {
            myUpload(rsp) {
                this.url = rsp.path; //更新头像方式一
                //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
				//console.log(this.url)
				let _this=this;
				let userType=uni.getStorageSync('userType')
				let openId=uni.getStorageSync('openid');
				if(this.status==0){
					uni.setStorageSync('picUrl',rsp.path)
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.uploadFile({
					    url: _this.$store.state.baseurl+'/user/updateHeadPicUrl',
						filePath: rsp.path,
						name: 'file',
					    formData: {
							openId:openId
						},
					    method: 'POST',
					    header: {
					        "Content-Type": "multipart/form-data"
					    },
					    success: (res) => {
							this.$store.commit('setQiangSt',false);
							let type=uni.getStorageSync('userType');
							if(type==2){
								uni.navigateTo({
									url:'/pages/index/index'
								})
							}else if(type==3){
								uni.navigateTo({
									url:'/components/staffpages/index'
								})
							}
					    }
					});
				}
            },
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			}
        },
        components: {
            avatar
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
	.paddingTop01{
		padding-top: 30px;
	}
	.paddingTop02{
		padding-top: 50px;
	}
</style>
