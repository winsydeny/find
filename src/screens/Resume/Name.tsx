
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
import { toast, _storeData } from '../../utils/utils';
import { saveImg, postData } from '../../api';
import global from '../../../style';
interface Prop {
  navigation: any
}
export default class Name extends Component<Prop> {
  state = {
    num: 0,
    value: this.props.navigation.state.params.name,

  };
  onChangeText(text: string) {
    if (text.length > 240) {
      toast("字数限制为240字");
      return false;
    }
    this.setState({ value: text, num: text.length })
  };
  async save() {
    if (this.state.value === '') {
      toast("未输入任何字符")
      return false;
    }
    const data = {
      user: this.state.value
    }
    // request api and save my advantage in the futrue
    DeviceEventEmitter.emit("@personal_name", this.state.value);
    const rs = await postData('resume?v=user&type=1', data);

    await _storeData('user_name', this.state.value)
    toast("姓名修改成功");
    this.props.navigation.goBack();
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return false;
    };
  }
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>姓名</Text>
          </View>
          <AntIcon name="check" style={{ paddingRight: 18, fontSize: 24 }} onPress={() => this.save()}></AntIcon>
        </View>
        <View
          style={{ height: 160 }}
        >
          <TextInput
            autoFocus={true}
            placeholder="请输入您的名字"
            style={{ paddingLeft: 18, paddingRight: 18, fontSize: 18 }}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
          ></TextInput>
        </View>
        {/* <Text style={{ textAlign: "right", paddingRight: 18 }}>{this.state.num}/240</Text> */}
      </View>
    );
  }
}
