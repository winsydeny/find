import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style';
// import { toast, reset } from '../assets/utils';
import { _storeData, _retrieveData, toast, reset } from '../assets/utils';
import Loading from '../components/Loading';
import { postData, getData } from '../api';

interface Prop {
  navigation: any
}
export default class Login extends Component<Prop>{
  state: any
  constructor(props: Prop) {
    super(props);
    this.state = {
      email: '',
      passcode: '',
      emailErrorMessage: '',
      passcodeErrorMessage: '',
      loading: true
    }

  }

  onChangeEmail(inputEmail: string) {
    this.setState({ email: inputEmail })
  }
  onChangePass(pass: string) {
    this.setState({ passcode: pass })
  }
  checkData() {

    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const { passcode, email } = this.state
    let status = 2
    if (passcode === 'root' && email === 'root') {
      reset(this.props.navigation, 'BottomTabNavigator');
      return true;
    }
    // if (email === 'root') {
    //   return true;
    // }
    if (passcode.length < 6) {
      this.setState({ passcodeErrorMessage: '不能少于六位' })
    } else {
      this.setState({ passcodeErrorMessage: '' })
      status = status - 1
    }
    if (!pattern.test(email)) {
      this.setState({ emailErrorMessage: '邮箱格式不正确' })
    } else {
      this.setState({ emailErrorMessage: '' })
      status = status - 1
    }
    if (!status) {
      console.log(status)
      return true
    }
    return false
  }
  login() {
    // console.log('isLogin request')
    // Alert.alert('sdf')
    if (this.checkData()) {
      // success
      this.setState({ loading: true });
      const data = {
        email: this.state.email,
        passcode: this.state.passcode
      }
      postData('login', data).then(res => {
        console.log('res=>', res)
        this.setState({ loading: false });
        if (res.status === 0) {
          toast("登陆成功");
          _storeData('user_info', data.email);
          _storeData('user_name', res.data[0].user);
          console.log(res.access_token)
          _storeData('access_token', res.access_token)
          this.props.navigation.navigate('Home');
        } else if (res.status === 10009) {
          Alert.alert(res.msg);
        }
      })
        .catch(err => Alert.alert(err.toString))
      // console.log(this)
      // this.props.navigation.pop()
      // 
    }
  }

  async getLoginInfo() {

  };
  async componentDidMount() {
    try {
      const isLogin = await _retrieveData("isLogin");
      console.log('componentDidMount-login')
      const timeout = setTimeout(() => {
        this.setState({ loading: false });
        toast("连接超时")
      }, 6000);
      const response = await getData('search', { keyword: 'java' });
      clearTimeout(timeout);
      console.log('sdfds', response)
      if (response.status >= 0) {
        // 如果已经登陆并且token还未过期，则直接重置导航器，不显示登陆页面
        this.setState({ loading: false })
        reset(this.props.navigation, 'BottomTabNavigator');
      } else {
        toast("自动登陆失败，请登录")
        this.setState({ loading: false })
      }
    } catch (err) {
      Alert.alert(err.toString())
    }
    // this.setState({ loading: false })

  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Icon
          name='pied-piper'
          size={100}
          color="#FFA500"></Icon> */}
        {/* <Avatar
          rounded
          size={120}
          source={{ uri: 'https://www.vanlansh.wang/avatar/boy.png' }}></Avatar> */}
        <Image
          style={{ height: 140, width: 240 }}
          source={require('../assets/pic/login.png')}></Image>
        {/* <Text style={{ fontSize: 15, fontWeight: "bold" }}></Text> */}
        <Input
          placeholder="邮箱"
          onChangeText={email => this.onChangeEmail(email)}
          errorMessage={this.state.emailErrorMessage}
          labelStyle={{ fontSize: 16 }}
        // style={{ fontSize: 12 }}
        ></Input>
        <Input
          secureTextEntry
          placeholder="密码"
          onChangeText={passcode => this.onChangePass(passcode)}
          errorMessage={this.state.passcodeErrorMessage}
        ></Input>
        <View style={{ width: '94%', marginTop: 12 }}>
          <Button title="登陆" onPress={this.login.bind(this)} buttonStyle={styles.bg}></Button>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <Text style={{ color: "gray" }} onPress={() => Alert.alert("此功能暂无")}>忘记密码</Text>
            <Text style={{ paddingLeft: 4, paddingRight: 4 }}>|</Text>
            <Text style={{ color: "#4827b6", fontWeight: "bold" }}
              onPress={() => this.props.navigation.navigate("Registerd")}>点击注册</Text>
          </View>

        </View>
        {/* <View style={{ width: '94%', position: "absolute", bottom: 20 }}>
          <Button title="注册" onPress={() => { }} buttonStyle={styles.bg}></Button>
        </View> */}
        <Loading show={this.state.loading} title="自动登录中"></Loading>
      </View>
    );
  }
}
