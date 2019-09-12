/**
 * 返回错误代码公共处理方法
 * @author godqian
 * @date 2017/9/27
 */
import Tips from './Tips';

export function errorCodeHandler(errorcode, message) {
  Tips.loaded();
  switch (errorcode) {
  case 3008:
    wx.removeStorageSync("tokenStr");
    break;
  default:
    if (message) {
      Tips.alert(message);
    }
  }
}