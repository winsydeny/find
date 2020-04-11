
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  DeviceEventEmitter,
  StatusBar
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../utils/utils';
import { saveImg, postData, getData } from '../api';
import global from '../../style'
import { FlatList } from 'react-native-gesture-handler';
interface Prop {
  navigation: any
}
export default class Applicant extends Component<Prop> {
  state = {
    list: [],
  };
  DeviceListern: any;
  componentDidMount() {
    this.DeviceListern = DeviceEventEmitter.addListener('@invited', () => this.getList());
    this.getList();
  };
  async getList() {
    const res = await getData('apply/agent', {});
    this.setState({ list: res.data });
  };
  componentWillUnmount() {
    this.DeviceListern.remove()
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        <View style={{ paddingHorizontal: 16 }}>
          {
            this.state.list.length > 0 ?
              <FlatList
                keyExtractor={item => item.job_uuid}
                data={this.state.list}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <Text>申请人:{item.user}</Text>
                      <Text>申请职位:{item.position}</Text>
                      <Text>申请时间:{item.created}</Text>
                      <Text onPress={() => this.props.navigation.push('Invite', { userInfo: item })}>邀请面试</Text>
                      <Text>-----------------------------</Text>
                    </View>
                  )
                }}
              /> : <Text>暂无数据</Text>
          }
        </View>
      </View >
    );
  }
}
