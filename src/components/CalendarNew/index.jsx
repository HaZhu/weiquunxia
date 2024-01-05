import { ScrollView, Text, View } from '@tarojs/components';
import { Component } from 'react';
import dayjs from 'dayjs';
import './index.less';

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    // 默认显示当前时间之后的12个月
    const { startTime = new Date(), chooseDate = new Date() } = props;
    this.state = {
      startTime,
      num: 12,
      chooseDate,
      checkDate: chooseDate,
      disableSubmit: false
    };
  }

  renderWeek() {
    return (
      <View className="weeks">
        <View className="week">Sun</View>
        <View className="week">Mon</View>
        <View className="week">Tue</View>
        <View className="week">Wed</View>
        <View className="week">Thur</View>
        <View className="week">Fri</View>
        <View className="week">Sat</View>
      </View>
    );
  }

  renderDate = () => {
    const { startTime, num, chooseDate } = this.state;
    // validDates可选的日期['2021-05-05', '2021-05-06']
    const { validDates = [] } = this.props;
    const items = [];
    const dateNow = new Date();
    // 渲染num个月的数据
    for (let n = 0; n < num; n++) {
      let rows = [];
      // 每月最后一个日期
      let newDate = new Date(startTime.getFullYear(), startTime.getMonth() + 1 + n, 0);
      // 每月第一天的星期
      let week = new Date(startTime.getFullYear(), startTime.getMonth() + n, 1).getDay();
      // 每月有多少天
      let counts = newDate.getDate();
      // 本月行数
      let rowCounts = Math.ceil((counts + week) / 7);
      // 生成rowCounts行数据
      for (let i = 0; i < rowCounts; i++) {
        let days = [];
        /**
         * i = 0
         * j = 1 2 3 4 5 6 7
         * i = 1
         * j = 8 9 10 11 12 13 14
         */
        for (let j = i * 7 + 1; j < (i + 1) * 7 + 1; j++) {
          //根据每个月开始的［星期］往后推
          let dayNum = j - week;
          if (dayNum > 0 && j < counts + week + 1) {
            let dateObj = new Date(startTime.getFullYear(), startTime.getMonth() + n, dayNum);
            let dateStr = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dayNum;
            // 如果当前日期小于今天，则禁止选中
            // let isDisable = dateNow >= new Date(startTime.getFullYear(), startTime.getMonth() + n, dayNum + 1);
            // 如果不在可选日期内则禁止选中
            let isDisable = !validDates.includes(dayjs(dateStr).format('YYYY-MM-DD'));
            let isChoose = isSameDay(new Date(chooseDate), dateObj);
            // Taro如果给View绑定onClick，会额外绑定别的事件，这里为了性能考虑，disable的日期不绑定事件
            days.push(
              isDisable ? (
                <View className="date disable" key={dateStr}>
                  {dayNum}
                </View>
              ) : (
                <View className={`date ${isChoose ? 'active' : ''}`} key={dateStr} onClick={() => !isDisable && this.onChooseDate(dateStr)}>
                  <Text className="date_text">{dayNum}</Text>
                </View>
              )
            );
          } else {
            days.push(<View className="date"></View>);
          }
        }

        rows.push(
          <View className="row_date" key={`${newDate}/${i}`}>
            {days}
          </View>
        );
      }
      items.push(
        <View className="calendar_item" key={newDate}>
          <View className="row_month">{newDate.getMonth() + 1}月</View>
          {this.renderWeek()}
          {rows}
        </View>
      );
    }
    return <View>{items}</View>;
  };
  onChooseDate = (date) => {
    let formatDate = dayjs(date).format('YYYY-MM-DD');
    this.setState({
      chooseDate: formatDate
    });
    // this.props.onChoose && this.props.onChoose(formatDate);
  };
  handleSubmit = () => {
    this.props.onChoose && this.props.onChoose(this.state.chooseDate);
    // this.props.onSubmit && this.props.onSubmit(this.state.chooseDate);
  };
  handleReset = () => {
    this.setState(
      {
        chooseDate: ''
      },
      () => {
        this.props.onChoose && this.props.onChoose('');
      }
    );
  };
  render() {
    const { disableSubmit, chooseDate, checkDate } = this.state;
    const { showSubmit = true } = this.props;
    return (
      <View className="calendar_wrap">
        <ScrollView className="calendar_container" scrollY>
          {this.renderDate()}
        </ScrollView>
        {showSubmit && (
          <View className="calendar_bottom border_1px_top">
            <View className={`calendar_cannal_btn ${!checkDate && 'disable'}`} onClick={this.handleReset}>
              重置
            </View>
            <View className={`calendar_submit `} hoverClass="hover_light" onClick={this.handleSubmit}>
              确定
            </View>
          </View>
        )}
      </View>
    );
  }
}
