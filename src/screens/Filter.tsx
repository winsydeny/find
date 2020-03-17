
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import { Button } from 'react-native-elements';
import CIon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import global from '../../style'
interface Prop {
  navigation: any
}
export default class Filter extends Component<Prop> {
  state = {
    num: '0',
    screenHeight: 0,
    list: [
      {
        title: '学历要求',
        options: ['不限', '大专', '本科', '硕士', '博士']
      },
      {
        title: '薪资待遇',
        options: ['不限', '3k以下', '3-5k', '5-10k', '10-20k', '20k以上']
      },
      {
        title: '经验要求',
        options: ['不限', '应届生', '1年以内', '1-3年', '3-5年', '5-10年']
      }
    ],
    // list => filter 映射 [0,0,0] => ['不限','不限','不限']
    filters: [0, 0, 0]
  }
  back() {
    this.props.navigation.pop();
  };
  filter() {
    DeviceEventEmitter.emit('@search_filter', this.state.filters);
    this.back()
  };
  choose(cate: number, option: number) {
    const rs: any = this.state.filters;
    rs[cate] = option;
    this.setState({
      filters: rs
    })
  };
  componentDidMount() {
    const screenHeight = Math.round(Dimensions.get('window').height);
    this.setState({
      screenHeight: screenHeight
    })
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ flexDirection: "row", height: 30, alignItems: "center", paddingLeft: 16, paddingRight: 16 }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 20 }} onPress={() => this.back()}></CIon>
          <Text style={{ marginLeft: 10 }}>筛选</Text>
        </View>
        <ScrollView style={{ height: this.state.screenHeight - 60 - 30 - 28, paddingLeft: 16, paddingRight: 16 }}>
          {
            this.state.list.map((item, index) => (
              <View key={index}>
                <Text style={styles.title}> {item.title}</Text>
                <View style={styles.cities}>
                  {
                    item.options.map((option, i) => (
                      <TouchableWithoutFeedback key={i} onPress={() => this.choose(index, i)}>
                        <View style={[styles.cityItem, this.state.filters[index] === i ? { backgroundColor: global.bg2.backgroundColor } : null]}>
                          <Text style={[this.state.filters[index] === i ? styles.selected : null]}>{option}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))
                  }
                </View>
              </View>
            ))
          }
        </ScrollView>
        <View style={{ height: 60, justifyContent: "center", paddingLeft: 20, paddingRight: 20 }}>
          <Button
            buttonStyle={{ backgroundColor: global.bg2.backgroundColor, borderRadius: 20 }}
            title="确定"
            onPress={() => this.filter()}></Button>
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15
  },
  cities: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cityItem: {
    flex: 0,
    backgroundColor: '#F6F5F5',
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 11,
    paddingBottom: 11,
    borderRadius: 18,
    marginTop: 14,
    marginRight: 10,
  },
  selected: {
    color: "#FFFFFF"
  }
})
