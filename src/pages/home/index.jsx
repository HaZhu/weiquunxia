import React, { useState, useEffect } from 'react';
import Taro, { useShareTimeline,useReachBottom, useShareAppMessage, useDidShow } from '@tarojs/taro';

import { View, Swiper, SwiperItem, Image} from '@tarojs/components';
import { AtSearchBar, AtTabs, AtTag } from 'taro-ui'
import ActiveNavigation from '@/components/ActiveNavigation';
import {
  groupListByPage, tagList
} from '@/api/group'
import B1Png from '@/assets/1.jpeg'
import B2Png from '@/assets/2.jpeg'
import LogoPng from '@/assets/3.jpeg'
import styles from './home.module.less';
import { getPng } from '@/utils/index'
let baseUrl = 'https://www.music999.cn';

const MyGroupList = () => {
  const [banners, setBanner] = useState([{
    image: B1Png
  },{
    image: B2Png
  }]);
  const [tabList,setTabList] = useState([])
  
  const [hasMore, setHasMore] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [benefitsList, setBenefitsList] = useState([]);
  const [pageActive, setPageActive] = useState({
    pageNum: 0
  });
  const [current,setCurrent] = useState(0)
  const [currentId,setCurrentId] = useState("")

  const getGroupList = async (isScroll = false) => {
    const res = await groupListByPage({
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
  const getTagList = async () => {
      const res = await tagList();
      if(res.data.length){
        let _taglist =  res.data.map(item => {
          return {
            title: item.tagName,
            id:item.id
          }
        })
        _taglist.unshift({
          title: '全部',
          id: ""
        })
        setTabList(_taglist)
      }
  }
  const onChange =  (value) => {
    setGroupName(value)
  }
  const onChangeTabs =  (value) => {
    setCurrent(value)
    setCurrentId(tabList[value].id)
  }
  const getUser =  () => {
    Taro.login({
      success: function (r) {
        if (r.code) {
          Taro.request({
            url: baseUrl + `/wx/user/login?code=${r.code}`,
            header: {
              'Content-Type': 'application/json',
              locale: 'zh_CN'
            },
            mode: 'cors',
            method: 'GET'
          }).then((result) => {
            if(result.data.code == 0){
               Taro.setStorageSync('token',result.data.data.token)
               Taro.setStorageSync('userNick',result.data.data.userNick)
               Taro.setStorageSync('userId',result.data.data.id)
            }
          });
        } else {
          console.log('登录失败！');
        }
      }
    });
  }
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
  useEffect(() => {
      getGroupList()
  }, [currentId]);
  useEffect(() => {
    getTagList()
    getUser()
  }, []);
  useDidShow(() => {
      getGroupList()
  })

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
          benefitsList.map(item => {
            return  <View className={`${styles['list']}`}>
            <View className={`${styles['list_left']}`}>
              <Image className={`${styles['list_left_img']}`} onClick={() => {
                   Taro.previewImage({
                    current: getPng(item.qrCodeUrl), // 当前显示图片的http链接
                    urls: [getPng(item.qrCodeUrl)] // 需要预览的图片http链接列表
                  })
              }} src={getPng(item.qrCodeUrl)}></Image>
            </View>
            <View className={`${styles['list_center']}`}>
               <View className={`${styles['list_center_top']}`}>
                  <View className={`iconfont iconweixin-fill ${styles['iconfont1']}`}></View>
                  <View className={`text_cut_1 ${styles['title']}`}>{item.groupName}</View>
               </View>
               <View className={`${styles['list_center_bottom']}`}>
                  {/* <View className={`iconfont icona-icon48huiyuanzhuanshu ${styles['iconfont2']}`}></View> */}
                  {/* <View className={` text_cut_1 ${styles['num']}`}>创建者：{item.publishUserNick || '神秘人'}</View> */}
                  <View className={` text_cut_1 ${styles['num']}`}>点击二维码，长按加群（入群谨防欺诈）</View>
               </View>
            </View>
            <View className={`${styles['list_right']}`} onClick={() => {
              Taro.navigateTo({
                url: `/pages/membershipCode/index?id=${item.id}`
              })
            }}>
              <AtTag type='primary' active circle>详情</AtTag>
            </View>
          </View>
          })
        }
      </View>
      <ActiveNavigation></ActiveNavigation>

    </View>
  );
};
export default MyGroupList;
