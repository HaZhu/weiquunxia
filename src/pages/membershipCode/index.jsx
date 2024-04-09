import { View, Text, Image,  Canvas } from '@tarojs/components';
import { useState, useRef, useEffect } from 'react';
import Taro, { useDidHide, useRouter, useDidShow, usePullDownRefresh } from '@tarojs/taro';
import {
  groupDetail
} from '@/api/group'
import { QRCode } from 'taro-code';
import BackIcon from '@/components/BackIcon';
import {  getPx } from '@/utils/index';
import dayjs from 'dayjs';
import './index.less';

const MembershipCode = () => {
  const params = useRouter().params;
  const [groupInfo, setGroupInfo] = useState({});
  const handleGetDetail = async () => {
    const res = await groupDetail({
      id: params.id
    });
    if (res.code === 0) {
      setGroupInfo(res.data);
    }
  };
  useDidShow(() => {
    handleGetDetail();
  })
  return (
    <View className='member_ship_code_container'>
      <BackIcon></BackIcon>
      <View className={`code_box green_shadow`}>
        <View className='membership_flur'></View>
        <View className={`cover_view green_cover_view`}>
          <View className='lxb_name'>
            <View className='user_name'>群名称：{groupInfo.groupName}</View>
            <View className='user_info'>
              <Text>创建者：{groupInfo.publishUserNick}</Text>
            </View>
          </View>
          <View className='lxb_num'>群ID：{groupInfo.id}</View>
          <View className='lxb_money'>微群公告：{groupInfo.remark}</View>
          <View className='lxb_money'>创建时间：{dayjs(groupInfo.creatTime).format('YYYY-MM-DD')}</View>
          {groupInfo.qrCodeUrl ? (
            <View className='webp_wrap'>
                  <Image onClick={() => {
                    Taro.previewImage({
                      current: groupInfo.qrCodeUrl, // 当前显示图片的http链接
                      urls: [groupInfo.qrCodeUrl] // 需要预览的图片http链接列表
                    })
                  }} mode="aspectFill" className='codeImg' src={groupInfo.qrCodeUrl}></Image>
             </View>
          ) : (
            <View className='webp_wrap'>
              <Image
                className='webp_img'
                src='https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/08efbed5dc485c2e3cce1cef54e6cfd209921731.webp'
              ></Image>
            </View>
          )}
          {/* </View> */}
          <View className='code_text'>点击二维码，长按加群</View>
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
