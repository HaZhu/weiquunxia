import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem, Image} from '@tarojs/components';
import { AtSearchBar, AtTabs, AtTag } from 'taro-ui'
import styles from './home.module.less';

const Home = () => {
  const [banners, setBanner] = useState([{
    image: 'https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/7cdb32c0392374798b75a758ad2386370d4562e8.jpg'
  },{
    image: 'https://temmoku2020.oss-cn-hangzhou.aliyuncs.com/78985e7e2b61334cef8b35764c04ff05651aa757.jpg'
  }]);
  const [searchValue,setSearchValue] = useState("")
  const [tabList,setTTabList] = useState([
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' },
    { title: '标签页4' },
    { title: '标签页5' },
    { title: '标签页6' }
  ])
  const [current,setCurrent] = useState(0)

  const onChange =  (value) => {
      console.log(value)
  }
  const onChangeTabs =  (value) => {
    setCurrent(value)
}
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
        value={searchValue}
        onChange={onChange}
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
    </View>
  );
};
export default Home;
