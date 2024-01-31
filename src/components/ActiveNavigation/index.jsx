import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

const ActiveNavigation = () => {
 
  const goToCreate = () => {
    Taro.navigateTo({
      url: '/pages/createGroup/index'
    })
  }
  return (
    <View className='active_nav_wrap'>
      <View className='iconfont iconstroke2' onClick={goToCreate}></View>
    </View>
  );
};

export default ActiveNavigation;
