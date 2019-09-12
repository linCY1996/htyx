import httpRequest from '@/common/api.js'

export default {
	// 登录 获取openid
	Login: l => httpRequest.Post('/wxUser/wxLogin', l),
	// 获取职业
	getWork: l =>httpRequest.Get('/careerType/getType', l),
	// 判断是否登录
	changeLogin: l => httpRequest.Post('/user/verifyRole', l),
}