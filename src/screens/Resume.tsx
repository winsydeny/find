
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableNativeFeedbackBase,
  Picker,
  Alert,
  Dimensions,
  DeviceEventEmitter
  // DeviceEventEmitter
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native-gesture-handler';
import global from '../../style';
interface Prop {
  navigation: any
}
export default class Resume extends Component<Prop> {
  state = {
    num: '0',
    name: 'sydenny@126.com',
    cellphone: null,
    advantage: null,
    position: null,
    resume: null,
    eduction: null,
    screenWidth: Math.round(Dimensions.get('window').width),
    screenHeight: Math.round(Dimensions.get('window').height)
  };
  componentDidMount() {
    DeviceEventEmitter.addListener("@resume_advantage", value => this.setState({ advantage: value }));
    DeviceEventEmitter.addListener("@personal_name", value => this.setState({ name: value }));
    DeviceEventEmitter.addListener("@personal_cellphone", value => this.setState({ cellphone: value }));
  };
  // setListern(events:Array){
  //   events.map((item:string)=>{
  //     DeviceEventEmitter.addListener(item, value => this.setState({}))
  //   })
  // };
  componentWillUnmount() {
    this.setState = (state, callback) => false;
  };
  render() {
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>我的简历</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 18, paddingRight: 18 }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ResumePersonal', { transition: 'forHorizontal' })}>
            <View style={styles.box}>
              <Text style={styles.h1}>{this.state.name}</Text>
              <Text style={styles.text}>{this.state.cellphone}</Text>
              {/* <View style={{ height: 1, backgroundColor: "#2e2e2e" }}></View> */}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ResumeAdvantage", { transition: 'forHorizontal' })}>
            <View style={styles.box}>
              <Text style={styles.h1}>个人优势</Text>
              <Text numberOfLines={2} style={styles.text}>{this.state.advantage === null ? '点击填写您的优势' : this.state.advantage}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.h1}>求职期望</Text>
              <Text style={styles.text}>{this.state.position === null ? '点击填写' : this.state.position}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.h1}>教育经历</Text>
              <Text style={styles.text}>{this.state.eduction === null ? '点击填写教育经历' : this.state.eduction}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => Alert.alert("success")}>
            <View style={styles.box}>
              <Text style={styles.h1}>简历附件</Text>
              <Text style={styles.text}>{this.state.resume === null ? '点击上传' : this.state.resume}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
        {/* <View style={{ position: "absolute", backgroundColor: "rgba(0,0,0,0.4)", height: this.state.screenHeight, width: this.state.screenWidth }}>
        </View> */}
      </View >
    );
  }
}
const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    // borderBottomColor: "#eef0f4",
    // borderBottomWidth: 1
  },
  h1: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 30
  },
  text: {
    lineHeight: 19,
    marginBottom: 18
  }
})