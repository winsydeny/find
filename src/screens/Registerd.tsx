import React, { Component } from 'react';
import {
  Input,
  Button,
  Icon,
  Overlay,
  Text
} from 'react-native-elements'
import { View, ActivityIndicator, Alert } from 'react-native'
import styles from '../../style.js'
import { toast, _storeData } from '../utils/utils';
import { postData } from '../api/index';
export default class Registerd extends Component {
  state = {
    email: '',
    emailError: '',
    loading: false,
    btnInfo: '发送验证码',
    sendCode: false,
    code: '',
    passcode: ''
  }
  showAlert() {
    Alert.alert("", "已发送至邮箱,请查看并填写相关信息", [{ text: '我知道了' }])
  }
  getCode() {

    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (pattern.test(this.state.email)) {
      this.setState({ emailError: '', loading: true })
      const data = {
        email: this.state.email
      }
      _storeData('user_info', data.email);
      postData('register/send', data, false)
        .then(res => {
          if (res.status === 0) {
            this.setState({
              loading: false,
              sendCode: true,
              btnInfo: '注册'
            })
          } else if (res.status === 20000) {
            this.setState({
              loading: false,
            })
            Alert.alert(res.msg);
          }
        })
      // setTimeout(() => {
      //   this.setState({
      //     loading: false,
      //     sendCode: true,
      //     btnInfo: '注册'
      //   })
      //   // this.showAlert()
      // }, 200)
      // registerd success
    } else {
      this.setState({
        emailError: '邮箱格式错误'
      })
    }

  };
  registerd() {
    if (this.state.code !== '') {
      // vaild code
      const data = {
        code: this.state.code,
        email: this.state.email,
        passcode: this.state.passcode
      }
      postData('register', data, false)
        .then(res => {
          if (res.status === 0) {
            // toast("请先完善个人信息");
            this.props.navigation.navigate("RegisterPersonal");
          } else if (res.status === 20001) {
            Alert.alert(res.msg)
          }
        })
    } else {
      toast("验证码不能为空")
    }
  };
  operate() {
    // this.props.navigation.navigate("RegisterPersonal");

    if (this.state.btnInfo === '注册') {
      this.registerd();
    } else {
      this.getCode();
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Input
          placeholder="请输入邮箱"
          errorMessage={this.state.emailError}
          onChangeText={email => this.setState({ email: email })}></Input>
        {this.state.sendCode ?
          <>
            <Input
              secureTextEntry
              textContentType="password"
              placeholder="密码"
              onChangeText={code => this.setState({ passcode: code })}></Input>
            <Input
              placeholder="验证码"
              onChangeText={code => this.setState({ code: code })}></Input>
          </>
          : null
        }
        <View style={{ width: '94%', marginTop: 12 }}>
          <Button
            buttonStyle={styles.bg}
            title={this.state.btnInfo}
            loading={this.state.loading}
            onPress={this.operate.bind(this)}></Button>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}

        </View>
      </View >
    )
  }
}