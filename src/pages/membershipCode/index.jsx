import { View, Text, Image,  Canvas } from '@tarojs/components';
import { useState, useRef, useEffect } from 'react';
import Taro, { useDidHide, useRouter, useDidShow, usePullDownRefresh } from '@tarojs/taro';

import { QRCode } from 'taro-code';
import dayjs from 'dayjs';
import BackIcon from '@/components/BackIcon';
import {  getPx } from '@/utils/index';

import './index.less';

const MembershipCode = () => {
  const [memberSign, setMemberSign] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [memberInfo, setMemberInfo] = useState(() => {
    return {
      availableIntegral: 0,
      deductibleAmount: 0,
      memberCode: ''
    };
  });
  const handleGetCode = async () => {
    // const res = await userMemberCode();
    // if (res.code === 200) {
    //   setMemberInfo(res.data);
    // }
  };
  useDidShow(() => {
    handleGetCode();
  })
  useEffect(() => {
   
  }, []);
  return (
    <View className='member_ship_code_container'>
      <BackIcon></BackIcon>
      <View className={`code_box green_shadow`}>
        <View className='membership_flur'></View>
        <View className={`cover_view green_cover_view`}>
          <View className='lxb_name'>
            <View className='user_name'>群名称：赚钱群</View>
            <View className='user_info'>
              <Text>创建者：傲雪</Text>
            </View>
          </View>
          <View className='lxb_num'>群ID：987890</View>
          <View className='lxb_money'>微群人数：189</View>
          <View className='lxb_money'>创建时间：2022-09-08</View>
          {/* <View className="code_img"> */}
          {true ? (
            <QRCode className='code_img' text="fwefwef12233" size={getPx(400)} scale={4} errorCorrectLevel='M' typeNumber={5} />
          ) : (
            <View className='webp_wrap'>
              <Image
                className='webp_img'
                src='https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/08efbed5dc485c2e3cce1cef54e6cfd209921731.webp'
              ></Image>
            </View>
          )}
          {/* </View> */}
          <View className='code_text'></View>
          <View className='user_register_time'></View>
        </View>
      </View>
      {/* <View className='fixed_wrap'>
         <View className='icon_wrap'> 
            <View className='iconfont iconcuowu-stroke'></View>
            <View className='pb'>屏蔽</View>
         </View>
         <View className='icon_wrap'> 
            <View className='iconfont icona-icon48xiaoxi'></View>
            <View className='pb'>投诉</View>
         </View>
      </View> */}
    </View>
  );
};
export default MembershipCode;
