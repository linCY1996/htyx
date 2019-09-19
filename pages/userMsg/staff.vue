<template>
	<view class="" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/背景02.png) no-repeat;background-size: cover;height: 700px;width: 100%;padding-top: 2%;font-family: Alibaba PuHuiTi;">
		<my-header></my-header>
		<form @submit="submitData">
			<view class="normal-color" style="height: 110px;overflow: hidden;">
				<view class="" style="width: 80px;height: 80px;margin: 0 auto;border: 1px solid #9D9D9D;border-radius: 160upx;background-color: white;overflow: hidden">
					<image style="width: 80px;height: 80px;" :src="avatar" mode="aspectFit"></image>
				</view>
				<!-- <view v-on:tap="changHeadpic" class="" style="width: 82px;height: 82px;font-size: 80upx;z-index: 9999;position: relative;top: -82px;margin: 0 auto;line-height: 82px;background-color: rgba(0,0,0,0.5);text-align: center;border-radius: 82px;">+</view> -->
			</view>
			
			<view class="normal-color" style="margin-left: 10%;margin-right: 10%;">
				<view class="setFlex title-base">
					<view style="flex-grow: 4;">昵称</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">年龄</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">性别</view>
				</view>
				<view class="setFlex title-base">
					<view style="flex-grow: 4;">
						<input type="text" value="" name='userName' maxlength="6" class="inputShadow"/>
					</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">
						<input type="number" value="" name='age' maxlength="2" class="inputShadow"/>
					</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;flex-basis: 150px;">
						<picker @change="bindSexChange" :value="sexIndex" :range="sexArr" style="line-height: 30px;" class="inputShadow">
							<view class="uni-input">{{sexArr[sexIndex]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="setFlex title-base">
					<view class="">
						<view class="" style="width: 100px;">职业选择</view>
					</view>
					<view class="">
						<view class="" style="width: 28px;"></view>
					</view>
					<view class="">联系电话</view>
				</view>
				<view class="setFlex title-base">
					<view class="" style="width: 100px;">
						 <picker @change="bindJobChange" :value="jobIndex" :range="jobArr" style="line-height: 30px;" class="inputShadow">
							<view class="uni-input">{{jobArr[jobIndex]}}<text class="iconfont icon-xiasanjiaoxing" style="margin-left: 20rpx;"></text></view>
						</picker>
					</view>
					<view class="">
						<view class="" style="width: 28px;"></view>
					</view>
					<view class="" style="flex-grow: 1;">
						<input class="inputShadow" type="number" name='phone' maxlength="20" value=""/>
					</view>
				</view>
				
				<view class="setFlex title-base">
					<view class="" style="flex-grow: 1;">
						现住地
					</view>
				</view>
				<view class="setFlex title-base">
					<picker mode="region" @change="bossArea" style="display: block;width: 100%;text-align: center;line-height: 30px;" class="inputShadow">
						<view v-if="city[1]==''&&city[2]==''">
							{{city[0]}}<text class="iconfont icon-xiasanjiaoxing"></text>
						</view>
						<view v-if="city[1]!=''&&city[2]!=''">
							{{city[0]}}-{{city[1]}}-{{city[2]}}
						</view>
					</picker>
				</view>
				
				
				<view class="setFlex title-base">
					<view style="flex-grow: 4;">身高</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">体重</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">胸围</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">臀围</view>
				</view>
				<view class="setFlex title-base">
					<view style="flex-grow: 4;">
						<input name='height' type="number" value="" maxlength="3" class="inputShadow" placeholder="cm" placeholder-style="color:#EAEAEA;"/>
					</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">
						<input name='weight' type="number" value="" maxlength="3" class="inputShadow" placeholder="kg" placeholder-style="color:#EAEAEA"/>
					</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">
						<input name='bust' type="number" value="" maxlength="3" class="inputShadow" placeholder="cm" placeholder-style="color:#EAEAEA"/>
					</view>
					<view style="width:28px"></view>
					<view style="flex-grow: 4;">
						<input name='hipLine' type="number" value="" maxlength="3" class="inputShadow" placeholder="cm" placeholder-style="color:#EAEAEA"/>
					</view>
				</view>
				
				
				<view class="setFlex title-base" style="display: block;width: 100%;">个人介绍视频(10秒以内)</view>
				<view class="setFlex title-base">
					<view class="inputBorder uplicense">
						<text v-if="!upvideo">+</text>
					</view>
				</view>
				<view class="setFlex title-base" style="width: 100%;position: relative;top:-178px;" v-on:tap="upVideo">
					<view v-if="video==''" style="width: 96%;height: 158px;"></view>
					<video v-if="video!=''" :src="video" style="width: 96%;margin: 0 auto;height: 158px;" controls></video>
				</view>
				
				
				<view class="" style="position: relative;top:-178px">
					<view class="setFlex title-base" style="display: block;width: 100%;">个人模卡</view>
					<view class="setFlex title-base">
						<view class="inputBorder uplicense">
							<text v-if="!uplicense">+</text>
						</view>
					</view>
					<view class="setFlex title-base" style="width: 100%;position: relative;top:-180px;" v-on:tap="upLicense">
						<image :src="License" style="height: 160px;" mode="aspectFit"></image>
					</view>
				</view>
				
				<view class="" style="position: relative;top:-350px">
					<view class="setFlex title-base" style="display: block;width: 100%;">个人照片(最多三张,第一张会优先展示,请仔细选择)</view>
					<view class="setFlex title-base">
						<view class="inputBorder uplicense">
							<text v-if="!upimg">+</text>
						</view>
					</view>
					<view class="setFlex title-base" style="width: 100%;height: 160px;position: relative;top:-178px;" v-on:tap="upImg">
						<view v-for="(item,index) in img" :key='index' style="display: inline-block;width: 80px;height: 160px;line-height: 160px;margin: 0 auto;">
							<image style="display: inline;height: 60px;" :src="item" mode="aspectFit"></image>
						</view>
					</view>
					
					<view class="setFlex title-base" style="width: 100px;margin: 0 auto;position: relative;top:-160px">
						<button form-type="submit" style="width: 100px;height: 34px;font-size: 15px;background-color: rgb(53,207,122);line-height: 34px;color: white;">就这样</button>
					</view>
					
					<view style="display: none;">{{pic}}</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				city:['选择地址','',''],
				bossarea:'',
				avatar:'',
				upAvatar:'',
				License:'',
				uplicense:false,
				video:'',
				upvideo:false,
				img:'',
				upimg:false,
				sex:0,
				cid:1,
				jobIndex:0,
				sexIndex:0,
				jobArr:'',
				sexArr:['女','男'],
				jobId:''
			}
		},
		computed: {
			init:function(){
				let openid=uni.getStorageSync('openid');
				// console.log(openid)
				let _this=this;
				_this.$http.getWork({
					openId:openid
				}).then(res =>{
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
				return true;
			}
		
		},
		onReady() {
			// if(uni.getStorageSync('picUrl')!=undefined&&uni.getStorageSync('picUrl')!=''&&uni.getStorageSync('picUrl')!=null){
			// 	this.avatar=uni.getStorageSync('picUrl')
			// }else{
				this.avatar=uni.getStorageSync('headpic')
			// }
			// 
			var _this = this
			// 判断用户是否注册,已注册用户类型
			let openid=uni.getStorageSync('openid')
			if(openid==null||openid==undefined||openid==''){
				
			}else{
				uni.request({
					url:_this.$store.state.baseurl+'/user/verifyRole',
					data:{
						openId:openid
					},
					method:"POST",
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						let type=res.data.data;
						//console.log(type)
						if(type==-1){
							
						}else if(type==-2){
							// uni.reLaunch({
							// 	url:'/pages/login/index'
							// })
						}else if(type==0){
							uni.reLaunch({
								url:'/pages/status/index'
							})
						}else if(type==2){
							uni.setStorageSync('userType',2)
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}else if(type==3){
							uni.setStorageSync('userType',3)
							uni.reLaunch({
								url:'/pages/index01/index'
							})
						}
					}
				})
			}
		},
		onLoad(option) {
			//console.log('index onload')
			//this.$store.dispatch('get_data');
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
			// if(uni.getStorageSync('picUrl')!=undefined&&uni.getStorageSync('picUrl')!=''&&uni.getStorageSync('picUrl')!=null){
			// 	this.avatar=uni.getStorageSync('picUrl')
			// }else{
				this.avatar=uni.getStorageSync('headpic')
			// }
		},
		onShow() {
			// if(uni.getStorageSync('picUrl')!=undefined&&uni.getStorageSync('picUrl')!=''&&uni.getStorageSync('picUrl')!=null){
			// 	this.avatar=uni.getStorageSync('picUrl')
			// }else{
				this.avatar=uni.getStorageSync('headpic')
			// }
		},
		onHide() {
			// if(uni.getStorageSync('picUrl')!=undefined&&uni.getStorageSync('picUrl')!=''&&uni.getStorageSync('picUrl')!=null){
			// 	this.avatar=uni.getStorageSync('picUrl')
			// }else{
			// 	this.avatar=uni.getStorageSync('headpic')
			// }
		},
		methods:{
			// 性别选择
			bindSexChange: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.sexIndex = e.target.value
			},
			// 职业选择
			bindJobChange: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.jobIndex = e.target.value
			},
			upBoss:function(){
				uni.navigateTo({
					url:'/pages/status/index'
				})
			},
			bossArea:function(e){
				this.city='';
				this.city=e.detail.value
				// console.log(typeof this.city)
			},
			changHeadpic:function(){
				uni.navigateTo({
					url:'/pages/upHead/index?status='+0
				})
			},
			upLicense:function(){
				var that = this;
				wx.chooseImage({
				count: 1, 
				sizeType: ['compressed'], 
				sourceType: ['album', 'camera'], 
				success: function (res) {
					console.log(res)
				var avatar = res.tempFilePaths;
				that.License=avatar;
				that.uplicense=true;
				that.$store.commit('setQiangSt',true)
				let upLv=that.$store.getters.isSt;
				console.log(upLv)
				},
				fail: function () {
				// fail
				},
				complete: function () {
				// complete
				}
				})
			},
			upVideo:function(){
				var _this = this;
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 10,
					success: function (res) {
					  // self.src = res.tempFilePath;
					  let v = res.tempFilePath
					  _this.video = v
					  _this.upvideo = true;
					  console.log(res)
					},
					fail: function(res) {
					    console.log(res)
					},
				});
			},
			upImg:function(){
				var that = this;
				// var childId = wx.getStorageSync("child_id");
				// var token = wx.getStorageSync('token');
				wx.chooseImage({
				count: 3, // 最多可以选择的图片张数，默认9
				sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
				success: function (res) {
				//console.log(res.tempFilePaths)
				var avatar = res.tempFilePaths;
				that.img=avatar;
				that.upimg=true;
				//console.log(that.img)
				},
				fail: function () {
				// fail
				},
				complete: function () {
				// complete
				}
				})
			},
			submitData:function(e){
				let _this=this;
				let openid=uni.getStorageSync('openid');
				e.detail.value.address=this.city[0]+this.city[1]+this.city[2];				
				e.detail.value.openId=openid;
				e.detail.value.roleType=3;
				e.detail.value.headUrl=this.avatar;
				e.detail.value.sex=this.sexIndex;
				e.detail.value.cid=this.jobId[this.jobIndex];
				e.detail.value.age=e.detail.value.age;
				e.detail.value.height=e.detail.value.height;
				e.detail.value.weight=e.detail.value.weight;
				e.detail.value.bust=e.detail.value.bust;
				e.detail.value.hipLine=e.detail.value.hipLine;
				if(e.detail.value.address=='选择地址'||e.detail.value.userName==''||e.detail.value.age==''||e.detail.value.phone==''||e.detail.value.height==''||e.detail.value.weight==''||e.detail.value.bust==''||e.detail.value.hipLine==''||this.uplicense==false||this.upvideo==false||this.upimg==false){
					uni.showModal({
						title:'提示',
						content:'请填写完整信息'
					})
					return false
				}
				// else if (!(/^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$/.test(e.detail.value.phone))){
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请填写正确的手机号'
				// 		})
				// }
				
				uni.showLoading();
				console.log(e)
				uni.request({
					url:_this.$store.state.baseurl+'/user/insertUser',
					data: e.detail.value,
					method: 'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success: function (res) {
						if(res.data.data==1){
							console.log(_this.video)
							uni.uploadFile({
							    url: _this.$store.state.baseurl+'/user/videoUpload',
								filePath: _this.video,
								name: 'videoUrl',
								formData:{
									openId:e.detail.value.openId
								},
							    method: 'POST',
								header: {
								    "Content-Type": "multipart/form-data"
								},
							    success: (res) => {
									console.log(res)	
							    }
							});
							//头像
							uni.uploadFile({
							    url: _this.$store.state.baseurl+'/user/fileUpload',
								filePath: _this.avatar,
								name: 'headUrl',
							    formData: {
									openId:openid
								},
							    method: 'POST',
							    header: {
							        "Content-Type": "multipart/form-data"
							    },
							    success: (res) => {
							    }
							});
							
							//视频
					
							
							//模卡
							 uni.uploadFile({
							    url: _this.$store.state.baseurl+'/user/fileUpload',
								filePath: _this.License[0],
								name: 'card',
							    formData:{
							    	openId:e.detail.value.openId
							    },
							    method: 'POST',
							    header: {
							        "Content-Type": "multipart/form-data"
							    },
							    success: (res) => {
									
							    }
							});
							
							//照片
							for (let i=0;i<_this.img.length;i++) {
								// console.log(_this.img[2])
								uni.uploadFile({
								    url: _this.$store.state.baseurl+'/user/fileUpload',
									filePath: _this.img[i],
									name: 'selfPhoto',
									formData:{
										openId:e.detail.value.openId
									},
								    method: 'POST',
								    header: {
								        "Content-Type": "multipart/form-data"
								    },
								    success: (res) => {
								        //openId、或SessionKdy存储//隐藏loading
								        uni.hideLoading();
										uni.reLaunch({//信息更新成功后跳转
										    url: '/pages/status/index'
										});
								    }
								});
							}
						}else{
							//console.log('上传失败')
							uni.hideLoading();
						}
						
					}
				})
			}
		}
	}
</script>

<style>
	.normal-color{
		font-size: 16px;
		color: #cccccc;
	}
	.setFlex{
		display: flex;
	}
	.inputShadow{ 
		padding-left: 10px;
		height: 30px;
		border-radius: 10rpx;
		border: 1px solid #9D9D9D;
	}
	.inputBorder{
		border: 2px dashed #b4b4b4;
	}
	.title-base{
		margin-bottom: 18px;
	}
	.uplicense{
		width: 100%;
		height: 160px;
		font-size: 80px;
		text-align: center;
		line-height: 160px;
	}
	
	
@font-face {font-family: "iconfont";
  src: url('https://www.mastervan.cn/static/font/iconfont.eot?t=1562922258628'); /* IE9 */
  src: url('https://www.mastervan.cn/static/font/iconfont.eot?t=1562922258628#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAREAAsAAAAACNwAAAP2AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDKgqEbIN/ATYCJAMUCwwABCAFhG0HYBubB8gekoSigEIqAEgAODKUz5db9SuCVLA2z6gKUoE0+kJaT+NKM3py1b0uPNCf+v5UCSYUynkXdZ+XegWMFrzKG7y/UXZmff3P5fTuKvH5rbbT2psH9QKMAwporE29SAokMG8Yu7zIw0AAVL66yNC971CYCPRRBEDOqtcJU8JAqCgnTAhDwcIMMqMwxdncNQALve+THxoHE8ARE/SJA7fdPOj4bPbazE9K3CwcBMLhbADYMoAH1AUIQI6FDg8+SNTFo3KuoCXAZPTj4EOzZ5ePmxMN4TuLtsKvdFDo+sfjCEAqdIUFEjrKhSMTWjTg4UNnGhD40IUGHHzcLHooChENp4B0wBHAc0CoWmpmJCK62uLeUZBb22zOc9oD9vKk0gnrdtViy+dmeLfuaT4ue+eITbur2Q/ura3E5qSqUcuc2OQKyTp3Y8aIVdkxSuObSHNrLV+TOTR+SKEkFpuzDKhNnLRckkCcW5FBpGGTY6Msc7Zkj155ghbvMndz1qg1tZZtwv343JM5K7OleGYwevIJOnHOlslb526etMlKNnTPSVdiK0/s2EMmP5TmXr5+OK3i6M2r8KL7k4Z6lnVtVG+67V5LI68tbnV3tnoTHzl23P/V/3bZyFLO1QplneX+7MhZvwulI0eN+gH2fJPnXdpknGWbZRwo1a/TdMew3dsdd5NZd+Vx7eBOXH+ldkqHTp3FWda4oXOnQmknNxG3zjJ0SvT9VOZL3tazc//QsOyaFRvXtPVo0qV/8fTP9hT7ig6b7cbTf08b7Zs7yNNWygE9eVbVmVVLqpaOSS7FPP/9SGApSbN0fpX16J/vioRYzhJ0rYkluZ5I6DxjaVIJSgFA4nSakwi3FQD4DbfJNXMPf4XfwLbu+WOCve1/JkkAADzuH0qGvsQZzZR4n8LGwhcvbFgnKGLdKGap2hJIxaISZriF5aAo4IVngGQvhlGlNS4FCJO0CDhGecAzqYoKhLogkjQFA5MOQNXRY7kkhYZHshlAbdMBEA47gWNzEngO11GB8BxE6b6DgSPwQA0PKRtKqgeVdtGYU2ce2VUmq+5wSDHNOvXLBzNvUcCpxcUecTjTompYblS/YTrdg4WYNsSUaLG3sa4rsqKFg3J3cBwLBMJyRAsXMrde36frkdYNGihFL6rvDgdBdaFhnHSMh8yljEzlFhaiOM11NPP5wRivIgFOWkVNmXs4RhOlti9rpL6GDdAeilCjmkt5JqqYV2M6nUKm0IQFyboDGxMwEmGySHG/Qoybrj5fh1hEaw1QI6Wpov70quA9bgGg9I3EwBGeCEQkBtguqjPqDBU6rOFSNeR1RH3OylQXkzdcVFLk9jEjz4d6AAAA') format('woff2'),
  url('https://www.mastervan.cn/static/font/iconfont.woff?t=1562922258628') format('woff'),
  url('https://www.mastervan.cn/static/font/iconfont.ttf?t=1562922258628') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://www.mastervan.cn/static/font/iconfont.svg?t=1562922258628#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-xiasanjiaoxing:before {
  content: "\e642";
}

.icon-shangsanjiaoxing:before {
  content: "\e643";
}

.icon-gouwuche:before {
  content: "\e635";
}

.icon-xinxing:before {
  content: "\e7a9";
}

</style>
