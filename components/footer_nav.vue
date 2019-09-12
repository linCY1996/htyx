<template>
	<view>
		<view class="footer" style="z-index: 999;">
			<view :style="index==now_index?item.btnSty:item.select_btnSty" :class="'footer_item ' + (item.size=='big'?'big_item':'')" v-on:click.stop="change_nav(index)" v-for="(item,index) in footer_nav" :key="index">
				<image :src="index==now_index?item.select_icon:item.icon" mode="aspectFit"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			change_nav(index){
				this.$store.commit("change_page",index)
			}
		},
		computed:{
			item_width(){
				let length = this.$store.state.footer_store.footer_nav.length;
				switch (length){
					case 1:
						return '100%'
						break;
					case 2:
						return '50%'
						break;
					case 3:
						return '33.3%'
						break;
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			footer_nav(){
				console.log(this.$store.state.footer_store.footer_nav)
				return this.$store.state.footer_store.footer_nav
			},
			now_index(){
				return this.$store.state.footer_store.now_page_index;
			}
		}
	}
</script>

<style>
.footer{

	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	color: #fff;
	border-top: 1px solid rgb(222,222,222);
}
.footer_item{
	float: left;
	width: 33.3%;
	text-align: center;
	font-size: 28upx;
	height: 120upx;
 
}
.footer_item image{
	width: 32px;
	height: 32px;
	margin: 10px auto;
}

</style>
