import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem, Image} from '@tarojs/components';
import styles from './home.module.less';

const Home = () => {
  const [banners, setBanner] = useState([{
    image: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg'
  }]);
  const onChange =  (value) => {
    
  }
  return (
    <View className={`${styles['home_page']}`}>
        
    </View>
  );
};
export default Home;
