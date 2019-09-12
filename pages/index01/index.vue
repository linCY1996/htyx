<template>
	<view>
		<staffIndex></staffIndex>
	</view>
</template>

<script>
	import staffIndex from '../../components/staffpages/index.vue';
	//import footerNav01 from '../../components/footer_nav01.vue';
	export default{
		data(){
			return{
				
			}
		},
		components:{
			staffIndex
		},
		computed:{
			page_code() {
				return this.$store.state.footer_store.footer_nav01[this.$store.state.footer_store.now_page_index].name_code;//导航栏先写这。。。后期可能会加
			}
		},
		onLoad() {
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
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
