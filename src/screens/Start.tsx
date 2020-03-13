
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import { _storeData, _retrieveData, toast } from '../assets/utils';
const Name = 'This is my macbook pro'
export default class Home extends Component {
  state = {
    num: '0',
    sec: 3
  }
  timer: any;
  isLogin() {
    _retrieveData('isLogin')
      .then((res: string) => {
        if (Boolean(res)) {
          this.props.navigation.navigate("Home");
          toast("登陆成功")
        }
      })
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.sec <= 1) {
        // this.props.navigation.navigate('Home')
        toast("Login");
        clearTimeout(this.timer);
        return false;
      }
      this.setState({ sec: this.state.sec - 1 })
      // console.log('sdf')
    }, 1000);
  };

  render() {
    const { sec } = this.state;
    return (
      <View style={{ backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar backgroundColor="red" barStyle="dark-content"></StatusBar>
        <Text>{sec}秒后进入</Text>
        <Text style={{ color: "#FFFFFF", fontSize: 23, fontWeight: "bold" }}>Find your job</Text>
      </View>
    );
  }
}
