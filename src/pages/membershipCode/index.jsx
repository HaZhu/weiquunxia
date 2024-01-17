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
      <View className={`code_box ${memberSign === 2 && 'green_shadow'}`}>
        {memberSign === 2 ? <View className='membership_flur'></View> : <View className='membership_gray'></View>}
        <View className={`cover_view ${memberSign === 2 && 'green_cover_view'}`}>
          <View className='lxb_name'>
            <View className='user_name'>群名称：赚钱群</View>
            <View className='user_info'>
              <Text>群人数：123人</Text>
            </View>
          </View>
          <View className='lxb_num'>创建时间：2022</View>
          <View className='lxb_money'>创建地点：杭州</View>
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
    </View>
  );
};
export default MembershipCode;
