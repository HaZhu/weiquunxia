import Taro, { useRouter, usePageScroll } from '@tarojs/taro';
import { View, Image, Input, ScrollView } from '@tarojs/components';
import { useState, useRef, useEffect } from 'react';
import RadioGroup from '@/components/RadioGroup';
import {  showToast, handleUploadFile} from '@/utils';
import {
  editCreate,
  groupDetail,
  tagList
} from '@/api/group'

import BackIcon from '@/components/BackIcon';
import { useGetBarHeight } from '@/hooks';
import './index.less';

const EditGroup = () => {
  const INVOICE_TITLE_OPTIONS = [
    {
      label: '企业微信',
      value: 2
    },
    {
      label: '微信',
      value: 1
    }
  ];
  const [formData, setFormData] = useState(() => {
    return {
      qrCodeUrl: '',
      headImagePic: '',
      tagId: '',
      tagName: '',
      groupType: 2, // 1微信 2企业
      groupName: '', //名称
      peopleNum: '', //人数
    };
  });
  const [shoplistShow, setShoplistShow] = useState(false);
  const [shopList, setShopList] = useState([])
  const [barOpacity, setBarOpacity] = useState(0);
  const { barHeight, titleBarHeight } = useGetBarHeight();
  const handleChangeFormData = (value, types) => {
    const _params = { ...formData };
    _params[types] = value;
    setFormData(_params);
  };
  const getTagList = async () => {
    const res = await tagList();
    if(res.data.length){
      setShopList(res.data)
    }
}
  const handleGetDetail = async () => {
    const {code,data} = await groupDetail({
      id: params.id
    });
    if (code === 0) {
      setFormData({
        qrCodeUrl: data.qrCodeUrl,
        headImagePic: '',
        tagId: data.tagId,
        tagName: data.tagName,
        groupType: data.groupType, // 1微信 2企业
        groupName: data.groupName, //名称
        peopleNum: data.peopleNum, //人数
      })
    }
  };

  usePageScroll((e) => {
    const scrollTop = e.scrollTop;
    const opcityValue = scrollTop / 40 > 1 ? 1 : scrollTop / 40;
    setBarOpacity(opcityValue);
  });
  useEffect(() => {
    getTagList()
    handleGetDetail();
  },[])
  const handleAddImg = (type) => {
    Taro.chooseImage({
      // count: 1 - imgArr.length, // 默认9
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: async function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        Taro.showLoading({
          title: '上传中...'
        });
        const r = await handleUploadFile(res.tempFilePaths[0]);
        if( !r || (r.qrCodeOrigin != 1 && r.qrCodeOrigin != 2)){
          Taro.hideLoading();
          showToast('请上传微信群二维码或者企业群二维码')
          return
        }
        let _formData = {...formData};
        _formData[type] = r.qrCodeUrl;
        setFormData(_formData)
        Taro.hideLoading();
      }
    });
  };
  const handleCheck = () => {
    return !!formData.qrCodeUrl && !!formData.groupName && !!formData.groupType;
  };
  const handleSubmit = async () => {
    if (!handleCheck()) return;
    let query = { ...formData };
    const res = await editCreate(query)
    if (res.code === 0) {
      showToast('修改成功，等待管理员审核')
    }
  };
  return (
    <View className='fb_open_invoice_container' style={{ paddingTop: titleBarHeight + barHeight + 'px' }}>
      <BackIcon></BackIcon>
      <View className='fiexd_title' style={{ height: titleBarHeight + 'px', paddingTop: barHeight + 'px', opacity: barOpacity }}>
        提交开票信息
      </View>
      <View className='page_title'>提交群信息</View>
      <View className='invoice_form_content'>
        <View className='invoice_form_content_row'>
          <View className='invoice_form_content_row_label'>群类型</View>
          <View className='invoice_form_content_row_val'>
          <RadioGroup
            btnStyle='red-style'
            value={formData.groupType}
            className='invoice-title'
            onChange={(e) => {
                  handleChangeFormData(e, 'groupType');
                }}
            options={INVOICE_TITLE_OPTIONS}
          />
          </View>
        </View>
          <View className='invoice_form_content_row border_bottom'>
            <View className='invoice_form_content_row_label'>群昵称</View>
            <View className='invoice_form_content_row_val'>
              <Input
                className='input'
                value={formData.groupName}
                maxlength={50}
                placeholder='请输入群昵称（必填）'
                onInput={(e) => {
                  handleChangeFormData(e.detail.value, 'groupName');
                }}
              />
            </View>
          </View>
          <View className='invoice_form_content_row border_bottom'>
            <View className='invoice_form_content_row_label'>群人数</View>
            <View className='invoice_form_content_row_val'>
              <Input
                className='input'
                value={formData.peopleNum}
                maxlength={18}
                placeholder='请输入群人数'
                onInput={(e) => {
                  handleChangeFormData(e.detail.value, 'peopleNum');
                }}
              />
            </View>
          </View>
          <View className='item_wrap shop_scroll_wrap'>
            <View
              className='input_item_wrap'
              onClick={(e) => {
                e.stopPropagation();
                setShoplistShow(!shoplistShow);
              }}
            >
              <View className='item_time'>群标签</View>
              <Input value={formData.tagName} disabled  className='item_input' placeholder='请选择标签'></Input>
              <View className={`iconfont iconduanjiantou-xia ${shoplistShow ? 'rotate' : ''}`}></View>
            </View>
            {shoplistShow && (
              <ScrollView className='shop_scroll_view' scrollY scrollWithAnimation>
                {shopList.map((item) => {
                  return (
                    <View
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({
                          ...formData,
                          tagName: item.tagName,
                          tagId: item.id,
                        });
                        setShoplistShow(!shoplistShow);
                      }}
                      className={`scroll_item`}
                    >
                      {item.tagName}
                    </View>
                  );
                })}
              </ScrollView>
            )}
        </View>
          <View className='img_box'>
            <View className='text_box'>
              <View className='text_box_1'>群二维码（必传）</View>
              <View className='text_box_2'>上传微信群二维码</View>
            </View>
          {!formData.qrCodeUrl  ? 
            <View className='add_img' onClick={() => {handleAddImg('qrCodeUrl')}}>
              <View className='iconfont iconstroke2'></View>
            </View> :  <Image
              mode='aspectFit'
              onClick={() => {
                handleAddImg('qrCodeUrl')
              }}
              src={formData.qrCodeUrl}
            ></Image>
            }
          </View>
          <View className='img_box'>
          <View className='text_box'>
            <View className='text_box_1'>群封面</View>
            <View className='text_box_2'>上传微信群封面</View>
          </View>
        {!formData.headImagePic ? (
          <View className='add_img' onClick={() => {handleAddImg('headImagePic')}}>
            <View className='iconfont iconstroke2'></View>
          </View>
        ) : <Image
          mode='aspectFit'
          onClick={() => {
            handleAddImg('headImagePic')
         }}
          src={formData.headImagePic}
        ></Image>}
        </View>
          <View className='btn_wrap'>
            <View className={`btn_item widthFix ${!handleCheck() && 'gray'}`} onClick={handleSubmit}>
                提交
            </View>
          </View>
      </View>
    </View>
  );
};
export default EditGroup;
