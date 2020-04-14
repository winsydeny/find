
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  DeviceEventEmitter,
  StatusBar,
  StyleSheet
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../utils/utils';
import { saveImg, postData, getData } from '../api';
import global from '../../style'
import { PageControl } from 'react-native-ui-lib';
import { FlatList } from 'react-native-gesture-handler';
import { LoadingUtil } from '../utils/LoadingUtils';
interface Prop {
  navigation: any
}
export default class InviteList extends Component<Prop> {
  state = {
    list: [],
    datetime: '',
    location: ''
  };
  componentDidMount() {
    this.getList();
  };
  async getList() {
    try {
      const result = await getData('apply/record', { status: 0, apply: 1 });
      this.setState({ list: result.data });
      LoadingUtil.hideLoading();
    }
    catch (e) {
      console.log(e)
    }
  };
  async invited() {

  };

  render() {

    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop, paddingHorizontal: 16 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        <View>
          {
            this.state.list.length > 0 ?
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={this.state.list}
                renderItem={({ item: any }) => {
                  return (
                    <View>
                      {/* <Text>{item.vid}</Text> */}
                      <Text>姓名：{item.user}</Text>
                      <Text>职位：{item.position}</Text>
                      <Text>时间：{item.time}</Text>
                      <Text onPress={() => this.props.navigation.push('Video', { channel: item.vid })}>点击进入</Text>
                      <Text>-----------------------</Text>
                    </View>
                  )
                }} /> : <Text>暂无数据</Text>
          }

        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  title: {
    paddingRight: 10,
    width: 70
  }
})