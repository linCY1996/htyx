/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method parseTime
 * @param {String} time 时间戳
 * @param {String} cFormat 格式化格式 如 parseTime('1516589799', '{y}-{m}-{d} {h}:{i}')
 * @return {String} 返回值格式化后的时间
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method getQueryObject 获取url后的参数返回对象
 * @param {String} url 需要解析的url地址
 * @return {Object} 返回值获取到的url？后的值
 */

export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method getTime 获取当前时间
 * @param {String} type 需要的当前时间类型 stamp：时间戳  parse：格式化后的时间 无：当前浏览器默认格式时间
 * @return {String} 返回值对应格式时间
 */

export function getTime(type) {
  if (type === 'stamp') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else if (type === 'parse') {
    return parseTime(new Date())
  } else if (type === 'Dates') {
    return parseTime(new Date(), '{y}-{m}-{d}')
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method deepCopy 深度拷贝
 * @param {object} 需要拷贝的对象
 * @return {object} 复制的新对象
 */

export function deepCopy(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  var str, targetObj = source.constructor === Array ? [] : {};
  if (window.JSON) {
    str = JSON.stringify(source); //系列化对象
    targetObj = JSON.parse(str); //还原
  }
  return targetObj
}

/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method isEmptyObject 判断对象是否为空
 * @param {object} e 需要判断的对象
 * @return {Boolean} true：是空 false：不是空
 */

export function isEmptyObject(e) {
  var t;
  for (t in e) {
    return !1;
  }
  return !0
}

/**
 * 方法说明  Created by huanglong on 2018-01-22.
 * @method IsIndexOf 判断对象是否存在数组中
 * @param {object} Arr 数组对象
 * @param {object} obj 当前对象是否存在与数组中
 * @param {String} key 对象中的字段
 * @return {Number} 返回对象存在的位置
 */

export function IsIndexOf(Arr, obj, key) {
  return Arr.findIndex((element, index) => {
    return element[key] == obj[key] ? true : false
  })
}

/**
 * 方法说明  Created by huanglong on 2018-07-10.
 * @method IndexOf 判断对象是否存在数组中
 * @param {object} Arr 数组对象
 * @param {String} key 对象中的字段
 * @param {String} value 对象中的值
 * @return {Number} 返回对象存在的位置
 */

export function IndexOf(Arr, key, value) {
  return Arr.findIndex((element, index) => {
    return element[key] == value ? true : false
  })
}

/**
 * @method encodeQuery 将object转化成URL query字符串
 * obj Object 转化对象
 * mark Boolean 是否添加 ? 到query之前
 */
export function encodeQuery(obj, mark = true) {
  if (!Object.keys(obj).length) {
    return '';
  }
  var query = Object.keys(obj).map(function (key) {
    return key + '=' + obj[key]
  }).join('&')
  return mark ? '?' + query : query;
}

/**
 * @method getCaption 截取指定字符后面的所有字符内容
 * @param index 指定字符的下标
 * @param obj 字符串
 * @return  返回截取后的字符串
 */
export function getCaption(obj) {
  var index = obj.lastIndexOf("\.");
  obj = obj.substring(index + 1, obj.length);
  return obj;
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function gcj02tobd09(lng, lat) {
  var x_PI = 3.14159265358979324 * 3000.0 / 180.0;

  var lat = +lat;
  var lng = +lng;
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return {
    latitude: bd_lat,
    longitude: bd_lng
  }
};

/**
 * 根据两个时间计算时间差
 * @param startTime
 * @param endTime
 * @returns {string}
 */
export function TimeDifference(startTime, endTime) {

  var date1 = new Date(startTime); //开始时间
  var date2 = new Date(endTime); //结束时间

  var date3 = date2.getTime() - date1.getTime(); //时间差秒

  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000))

  return days + 1
};