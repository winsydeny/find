
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../utils/utils';
import { saveImg, postData } from '../api';
import global from '../../style'
interface Prop {
  navigation: any
}
export default class Feedback extends Component<Prop> {
  state = {
    num: 0,
    value: '',

  };
  onChangeText(text: string) {

    if (text.length > 240) {
      toast("字数限制为240字");
      return false;
    }
    this.setState({ value: text, num: text.length })
  };
  save() {
    // request api and save my advantage in the futrue
    if (this.state.value === '') {
      toast("亲，意见为空时不能提交的哦！")
      return false;
    }
    postData('feedback', { content: this.state.value })
      .then(res => {
        if (res.status === 0) {
          toast("非常感谢，反馈成功");
        }
      })
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>意见反馈</Text>
          </View>
          <AntIcon name="check" style={{ paddingRight: 18, fontSize: 24 }} onPress={() => this.save()}></AntIcon>
        </View>
        <View
          style={{ height: 160 }}
        >
          <TextInput
            placeholder="请输入您的意见"
            autoFocus={true}
            style={{ paddingLeft: 18, paddingRight: 18, fontSize: 14 }}
            multiline={true}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
          ></TextInput>
        </View>
        <Text style={{ textAlign: "right", paddingRight: 18 }}>{this.state.num}/240</Text>
      </View>
    );
  }
}
