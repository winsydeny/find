
import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Text, View, Button,TouchableWithoutFeedback,StyleSheet,StatusBar } from 'react-native';
import { ListItem,Avatar  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
interface Props {
  navigation: any
}
export default class Mine extends Component<Props> {
  componentDidMount() {
  }
  render() {
    const list = [
      {
        title:'登陆',
        name: 'Login',
        
      },
      {
        title:'注册',
        name: 'Registerd',
      },
      {
        title:'我的简历',
        name: 'Login'
      },
      {
        title:'意见反馈',
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
        <View style={styles.avatarBg}>
        <Avatar
          size={120}
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
        ></Avatar>
        </View>
        <View>
        {
          list.map((list,index) => (
            <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.navigate(list.name)}>
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
  avatarBg:{
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:'green',
    height:120,
    // borderBottomLeftRadius:200,
    // borderBottomRightRadius:200
  }
})