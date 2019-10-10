// let host = 'https://www.mastervan.cn' //正式服
let host = 'http://47.108.66.16:8088' //体验服

var httpRequest = {
	//post请求 url：请求路径，请求header，params请求参数，app全局变量
	Post: function(url, params, app) {
		let promise = new Promise(function(resolve, reject) {
			wx.request({
				url: host+url,
				data: params,
				header:{'content-type':'application/x-www-form-urlencoded'},
				method: 'POST',
				success: function(res) {
					//自行处理返回结果
					resolve(res);
				},
				fail:function(err){
					reject(err)
				}
			})
		});
		return promise;
	},
	//get请求
	Get: function(url, params, app) {
		let promise = new Promise(function(resolve, reject) {
			wx.request({
				url: host+url,
				data: params,
				method: 'GET',
				success: function(res) {
					//返回结果自行处理
					resolve(res);

				},
				fail:function(err){
					reject(err)
				}	
			})
		});
		return promise;
	}


}

export default httpRequest