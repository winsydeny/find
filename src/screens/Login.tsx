import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style';
// import { toast, reset } from '../assets/utils';
import { _storeData, _retrieveData, toast, reset } from '../assets/utils';
import Loading from '../components/Loading';

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
    if (this.checkData()) {
      // success
      // console.log(this)
      // this.props.navigation.pop()
      toast("登陆成功");
      _storeData('isLogin', 'true');
      this.props.navigation.navigate('Home');
    }
  }

  async getLoginInfo() {

  };
  async componentDidMount() {
    try {
      const isLogin = await _retrieveData("isLogin");
      if (isLogin) {
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
        <Avatar
          rounded
          size={120}
          source={{ uri: 'https://www.vanlansh.wang/avatar/boy.png' }}></Avatar>
        {/* <Text style={{ fontSize: 15, fontWeight: "bold" }}></Text> */}
        <Input
          placeholder="邮箱"
          onChangeText={email => this.onChangeEmail(email)}
          errorMessage={this.state.emailErrorMessage}
        // leftIcon={
        //   <Icon
        //     name='envelope'
        //     size={18}
        //     color={styles.fontColor.color}
        //   />
        // }
        ></Input>
        <Input
          secureTextEntry
          placeholder="密码"
          onChangeText={passcode => this.onChangePass(passcode)}
          errorMessage={this.state.passcodeErrorMessage}
        // leftIcon={
        //   <Icon
        //     name='key'
        //     size={18}
        //     color={styles.fontColor.color}></Icon>
        // }
        ></Input>
        <View style={{ width: '94%', marginTop: 12 }}>
          <Button title="登陆" onPress={this.login.bind(this)} buttonStyle={styles.bg}></Button>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <Text style={{ color: "gray" }} onPress={() => Alert.alert("此功能暂无")}>忘记密码</Text>
            <Text style={{ paddingLeft: 4, paddingRight: 4 }}>|</Text>
            <Text style={{ color: "#4827b6", fontWeight: "bold" }} onPress={() => this.props.navigation.navigate("Registerd")}>点击注册</Text>
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
