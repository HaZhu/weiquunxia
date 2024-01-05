
import Taro, { setStorageSync } from '@tarojs/taro';

const globalData = {
  token: '',
  isLogin: false,
  userInfo: {}
}

export function setGlobalData (key, val) {
  if(key == 'token'){
    setStorageSync('token', val)
  }
  globalData[key] = val
}
export function getGlobalData (key) {
  return globalData[key]
}
