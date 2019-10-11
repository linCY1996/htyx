<template>
	<view class="" style="background: url(http://47.108.66.16:8088/static/project/dolphin/static/images/beijing01.png) no-repeat;background-size: cover;width: 100%;font-family: Alibaba PuHuiTi;">
		<my-header></my-header>
		<view style="margin-left: 10px;color: white;font-size: 20px;padding-top: 30px;"></view>
		<view class="" style="display: flex;padding-top: 36%;height: 190px;">
			<view class="" style="flex-grow: 1;"></view>
			<view class="normal" :style="bosschecked" v-on:tap="toBoss()">
				<view class="" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/boss.png) no-repeat;background-size: contain;height: 180px;background-position-x: center;"></view>
			</view>
			<view class="" style="flex-grow: 1;"></view>
			<view class="normal" :style="staffchecked" v-on:tap="toStaff()">
				<view class="" style="background: url(https://www.mastervan.cn/static/project/dolphin/static/images/staff.png) no-repeat;background-size: contain;height: 180px;background-position-x: center;"></view>
			</view>
			<view class="" style="flex-grow: 1;"></view>
		</view>
		
		
		<view class="">
			<view class="" style="width: 100px;margin: 36px auto;">
				<button type="primary" v-on:tap="toIndex" style="width: 100px;height: 34px;font-size: 15px;background-color: rgb(53,207,122);line-height: 34px;">选好了</button>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                toUserMsg:'',
				bosschecked:'',
				staffchecked:'',
				windowHeight:''
            };
        },
        methods: {
            toIndex:function(){
				let _this=this;
				
				uni.navigateTo({
				    url: _this.toUserMsg
				});
			},
			toBoss:function(){
				this.toUserMsg='';
				let url='/pages/userMsg/boss';
				this.toUserMsg=url
				
				uni.setStorageSync('userType',2)
				//改变选中元素边框
				this.staffchecked=''
				this.bosschecked='border:1px solid rgb(91,216,147)';
			},
			toStaff:function(){
				this.toUserMsg=url;
				let url='/pages/userMsg/staff';
				this.toUserMsg=url
				
				uni.setStorageSync('userType',3)
				
				this.bosschecked='';
				this.staffchecked='border:1px solid rgb(91,216,147)'
			}
        },
        onLoad() {//默认加载
		    this.windowHeight = this.$store.state.windowHeight
            
        }
    }
</script>

<style>
	.normal{
		flex-grow: 4;
		border:1px solid rgb(234,234,234);
		border-radius: 6px;
		box-sizing: border-box;
	}
</style>
