
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../utils/utils';
import { saveImg, postData } from '../api';
import global from '../../style'
import { LoadingUtil } from '../utils/LoadingUtils';
interface Prop {
  navigation: any
}
export default class ResumeAdvantage extends Component<Prop> {
  state = {
    num: 0,
    value: '',

  };
  onChangeText(text: string) {

    if (text.length > 120) {
      toast("字数限制为120字");
      return false;
    }
    this.setState({ value: text, num: text.length })
  };
  async save() {
    // request api and save my advantage in the futrue
    /**
     * uio => user_info,
     * adv => advantage
     * exp => expectation
     * edu => education 
     * rum => resume
     */
    DeviceEventEmitter.emit("@resume_advantage", this.state.value);
    const rs = await postData('resume?v=advantage', { advantage: this.state.value });
    toast("保存成功");
    this.props.navigation.goBack();
    LoadingUtil.hideLoading();
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>我的优势</Text>
          </View>
          <AntIcon name="check" style={{ paddingRight: 18, fontSize: 24 }} onPress={() => this.save()}></AntIcon>
        </View>
        <View
          style={{ height: 160 }}
        >
          <TextInput
            autoFocus={true}
            style={{ paddingLeft: 18, paddingRight: 18, fontSize: 14 }}
            multiline={true}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
          ></TextInput>
        </View>
        <Text style={{ textAlign: "right", paddingRight: 18 }}>{this.state.num}/120</Text>
      </View>
    );
  }
}
