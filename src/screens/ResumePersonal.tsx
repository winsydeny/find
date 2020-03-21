
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
  Picker,
  DeviceEventEmitter
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import global from '../../style';
import { Prop } from '../@typs/index'
export default class ResumePersonal extends Component<Prop> {
  state = {
    num: '0',
    gender: null,
    identity: null,
    name: null,
    cellphone: null
  }
  componentDidMount() {
    DeviceEventEmitter.addListener("@personal_name", (value) => {
      this.setState({ name: value })
    });
    DeviceEventEmitter.addListener("@personal_cellphone", (value) => {
      this.setState({ cellphone: value })
    });
    const PERSONINFO = this.props.navigation.state.params;
    console.log(PERSONINFO);

    this.setState({ name: PERSONINFO.name, cellphone: PERSONINFO.cellphone })
  }
  render() {
    const { navigate } = this.props.navigation
    // const PERSONINFO = this.props.navigation.state;
    // this.setState({ name: PERSONINFO.name, cellphone: PERSONINFO.cellphone })
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>个人信息</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <TouchableWithoutFeedback onPress={() => navigate('Name', { name: this.state.name })}>
            <View style={styles.box}>
              <Text style={styles.text}>姓名</Text>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Text style={styles.h1}>{this.state.name === null ? '' : this.state.name}</Text>
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
          <TouchableWithoutFeedback onPress={() => this.props.navigation.push('CellPhone', { cellphone: this.state.cellphone })}>
            <View style={styles.box}>
              <Text style={styles.text}>电话号</Text>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Text style={styles.h1}>{this.state.cellphone === null ? '' : this.state.cellphone}</Text>
                <AntIcon name="right" style={{ position: "absolute", right: 18 }}></AntIcon>
              </View>
            </View>
          </TouchableWithoutFeedback>
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