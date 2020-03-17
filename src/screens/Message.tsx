
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  ViewPagerAndroid
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import CIon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import global from '../../style'
import ViewPager from '@react-native-community/viewpager';
export default class Message extends Component {
  state = {
    num: '0',
    list: [1, 2, 3, 4, 5, 6],
    tab: 0,
  };
  viewPager: any;
  rate(key: number) {
    // console.log()
    // Alert.alert(key)
  };
  switch(key: number) {
    this.setState({
      tab: key
    })
    this.viewPager.setPage(key)
  };
  changeTab(e: any) {
    this.setState({
      tab: e.nativeEvent.position
    })
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
        <View style={{ flexDirection: "row", marginTop: 12, marginLeft: 18, marginBottom: 8, }}>
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
        </View>

        <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
          <ViewPager
            style={styles.viewPager}
            initialPage={this.state.tab}
            ref={viewPager => { this.viewPager = viewPager; }}
            onPageSelected={(key) => this.changeTab(key)}
          >
            <ScrollView key="1">
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
                        {/* <View>
                        <AirbnbRating
                          count={5}
                          defaultRating={0}
                          size={20}
                          onFinishRating={(key) => this.rate(key)}
                        ></AirbnbRating>
                      </View> */}
                        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }

            </ScrollView>
            <ScrollView key="2">
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

          </ViewPager>
          {/* <ScrollView>
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

        </ScrollView> */}
        </View>


      </View >
    );

  }
}
const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    borderRadius: 6,
    marginLeft: 16, marginRight: 16, paddingTop: 18, paddingBottom: 18, backgroundColor: "#FFFFFF"
  },
  tab: {
    color: "#FFFFFF", fontWeight: "bold"
  },
  viewPager: {
    flex: 1,
  },
})

