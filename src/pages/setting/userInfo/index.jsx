import Taro, { getCurrentInstance, useDidHide } from '@tarojs/taro';
import { View, Picker, Input } from '@tarojs/components';
import { useState, useRef, useEffect } from 'react';
import {  userEdit } from '@/api/group';
import './index.less';
const UserInfo = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const handleChange = (e, type) => {
    const { value } = e.detail;
    let params = {};
    if (type === 'name') {
      params.nickName = value;
    }
    userEdit(params);
    Taro.showToast({
      title: '修改成功'
    })
  };

  return (
    <View className="user_info_container">
      <View className="page_title">个人信息</View>
      <View className="tip">输入昵称</View>
      <Input className="ipt" maxlength={12} value={userInfo.nickName} onBlur={(e) => handleChange(e, 'name')} />
    </View>
  );
};
export default UserInfo;
