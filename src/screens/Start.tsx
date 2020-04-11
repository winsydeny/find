
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import { _storeData, _retrieveData, toast } from '../utils/utils';
interface Prop {
  navigation: any
}
export default class Home extends Component<Prop> {
  state = {
    num: '0',
    sec: 3
  }
  timer: any;
  isLogin() {
    // console.log('login')
    _retrieveData('isLogin')
      .then((res: string) => {
        console.log('res:', res)

        if (!Boolean(res) || res === null) {
          this.props.navigation.navigate("Login");
          toast("please login")
          return false;
        }
        // console.log(this)
        this.props.navigation.navigate("Home");
      })
  };
  componentDidMount() {
    this.isLogin();
    // this.timer = setInterval(() => {
    //   if (this.state.sec <= 1) {
    //     // this.props.navigation.navigate('Home')
    //     toast("Login");
    //     clearTimeout(this.timer);
    //     return false;
    //   }
    //   this.setState({ sec: this.state.sec - 1 })
    //   // console.log('sdf')
    // }, 1000);
  };

  render() {
    const { sec } = this.state;
    return (
      <View style={{ backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <StatusBar backgroundColor="red" barStyle="dark-content"></StatusBar> */}
        <Text>{sec}秒后进入</Text>
        <Text style={{ color: "#FFFFFF", fontSize: 23, fontWeight: "bold" }}>Find your job</Text>
      </View>
    );
  }
}
