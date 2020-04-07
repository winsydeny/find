
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
import { toast } from '../assets/utils';
import { saveImg, postData } from '../api';
import global from '../../style'
interface Prop {
  navigation: any
}
export default class JobDesc extends Component<Prop> {
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
    const { params } = this.props.navigation.state;
    this.setState({ value: params.desc })
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>职位描述（JD）</Text>
          </View>
          <AntIcon name="check" style={{ paddingRight: 18, fontSize: 24 }} onPress={() => this.save()}></AntIcon>
        </View>
        <View
          style={{ height: 260 }}
        >
          <TextInput

            placeholder={this.state.holder}
            autoFocus={true}
            style={{ paddingLeft: 18, paddingRight: 18, fontSize: 14 }}
            multiline={true}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
          ></TextInput>
        </View>
        {/* <Text style={{ textAlign: "right", padding
        Right: 18 }}>{this.state.num}/240</Text> */}
      </View>
    );
  }
}
