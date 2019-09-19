import httpRequest from '@/common/api.js'

export default {
	// 登录 获取openid
	Login: l => httpRequest.Post('/wxUser/wxLogin', l),
	// 获取职业
	getWork: l =>httpRequest.Post('/careerType/getType', l),
	// 判断是否登录
	changeLogin: l => httpRequest.Post('/user/verifyRole', l),
	//获取用户信息
	getUserMsgs: l => httpRequest.Post('/user/getUserMessage', l),
	//兼职详情页数据查询
	findDetailUserMsgs: l => httpRequest.Post('/user/findDetailUserMessage', l),
	//根据订单状态查询指定兼职的订单信息列表
	findOrderMsgs: l => httpRequest.Post('/order/findOrderMessage', l), 
	//新增一个履历
	createRecode: l => httpRequest.Post('/record/create', l),
	//查询兼职的个人信息 
	partTimeMsgs: l => httpRequest.Post('/user/partTimeMessage', l),
	//根据职业编号查询可抢的订单列表
	findOrderList: l => httpRequest.Post('/order/findOrderList', l),
	//查询用户抢过的订单编号
	findOrderID: l => httpRequest.Post('/userOrder/findOrderId', l),
	//获取列表数据
	getList: l => httpRequest.Post('/user/list', l),
}