/**
 *  Created by huanglong 2018-06-19 .
 *  flyio处理拦截器 自动处理接口
 */

import Fly from 'flyio/dist/npm/wx' //npm引入方式
import Tips from './Tips'
import { errorCodeHandler } from './errorCode'

//创建fly实例
const fly = new Fly()

//配置请求baseURL
fly.config.baseURL = BASE_API

//添加请求拦截器
fly.interceptors.request.use((config) => {
  Tips.loading()
  // 判断是否存在token，如果存在的话，则每个http 都加上token
  const token = wx.getStorageSync('CT_token')
  config.url = '?action=' + config.url
  if (token) {
    config.url = config.url + '&CT_token=' + token
  }

  return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(

  response => {
    //返回错误代码处理前端页面提示
    if (response.data.code != 0) {
      errorCodeHandler(response.data.code, response.data.errormsg);
      return Promise.reject(response.data)
    }
    Tips.loaded()
    return response.data;

  },
  error => {
    if (error.response) {
      Tips.error('服务器繁忙！')
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  });

export default fly;