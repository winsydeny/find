
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  ViewPagerAndroid,
  DeviceEventEmitter
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import CIon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Rating from '../components/Rating'
import global from '../../style'
import { getData } from '../api';
import { LoadingUtil } from '../utils/LoadingUtils';
interface Prop {
  navigation: any
}
export default class Message extends Component<Prop> {
  state = {
    num: '0',
    list: [1, 2, 3, 4, 5, 6],
    tab: 0,
    startList: [],
    empty: false,
  };
  viewPager: any;
  tabView: any;
  rate(key: number) {
    // console.log()
    // Alert.alert(key)
  };
  switch(key: number) {
    console.log('first', key);
    this.setState({
      tab: key
    })
    return false;
    // console.log('gggggggí', this.tabView.goToPage)
    // setTimeout(() => {
    //   this.tabView.goToPage(key)
    // }, 3000);
    // this.tabView.goToPage(1)
    // this.viewPager.setPage(key)
  };
  changeTab(e: any) {
    this.setState({
      tab: e
    })
    this.tabView.goToPage(e)
  };
  componentDidMount() {
    LoadingUtil.print();

    this.getList();
  };
  async getList() {
    /**
     * status 0 => 未开始 1 => 待评价
     * apply 0 => 未成功 1 => 申请成功
     */
    // console.log(this)
    this.setState({ empty: false });
    LoadingUtil.showLoading();
    const notStarted = await getData('apply/record', { status: 0, apply: 1 });
    console.log(notStarted)
    this.setState({ startList: notStarted.data });
    LoadingUtil.hideLoading();
    if (notStarted.data.length <= 0) {
      this.setState({ empty: true })
    }
    // console.log('message =>', notStarted)
  }
  renderTab() {
    return (
      <View style={{ flexDirection: "row", paddingVertical: 12, paddingLeft: 18, backgroundColor: "#FFFFFF" }}>

        <TouchableOpacity onPress={() => this.changeTab(0)} style={{ borderStyle: "solid", borderWidth: 1, borderColor: global.bg2.backgroundColor, borderRadius: 5, marginRight: 18 }}>
          <View style={[this.state.tab === 0 ? { backgroundColor: global.bg2.backgroundColor } : { backgroundColor: "#FFFFFF" }, { borderRadius: 5 }]}>
            <Text style={[this.state.tab === 0 ? styles.tab : { color: global.bg2.backgroundColor }, { padding: 6, paddingHorizontal: 18 }]}>未开始</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeTab(1)} style={{ borderStyle: "solid", borderWidth: 1, borderColor: global.bg2.backgroundColor, borderRadius: 5 }}>
          <View style={[this.state.tab === 1 ? { backgroundColor: global.bg2.backgroundColor } : { backgroundColor: "#FFFFFF" }, { borderRadius: 5 }]}>
            <Text style={[this.state.tab === 1 ? styles.tab : { color: global.bg2.backgroundColor }, { padding: 6, paddingHorizontal: 18 }]}>待评价</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '', paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>面试记录</Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row", marginTop: 12, marginLeft: 18, marginBottom: 8, }}>
          <TouchableOpacity onPress={() => this.switch(0)}>
            <View style={[this.state.tab === 0 ? { backgroundColor: global.bg2.backgroundColor } : { backgroundColor: "#FFFFFF" }, { borderRadius: 5, marginRight: 10 }]}>
              <Text style={[this.state.tab === 0 ? styles.tab : null, { padding: 6, paddingHorizontal: 18, }]}>未开始</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.switch(1)}>
            <View style={[this.state.tab === 1 ? { backgroundColor: global.bg2.backgroundColor } : { backgroundColor: "#FFFFFF" }, { borderRadius: 5, marginRight: 10 }]}>
              <Text style={[this.state.tab === 1 ? styles.tab : null, { padding: 6, paddingHorizontal: 18, }]}>已结束</Text>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
          <ScrollableTabView
            initialPage={0}
            renderTabBar={() => this.renderTab()}
            onChangeTab={(item) => this.switch(item.i)}
            tabBarTextStyle={{ fontSize: 12 }}
            tabBarActiveTextColor={global.bg2.backgroundColor}
            tabBarUnderlineStyle={{ backgroundColor: global.bg2.backgroundColor, height: 2.5 }}
            style={{}}
            ref={tabView => { this.tabView = tabView; }}
          >
            <ScrollView >
              {
                !this.state.empty ?
                  this.state.startList.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => { this.props.navigation.push('Video', { channel: item.vid }) }}>
                        <View style={styles.card} key={index} >
                          <View style={{ flexDirection: "row", paddingLeft: 16, paddingRight: 16 }}>
                            <View style={{ flex: 1, }}>
                              <Text style={{ fontWeight: "bold", lineHeight: 25 }}>{item.company}·{item.position}</Text>
                              <Text>北京 {item.time}</Text>
                              <Text style={{ color: global.bg2.backgroundColor, lineHeight: 30 }}>点击进入</Text>
                            </View>
                            <Avatar rounded></Avatar>
                          </View>
                          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  }) :
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 180 }}>
                    <Text style={{ fontSize: 14, }}>暂时有接受到邀请，请继续努力哦！</Text>
                  </View>
              }
            </ScrollView>
            <ScrollView >
              {
                this.state.list.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => { }}>
                      <View style={styles.card} key={index} >
                        <View style={{ flexDirection: "row", paddingLeft: 16, paddingRight: 16 }}>
                          <View style={{ flex: 1, }}>
                            <Text style={{ fontWeight: "bold", lineHeight: 25 }}>阿里巴巴·前端工程师</Text>
                            <Text>北京 12月17日</Text>
                          </View>
                          <Avatar rounded></Avatar>
                        </View>
                        <View>
                          {/* <Rating></Rating> */}
                          <AirbnbRating
                            count={5}
                            defaultRating={0}
                            size={20}
                            onFinishRating={(key) => this.rate(key)}
                          ></AirbnbRating>
                        </View>
                        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }

            </ScrollView>


          </ScrollableTabView>
        </View>


      </View >
    );

  }
}
const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    borderRadius: 6,
    marginHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 0,
    backgroundColor: "#FFFFFF"
  },
  tab: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  viewPager: {
    flex: 1,
  },
})

