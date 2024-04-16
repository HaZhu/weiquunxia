import React, { useState, useEffect } from 'react';
import Taro, { useShareTimeline,useReachBottom, useShareAppMessage, useDidShow } from '@tarojs/taro';

import { View, Image} from '@tarojs/components';
import { AtTag } from 'taro-ui'
import {
  listByPage, check
} from '@/api/group'
import LogoPng from '@/assets/3.jpeg'
import styles from './home.module.less';

const ShenHeList = () => {
  const [hasMore, setHasMore] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [benefitsList, setBenefitsList] = useState([]);
  const [pageActive, setPageActive] = useState({
    pageNum: 0
  });
  const [currentId,setCurrentId] = useState("")
  const getGroupList = async (isScroll = false) => {
    const res = await listByPage({
      offset: 0,
      pageSize: 20,
      tagId: currentId,
      groupName: groupName,
    });
    if (isScroll) {
      const _list = benefitsList.concat(res.data.list);
      setBenefitsList(_list);
      setPageActive({
        pageNum: pageActive.pageNum + 1
      });
    } else {
      setBenefitsList(res.data.list);
      setPageActive({
        pageNum: 0
      });
    }
    if(res.data.list.length < 20){
      setHasMore(false)
    }
  };
  useShareTimeline(() => {
    return {
      title: '群觅，这里有你想要的群',
      path: '/pages/home/index'
    };
  });
 
  useShareAppMessage(() => {
    return {
      title: '群觅，这里有你想要的群',
      path: '/pages/home/index'
    };
  })
  useReachBottom(() => {
    if (hasMore) {
      getGroupList(true);
    }
  });
  useDidShow(() => {
      getGroupList()
  })

  return (
    <View className={`${styles['home_page']}`}>
      <View className={`${styles['list_wrap']}`}>
        {
          benefitsList.map(item => {
            return  <View className={`${styles['list']}`}>
            <View className={`${styles['list_left']}`}>
              <Image className={`${styles['list_left_img']}`} src={LogoPng}></Image>
            </View>
            <View className={`${styles['list_center']}`}>
               <View className={`${styles['list_center_top']}`}>
                  <View className={`iconfont iconweixin-fill ${styles['iconfont1']}`}></View>
                  <View className={`text_cut_1 ${styles['title']}`}>{item.groupName}</View>
               </View>
               <View className={`${styles['list_center_bottom']}`}>
                  <View className={`iconfont icona-icon48huiyuanzhuanshu ${styles['iconfont2']}`}></View>
                  <View className={` text_cut_1 ${styles['num']}`}>创建者：{item.publishUserNick || '神秘人'}</View>
               </View>
            </View>
            <View className={`${styles['list_right']}`} onClick={() => {
              Taro.navigateTo({
                url: `/pages/membershipCode/index?id=${item.id}`
              })
            }}>
              <AtTag type='primary' active circle>审核</AtTag>
            </View>
          </View>
          })
        }
      </View>
    </View>
  );
};
export default ShenHeList;
