
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Picker
} from 'react-native';
import { Button } from 'react-native-elements'
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import global from '../../style'
import { toast } from '../assets/utils';
export default class RegisterPersonal extends Component {
  state = {
    num: '0',
    gender: null,
    identity: null
  };
  register() {
    toast("注册成功");
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          {/* <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon> */}
          <View style={{ alignItems: "center", marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>个人信息</Text>
          </View>
        </View>
        <View style={{ width: "92%" }}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.text}>姓名</Text>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Text style={styles.h1}>席佳</Text>
                <AntIcon name="right" style={{ position: "absolute", right: 18 }}></AntIcon>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.text}>性别</Text>
              <Picker
                selectedValue={this.state.gender}
                style={{ height: 22, marginLeft: -6 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ gender: itemValue })
                }>
                <Picker.Item label="男" value="male" />
                <Picker.Item label="女" value="female" />
              </Picker>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.text}>身份</Text>
              <Picker
                selectedValue={this.state.identity}
                style={{ height: 22, marginLeft: -6 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ identity: itemValue })
                }>
                <Picker.Item label="学生" value="student" />
                <Picker.Item label="职场人" value="graduate" />
              </Picker>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.text}>电话号</Text>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Text style={styles.h1}>18809481946</Text>
                <AntIcon name="right" style={{ position: "absolute", right: 18 }}></AntIcon>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ position: "absolute", bottom: 20, width: "94%" }}>
          <Button
            buttonStyle={{ backgroundColor: global.bg2.backgroundColor }}
            title="完成注册"
            // loading={this.state.loading}
            onPress={() => this.register()}></Button>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    // marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    paddingBottom: 18
    // borderBottomColor: "#eef0f4",
    // borderBottomWidth: 1
  },
  h1: {
    fontWeight: "bold",
    fontSize: 18,
    // marginBottom: 18
  },
  text: {
    lineHeight: 30,
  }
})