<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let _this=this;
			let openid=uni.getStorageSync('openid')
		},
		onShow: function() {
			console.log('App Show');
			let _this=this;
			let openid=uni.getStorageSync('openid')
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
						// uni.setStorageSync('userType',2)
						// uni.reLaunch({
						// 	url:'/pages/index/index'
						// })
					}else if(type==3){
						// uni.setStorageSync('userType',3)
						// uni.reLaunch({
						// 	url:'/pages/index01/index'
						// })
					}
				}
			})

			let userType=uni.getStorageSync('userType');
			if(userType==3){
				//用户信息
				let openId=uni.getStorageSync('openid');
				uni.request({
					url:_this.$store.state.baseurl+'/user/partTimeMessage',
					data:{
						openId:openId
					},
					method:'POST',
					header : {'content-type':'application/x-www-form-urlencoded'},
					success:function(res){
						//let cart=res.data.data;
						//_this.$store.commit('setCart',cart);
						//console.log(_this.$store.state.cart)
						
						uni.setStorageSync('cid',res.data.data.cid)
						//websocket
						let cid=res.data.data.cid;
						
						let set=setInterval(function(){
							uni.request({
								url:_this.$store.state.baseurl+'/order/findOrderList',
								data:{
									cid:cid,
									openId:openId
								},
								method:'POST',
								header:{'content-type':'application/x-www-form-urlencoded'},
								success(res) {
									//console.log(typeof res.data.data)
									clearInterval(set);
									let oldSt=JSON.stringify(res.data.data);
									
									let order=res.data.data;
									uni.request({
										url:_this.$store.state.baseurl+'/userOrder/findOrderId',
										data:{
											openId:openId
										},
										method:'POST',
										header : {'content-type':'application/x-www-form-urlencoded'},
										success:function(oidArr){
											//console.log(oidArr.data.data)
											let arr3=oidArr.data.data;
											let allOid=[];
											for(let i in arr3){
												allOid.push(arr3[i].orderId)
											}
											console.log(allOid)
											
											
											//去除已抢订单
											function getArrEqual(arr1, arr2) {
											        let newArr = [];
											        for (let i = 0; i < arr2.length; i++) {
											            for (let j = 0; j < arr1.length; j++) {
											                if(arr1[j] === arr2[i].oid){
											                    arr2.splice(i,1)
											                }
											        }
											     }
											     return arr2;
											}
											
											let st=JSON.stringify(getArrEqual(allOid,order));
											
											if(getArrEqual(allOid,order).length!=0){
												uni.navigateTo({
													url:'/pages/competed/index?st='+st
												})
											}
										},
										fail() {
											
										}
									})
								}
							})
						},30000)
					 }
				})
			}
		},
		onHide: function() {
			console.log('App Hide');
		},
		created() {
			console.log('App created');
			// let _this=this;
			// // 判断用户是否注册,已注册用户类型
			// let openid=uni.getStorageSync('openid')
			// if(openid==null||openid==undefined||openid==''){
			// 	uni.navigateTo({
			// 		url:'/pages/login/index'
			// 	})
			// }else{
			// 	uni.request({
			// 		url:_this.$store.state.baseurl+'/user/verifyRole',
			// 		data:{
			// 			openId:openid
			// 		},
			// 		method:"POST",
			// 		header : {'content-type':'application/x-www-form-urlencoded'},
			// 		success:function(res){
			// 			let type=res.data.data;
			// 			//console.log(type)
			// 			if(type==-1){
			// 				
			// 			}else if(type==-2){
			// 				uni.reLaunch({
			// 					url:'/pages/login/index'
			// 				})
			// 			}else if(type==0){
			// 				uni.reLaunch({
			// 					url:'/pages/status/index'
			// 				})
			// 			}else if(type==2){
			// 				uni.reLaunch({
			// 					url:'/pages/index/index'
			// 				})
			// 			}else if(type==3){
			// 				uni.reLaunch({
			// 					url:'/pages/index01/index'
			// 				})
			// 			}
			// 		}
			// 	})
			// }
			
			this.setHeight();
			this.getHeight();
			this.getWidth(); 
			this.statusBarHeight();
		},
		methods:{
			setHeight:function(){
				let _this=this;
				uni.getSystemInfo({
					success:function(res){
						console.log(res)
						_this.$store.commit('setModel',res.model)
						//console.log(_this.$store.state.model)
					}
				})
			},
			statusBarHeight:function(){
				let _this=this;
				uni.getSystemInfo({
					success(res) {
						_this.$store.commit('statusBarHeight',res.statusBarHeight)
					}
				})
				//console.log(_this.$store.state.windowHeight)
			},
			getHeight:function(){
				let _this=this;
				uni.getSystemInfo({
					success(res) {
						_this.$store.commit('windowHeight',res.windowHeight)
					}
				})
				//console.log(_this.$store.state.windowHeight)
			},
			getWidth:function(){
				let _this=this;
				uni.getSystemInfo({
					success(res) {
						//console.log(res.windowWidth)
						_this.$store.commit('windowwidth',res.windowWidth)
					}
				})
				//console.log(_this.$store.state.windowWidth)
			}
		}
	}
</script>

<style>
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
	/*每个页面公共css */
</style>
