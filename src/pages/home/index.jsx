import Taro, { useReachBottom } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem, Image} from '@tarojs/components';
import { AtSearchBar, AtTabs, AtTag } from 'taro-ui'
import ActiveNavigation from '@/components/ActiveNavigation';
import {
  groupListByPage, tagList
} from '@/api/group'
import styles from './home.module.less';

const Home = () => {
  const [banners, setBanner] = useState([{
    image: 'https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/7cdb32c0392374798b75a758ad2386370d4562e8.jpg'
  },{
    image: 'https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/78985e7e2b61334cef8b35764c04ff05651aa757.jpg'
  }]);
  const [tabList,setTabList] = useState([])
  
  const [hasMore, setHasMore] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [benefitsList, setBenefitsList] = useState([]);
  const [pageActive, setPageActive] = useState({
    pageNum: 0
  });
  const [current,setCurrent] = useState(null)
  const [currentId,setCurrentId] = useState(null)

  const getGroupList = async (isScroll = false) => {
    const res = await groupListByPage({
      offset: 1,
      pageSize: 20,
      groupName: groupName,
      tagId: currentId
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
  const getTagList = async () => {
      const res = await tagList();
      if(res.data.length){
        let _taglist =  res.data.map(item => {
          return {
            title: item.tagName
          }
        })
        setTabList(_taglist)
        setCurrent(0)
        setCurrentId(res.data[0].id)
      }
  }
  const onChange =  (value) => {
    setGroupName(value)
  }
  const onChangeTabs =  (value) => {
    setCurrent(value)
    setCurrentId(tabList[value].id)
  }
  
  useReachBottom(() => {
    if (hasMore) {
      getGroupList(true);
    }
  });
  useEffect(() => {
    if(currentId){
      getGroupList()
    }
  }, [currentId]);
  useEffect(() => {
    getTagList()
  }, []);
  return (
    <View className={`${styles['home_page']}`}>
      <Swiper
        className={`${styles['swiper_box']}`}
        indicatorColor='rgba(255,255,255,0.4)'
        indicatorActiveColor='#ffffff'
        circular
        indicatorDots
        autoplay
      >
        {banners.map((item) => {
          return (
            <SwiperItem key={item.image}>
              <Image
                className={`${styles['banner_img']}`}
                onClick={(e) => {
                  handleBannerNick(item);
                }}
                mode='aspectFill'
                src={item.image}
              ></Image>
            </SwiperItem>
          );
        })}
      </Swiper>
      <AtSearchBar
        showActionButton
        placeholder='输入关键词搜索群'
        value={groupName}
        onChange={onChange}
        onActionClick={() => {
          getGroupList()
        }}
      />
      <AtTabs
        current={current}
        scroll
        tabList={tabList}
        onClick={onChangeTabs}>
      </AtTabs>

      <View className={`${styles['list_wrap']}`}>
        {
          [1,2,3].map(item => {
            return  <View className={`${styles['list']}`}>
            <View className={`${styles['list_left']}`}>
              <Image className={`${styles['list_left_img']}`} src='https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/7cdb32c0392374798b75a758ad2386370d4562e8.jpg'></Image>
            </View>
            <View className={`${styles['list_center']}`}>
               <View className={`${styles['list_center_top']}`}>
                  <View className={`iconfont iconweixin-fill ${styles['iconfont1']}`}></View>
                  <View className={`text_cut_1 ${styles['title']}`}>火球NIIT福建欧文</View>
               </View>
               <View className={`${styles['list_center_bottom']}`}>
                  <View className={`iconfont icona-icon48huiyuanzhuanshu ${styles['iconfont2']}`}></View>
                  <View className={` text_cut_1 ${styles['num']}`}>火球NIIT福建欧文</View>
               </View>
            </View>
            <View className={`${styles['list_right']}`}>
              {/* <AtTag type='primary' circle>加</AtTag>  */}
              <AtTag type='primary' active circle>加群</AtTag>
            </View>
          </View>
          })
        }
      </View>
      <ActiveNavigation></ActiveNavigation>

    </View>
  );
};
export default Home;
