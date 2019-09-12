export default {
	state:{
		footer_nav:[
			{
				name:'首页',
				name_code:'index',
				icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon02.png',
				select_icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon2.png',
				size:'small',
				btnSty:'',
				select_btnSty:'border:none'
			},
			{
				name:'发布',
				name_code:'cart',
				icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon03.png',
				select_icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon3.png',
				size:'small',
				btnSty:'',
				select_btnSty:'border:none'
			},
			{
				name:'我的',
				name_code:'me',
				icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon01.png',
				select_icon:'https://www.mastervan.cn/static/project/dolphin/static/images/icon1.png',
				size:'small',
				btnSty:'',
				select_btnSty:'border:none'
			},
			
		],
		now_page_index:0,
		footer_nav01: [
			{
				name:'抢单',
				name_code:'index',
				icon:'/static/footer_icon/a2.png',
				select_icon:'/static/footer_icon/a1.png',
				size:'small'
			},
			{
				name:'我的',
				name_code:'me',
				icon:'/static/footer_icon/d1.png',
				select_icon:'/static/footer_icon/d2.png',
				size:'small'
			},
		]
	},
	mutations:{
		change_nav_list(state,data){
			state.footer_nav = data;
		},
		change_page(state,index){
			state.now_page_index = index;
		}
	},
	actions:{
		
	}
}