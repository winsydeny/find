import React, {Component} from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import {Button,Header,Input,SearchBar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Example extends Component {
  constructor(props){
    super(props)
  }
  state = {
    email:'',
    passcode:'',
    emailErrorMessage:'',
    passcodeErrorMessage:''
  }
  onChangeEmail(inputEmail){
    this.setState({ email:inputEmail })
  }
  onChangePass(pass){
    this.setState({ passcode:pass })
  }
  checkData(){
    
    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const { passcode,email } = this.state
    let status = 2
    if(passcode.length < 6){
      this.setState({passcodeErrorMessage:'不能少于六位'})
    }else{
      this.setState({passcodeErrorMessage:''})      
      status = status - 1
    }
    if(!pattern.test(email)){
      this.setState({emailErrorMessage:'邮箱格式不正确'})
    }else{
      this.setState({emailErrorMessage:''})
      status = status - 1
    }
    if(!status){
      console.log(status)
      return true
    }
    return false
  }
  registion(){
    
    if(this.checkData()){
      // success
      console.log(this)
      // this.props.navigation.pop()
      // this.props.navigation.navigate('Mine')
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon 
          name='pied-piper' 
          size={100} 
          color="#FFA500"></Icon>
        <Input 
          placeholder="邮箱"
          onChangeText={email => this.onChangeEmail(email)}
          errorMessage={this.state.emailErrorMessage}
          leftIcon={
            <Icon
              name='envelope'
              size={18}
              color='gray'
            />
          }></Input>
        <Input 
          placeholder="密码"
          onChangeText={passcode => this.onChangePass(passcode)}
          errorMessage={this.state.passcodeErrorMessage}
          leftIcon={
            <Icon
            name='key'
            size={18}
            color="gray"></Icon>
          }
          ></Input>  
          <View style={{width:'94%',marginTop:12}}>
            <Button title="注册" onPress={this.registion.bind(this)}></Button>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  search:{
    color:'red'
  },
  btn:{
    backgroundColor:'red'
  }
})