import fly from '@/utils/http'

const config = {
  proxy: '' // 接口种类
};

//通过code获取CT_token 和 uid
export async function getLogin(params) {
  return await fly.get('login', params, config)
}

//获取用户信息
export async function getUserInfo(params) {
  return await fly.get('userinfo', params, config)
}

//保存用户信息userType 0代表模特 1代表甲方
export async function saveUserInfo(params) {
  return await fly.get('saveuserinfo', params, config)
}

// 甲方资料上传
export async function saveCompanyInfo(params) {
  return await fly.get('savecompanyinfo', params, config)
}

// 甲方首页接口
export async function modellist(params) {
  return await fly.get('modellist', params, config)
}

// 订单列表接口
export async function useractivity(params) {
  return await fly.get('useractivity', params, config)
}

// 提交订单
export async function addorder(params) {
  return await fly.get('addorder', params, config)
}

// 获取验证码
export async function getauthcode(params) {
  return await fly.get('getauthcode', params, config)
}

// 获取七牛上传token
export async function getqiniutoken(params) {
  return await fly.get('getqiniutoken', params, config)
}