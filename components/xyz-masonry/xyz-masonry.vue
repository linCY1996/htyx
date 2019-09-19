<template>
	<view  style="">
		<view style="display: flex;justify-content: space-between;" class="masonry ">
			<view style="width: 49%;border-radius: 8px;" >
				<view class="card" v-for="(item, index) in list" v-if="index%2==0&&list!=''" :key="index" v-on:tap.stop="toOrder(item.userId)" style="background: white;">
					<image class="imgBase"
						:src="item.photoList[0]" 
						:mode="mode"
						style="width: 100%;"
						lazy-load
					></image>
					
		
					<view style="position: relative;top:-32px;height: 30px;line-height: 30px;display: flex;flex-direction: row;justify-content: space-between;" class="jian">
						
						<view style="display: inline-block;width: 26px;height: 26px;font-size: 26px;" v-on:click.stop="shou(item.userId)" class='iconfont icon-xinxing iconBase'></view>
						<view v-for="(o,i) in guan" :key='i' >
							<view style="display: inline-block;width: 26px;height: 26px;font-size: 26px;margin-left: -26px;" v-if="o==item.userId" class='iconfont icon-xinxing redxing' v-on:click.stop="cancel(item.userId)"></view>
						</view>
						<label style="width: 100%;"></label>
						<view style="display: inline-block;width: 26px;height: 26px;font-size: 30px;margin-right: 4px;" v-on:click.stop="buy(item.userId)" class='iconfont icon-gouwuche iconBase'></view>
					</view>
					<view style="position: relative;top: -26px;">
						<view style='font-size: 16px;font-weight: 700;margin: 0 auto;border-bottom: 1px solid #DDDDDD;line-height: 2;text-align: center;'>{{item.userName}}</view>
						<view style="font-size: 14px;font-weight: 600;color: #999999;display: flex;align-items: flex-start;line-height: 2;">
							<view style="display:inline-block;width: 50px;text-align: center;">身高</view>
							<view style="display:inline-block;width: 50px;text-align: center;">体重</view>
						</view>
								
						<view style="font-size: 14px;color: #cccccc;display: flex;align-items: flex-start;">
							<view style="display:inline-block;width: 50px;text-align: center;height: 30px; line-height: 30px;color: #f09a38;">{{item.partTimeMessage.height}}CM</view>
							<view style="display:inline-block;width: 50px;text-align: center;height: 30px; line-height: 30px;color: #f09a38;">{{item.partTimeMessage.weight}}KG</view>
							<view style="display:inline-block;width: 80px;text-align: right;font-size: 20px;font-weight: 600;color: #eb5829;height: 30px; line-height: 30px;">{{item.partTimeMessage.price}}<text style="font-size: 12px;">元/场</text></view>
						</view>
						
						<view style="color: white;display: flex;align-items: flex-start;flex-wrap: wrap;margin-left: 6px;margin-right: 6px;margin-bottom: 6px;">
							<view v-if="isTag!=''" v-for="(tag,tagIndex) in isTag[index]" :key="tagIndex">
								<view v-if="tag!=''&&tag!=undefined" :style="{'background-color':tagColor[tagIndex]}" style="display:inline-block;width: 40px;font-size: 10px;text-align: center;margin-right: 6px;margin-top: 6px;border-radius: 8px;color: white;">{{tag}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="width: 49%;border-radius: 8px;" >
				<view class="card" v-for="(item, index) in list" v-if="index%2!=0&&list!=''" :key="index" v-on:tap.stop="toOrder(item.userId)" style="background: white;">
					<image class="imgBase"
						:src="item.photoList[0]"
						:mode="mode"
						style="width: 100%;"
						lazy-load
					></image>
					<view style="position: relative;top:-32px;height: 30px;line-height: 30px;display: flex;justify-content: flex-start;" class="jian">
						
						<view style="display: inline-block;width: 26px;height: 26px;font-size: 26px;" v-on:click.stop="shou(item.userId)" class='iconfont icon-xinxing iconBase'></view>
						<view v-for="(o,i) in guan" :key='i'>
							<view style="display: inline-block;width: 26px;height: 26px;font-size: 26px;margin-left: -26px;" v-if="o==item.userId" class='iconfont icon-xinxing redxing' v-on:click.stop="cancel(item.userId)"></view>
						</view>
						<label style="width: 100%;"></label>
						<view style="display: inline-block;width: 26px;height: 26px;font-size: 30px;margin-right: 4px;" v-on:click.stop="buy(item.userId)" class='iconfont icon-gouwuche iconBase'></view>
					</view>
					<view style="position: relative;top: -26px;">
						<view style='font-size: 16px;font-weight: 700;margin: 0 auto;border-bottom: 1px solid #DDDDDD;line-height: 2;text-align: center;'>{{item.userName}}</view>
						<view style="font-size: 14px;font-weight: 600;color: #999999;display: flex;align-items: flex-start;">
							<view style="display:inline-block;width: 50px;text-align: center;">身高</view>
							<view style="display:inline-block;width: 50px;text-align: center;">体重</view>
						</view>
								
						<view style="font-size: 14px;color: #cccccc;display: flex;align-items: flex-start;">
							<view style="display:inline-block;width: 50px;text-align: center;height: 30px; line-height: 30px;color: #f09a38;">{{item.partTimeMessage.height}}CM</view>
							<view style="display:inline-block;width: 50px;text-align: center;height: 30px; line-height: 30px;color: #f09a38;">{{item.partTimeMessage.weight}}KG</view>
							<view style="display:inline-block;width: 80px;text-align: right;font-size: 20px;font-weight: 600;color: #eb5829;height: 30px; line-height: 30px;">{{item.partTimeMessage.price}} <text style="font-size: 12px;">元/场</text></view>
						</view>
						
						<view style="color: white;display: flex;align-items: flex-start;flex-wrap: wrap;margin-left: 6px;margin-right: 6px;margin-bottom: 6px;">
							<view v-if="isTag!=''" v-for="(tag,tagIndex) in isTag[index]" :key="tagIndex">
								<view v-if="tag!=''&&tag!=undefined" :style="{'background-color':tagColor[tagIndex]}" style="display:inline-block;width: 40px;font-size: 10px;text-align: center;margin-right: 6px;margin-top: 6px;border-radius: 8px;color: white;">{{tag}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			default: 'widthFix' //若给定图片宽高，设置scaleToFill
		},
		imgWidth: {
			type: Number,
			default: 340 //若给定图片宽高，设置scaleToFill
		},
		masonryList: {
			type: Array,
			default: Array
		},
		isSize:{ //图片是否有图片宽高信息
			type:Boolean,
			default:true
		},
		borderRadius:{ //图片圆角
			type: Number,
			default: 0
		},
		list:[String,Object,Array],
	},
	data() {
		return {
			tagColor:['#f6b8f2','#7ac9cc','#d6c4ff','#f57c43','#fcd410','#7ac9cc','#f6b8f2','#d6c4ff'],
			guan:''
		};
	},
	watch: {
		masonryList(newVal, oldVal) {
			this.handleData(newVal);
		}
	},
	computed:{
		isTag:function(){
			let dataList=this.list;
			
			let tagArr=[];
			for(let i in dataList){
				tagArr.push(dataList[i].partTimeMessage.samList)
			}
			//console.log(dataList)
			return tagArr;
		}
	},
	onReady() {
		this.handleData(this.masonryList);
		
		let openId=uni.getStorageSync('openid');
		let _this=this;
		//关注列表
		uni.request({
			url:_this.$store.state.baseurl+'/attention/list',
			data:{
				openId:openId,
				cid: _this.$store.state.cid
			},
			method:'POST',
			header : {'content-type':'application/x-www-form-urlencoded'},
			success:function(res){
				//console.log(res.data.data)
				let getData=res.data.data;
				let guanList=[];
				for(let i in getData){
					guanList.push(getData[i].byArUserId)
				}
				//console.log(guanList)
				_this.guan=guanList;
				//console.log(_this.guan)
			}
		})
	},
	methods: {
		shou:function(e){
			let openId=uni.getStorageSync('openid');
			let uid=e;
			//console.log(uid)
			let _this=this;
			console.log(_this.$store)
			uni.request({
				url:_this.$store.state.baseurl+'/attention/create',
				data:{
					openId:openId,
					byArUserId:uid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					console.log(_this.$store.state.cid)
					//关注列表
					uni.request({
						url:_this.$store.state.baseurl+'/attention/list',
						data:{
							openId:openId,
							cid: _this.$store.state.cid
						},
						method:'POST',
						header : {'content-type':'application/x-www-form-urlencoded'},
						success:function(res){
							//console.log(res.data.data)
							let getData=res.data.data;
							let guanList=[];
							for(let i in getData){
								guanList.push(getData[i].byArUserId)
							}
							//console.log(guanList)
							_this.guan=guanList;
							//console.log(_this.guan)
						}
					})
					
					uni.showToast({
						title:'关注成功'
					})
					setTimeout(() => {
						uni.hideToast()
					}, 1000)
				}
			})
		},
		buy:function(e){
			let openId=uni.getStorageSync('openid');
			let uid=e;
			//console.log(uid)
			let _this=this;
			uni.request({
				url:_this.$store.state.baseurl+'/order/joinShopping',
				data:{
					openId:openId,
					userId:uid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					let cart=res.data.data;
					_this.$store.commit('setCart',cart);
					//console.log(_this.$store.state.cart)
					uni.showToast({
						title: '加入成功',
						duration:1000
					})
				}
			})
		},
		handleData(arr) {
			arr.forEach(async (v, k) => {
				let imgHeight;
				if(this.isSize){
					imgHeight = parseInt((this.imgWidth * Number(v.size[1])) / Number(v.size[0]));
				}else{
					let info = await this.getImageInfo(v.src);
					imgHeight = parseInt((this.imgWidth * Number(info[1])) / Number(info[0]));
				}
				let obj = {
					id: v.id,
					src: v.src
				};
				//左侧>右侧高度
				if (this.leftHeight > this.rightHeight) {
					this.imgRight.push(obj);
					this.rightHeight = this.rightHeight + imgHeight;
				} else {
					this.imgLeft.push(obj);
					this.leftHeight = this.leftHeight + imgHeight;
				}
			});
		},
		async getImageInfo(path) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: path,
					success: function(info) {
						// console.log(image)
						resolve([info.width,info.height])
					},
					fail(err) {

						reject(err)
					}
				});
			})
		},
		toOrder:function(e){
			//console.log(e)
			uni.navigateTo({
				url:'/components/bosspages/order?id='+e
			})
		},
		cancel:function(userId){
			let openId=uni.getStorageSync('openid');
			let _this=this;
			uni.request({
				url:_this.$store.state.baseurl+'/attention/del',
				data:{
					openId:openId,
					byArUserId:userId
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success:function(res){
					//关注列表
					uni.request({
						url:_this.$store.state.baseurl+'/attention/list',
						data:{
							openId:openId
						},
						method:'POST',
						header : {'content-type':'application/x-www-form-urlencoded'},
						success:function(res){
							//console.log(res.data.data)
							let getData=res.data.data;
							let guanList=[];
							for(let i in getData){
								guanList.push(getData[i].byArUserId)
							}
							//console.log(guanList)
							_this.guan=guanList;
							//console.log(_this.guan)
						}
					})
				}
			})
		}
	}
};
</script>

<style lang="less">
.masonry {
	
		.card {
			margin-bottom: 8px;
			box-shadow: 0 0 6px #bcbbbb;
			border-radius: 8px;
			overflow: hidden;
			margin-top: 10rpx;
		}
	
}

.main{
    transform: rotate(45deg);
    margin: 300px;
}
.disc1{
    width: 100px;
    height: 100px;
    border:1px solid red;
    background-color: red;
    margin:300px 0px 0px 300px;
    border-radius:100%;
    float:left;
}
.disc2{
    width: 100px;
    height: 100px;
    border:1px solid red;
    background-color: red;
    margin:250px 0px 0px 0px;
    border-radius:100%;
    float:left;
    position: relative;
    right: 50px;
}
.square{
    width: 100px;
    height: 100px;
    border:1px solid red;
    background-color: red;
    margin: 300px 0px 0px 0px;
    float: left;
    position: relative;
    right: 152px;
}

.jian{
    background: -webkit-linear-gradient(rgba(0,0,0,0),black); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0,0,0,0),black); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0,0,0,0),black); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0,0,0,0),black); /* 标准的语法（必须放在最后） */
}

.xinChecked{
	color: red
}
.xinNotChecked{
	color: #d0cdd0
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

.iconBase{
	color: #eeeeee
}

.redxing{
	color: red
}

.hidden{
	display: none
}
</style>
