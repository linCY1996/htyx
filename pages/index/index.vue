<template>
	<view class="content" style="font-family: 'Alibaba PuHuiTi'">
		<indexPage v-if="page_code=='index'"></indexPage>
		<cartPage v-if="page_code=='cart'"></cartPage>
		<mePage v-if="page_code=='me'"></mePage>
		<fr-loading></fr-loading>
		<footerNav></footerNav>
	</view>
</template> 

<script>
	import indexPage from "../../components/bosspages/index.vue";
	import cartPage from "../../components/bosspages/cart.vue";
	import mePage from "../../components/bosspages/me.vue";
	import footerNav from "../../components/footer_nav.vue";
	export default {
		data() {
			return {
				
			}
		},
		components: {
			indexPage,
			cartPage,
			mePage,
			footerNav
		},
		
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad() {
			uni.loadFontFace ({
			  family: 'Alibaba PuHuiTi',
			  source: 'url("https://www.mastervan.cn/static/project/dolphin/static/font/alifont/AlibabaPuHuiTi-Light.ttf")',
			  success: function(){}
			})
		},
		methods: {
			open_loading() {
				this.$loading()
			}
		}
		
	}
</script>

<style>
	 
	.content {
		text-align: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
