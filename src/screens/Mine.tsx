
import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Text, View, Button, TouchableWithoutFeedback, StyleSheet, StatusBar } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../style'
interface Props {
  navigation: any
}
export default class Mine extends Component<Props> {
  componentDidMount() {
  }
  render() {
    const list = [
      {
        title: '登陆',
        name: 'Login',

      },
      {
        title: '注册',
        name: 'Registerd',
      },
      {
        title: '我的简历',
        name: 'Resume'
      },
      {
        title: '意见反馈',
        name: 'Login'
      },
      {
        title: '退出登陆',
        name: 'Login'
      }
    ]
    // const value = identity<string>('Mine')
    // const navigation = this.props.navigation
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <Button title="login" onPress={() => this.props.navigation.navigate('Login')}></Button>
      //   <Button title="Registerd" onPress={() =>
      //     this.props.navigation.navigate('Registerd')
      //   }></Button>
      // </View>
      <View>
        {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar> */}
        <View style={styles.avatarBg}>
          <Avatar
            size={120}
            rounded
            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
          ></Avatar>
        </View>
        <View>
          {
            list.map((list, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.push(list.name, { transition: 'forHorizontal' })}>
                <ListItem
                  rightIcon={<Icon name="right"></Icon>}
                  title={list.title}
                  bottomDivider
                ></ListItem>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
      </View>
    );
  }
}


// function identity<T>(arg: T): T {
//   return arg
// }
const styles = StyleSheet.create({
  avatarBg: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: global.bg2.backgroundColor,
    height: 160,
    // borderBottomLeftRadius:200,
    // borderBottomRightRadius:200
  }
})