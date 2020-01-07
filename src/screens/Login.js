import React, {Component} from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import {Button,Header,Input,SearchBar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Example extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon 
          name='pied-piper' 
          size={100} 
          color="#FFA500"></Icon>
        <Input 
          placeholder="邮箱"
          leftIcon={
            <Icon
              name='envelope'
              size={18}
              color='gray'
            />
          }></Input>
        <Input 
          placeholder="密码"
          leftIcon={
            <Icon
            name='key'
            size={18}
            color="gray"></Icon>
          }
          ></Input>  
          <View style={{width:'94%',marginTop:12}}>
            <Button title="注册"></Button>
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