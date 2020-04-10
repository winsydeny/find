
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
import { toast } from '../assets/utils';
import { saveImg, postData } from '../api';
import global from '../../style'
import { FlatList } from 'react-native-gesture-handler';
interface Prop {
  navigation: any
}
export default class Applicant extends Component<Prop> {
  state = {
    num: 0,
    value: '',
    holder: `请输入职位描述`

  };
  onChangeText(text: string) {
    this.setState({ value: text, num: text.length })
  };
  save() {
    // request api and save my advantage in the futrue
    if (this.state.value === '') {
      toast("为空时不能提交！")
      return false;
    }
    DeviceEventEmitter.emit('@agent_jd', this.state.value)
    this.props.navigation.goBack();
  };
  componentDidMount() {

  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        {/* <FlatList
        ></FlatList> */}
        <View>
          <Text>Xijia</Text>
        </View>
      </View>
    );
  }
}
