<template>
	<view style="height: 84px">
		<image class="my-header" :src="logo" mode="aspectFit" style="width: 80px;height: 20px;"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				logo:'https://www.mastervan.cn/static/project/dolphin/static/images/20190704164221.png'
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.my-header{
		margin-top: 34px;
		margin-left: 10px;
	}
	@media screen and (min-width:768px){
		.my-header{
			margin-top: 24px;
		}
	}
</style>
