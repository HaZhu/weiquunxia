import Taro, { useReachBottom } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Image} from '@tarojs/components';
import {  AtTag } from 'taro-ui'
import {
  listByPageSelf
} from '@/api/group'
import styles from './home.module.less';

const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [benefitsList, setBenefitsList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [pageActive, setPageActive] = useState({
    pageNum: 0
  });

  const getGroupList = async (isScroll = false) => {
    const res = await listByPageSelf({
      offset: 0,
      pageSize: 20,
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
  useEffect(() => {
    getGroupList()
  },[])
  useReachBottom(() => {
    if (hasMore) {
      getGroupList(true);
    }
  });

  return (
    <View className={`${styles['home_page']}`}>

      <View className={`${styles['list_wrap']}`}>
        {
          benefitsList.map(item => {
            return  <View className={`${styles['list']}`}>
            <View className={`${styles['list_left']}`}>
              <Image className={`${styles['list_left_img']}`} src='https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/7cdb32c0392374798b75a758ad2386370d4562e8.jpg'></Image>
            </View>
            <View className={`${styles['list_center']}`}>
               <View className={`${styles['list_center_top']}`}>
                  <View className={`iconfont iconweixin-fill ${styles['iconfont1']}`}></View>
                  <View className={`text_cut_1 ${styles['title']}`}>{item.groupName}</View>
               </View>
               <View className={`${styles['list_center_bottom']}`}>
                  <View className={`iconfont icona-icon48huiyuanzhuanshu ${styles['iconfont2']}`}></View>
                  <View className={` text_cut_1 ${styles['num']}`}>{item.peopleNum}人</View>
               </View>
            </View>
            <View className={`${styles['list_right']}`} onClick={() => {
              Taro.navigateTo({
                url: `/pages/editGroup/index?id=${item.id}`
              })
            }}>
              <AtTag type='primary' active circle>编辑</AtTag>
            </View>
          </View>
          })
        }
      </View>
    </View>
  );
};
export default Home;
