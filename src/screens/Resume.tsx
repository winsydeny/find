
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
// import ActionSheet from 'react-native-actionsheet' // yarn remove it 2019-3-21
import global from '../../style';
import { _retrieveData } from '../assets/utils';
import { getData } from '../api';
interface Prop {
  navigation: any
}
export default class Resume extends Component<Prop> {
  state = {
    num: '0',
    name: null,
    cellphone: null,
    advantage: null,
    position: null,
    resume: null,
    education: null,
    expectation: null,
    pdf: '',
    screenWidth: Math.round(Dimensions.get('window').width),
    screenHeight: Math.round(Dimensions.get('window').height)
  };
  showActionSheet() {

  }
  async getUserInfo() {
    const rs = await _retrieveData('user_name');
    const info = await getData('resume/info', {});
    console.log(info)
    this.setState({
      name: rs,
      cellphone: info.data.cellphone,
      advantage: info.data.advantage,
      position: info.data.expectation,
      expectation: info.data.expectation,
      education: info.data.education,
      pdf: info.data.online_resume
    })
  }
  componentDidMount() {
    console.log(this)
    this.getUserInfo()
    DeviceEventEmitter.addListener("@resume_advantage", value => this.setState({ advantage: value }));
    DeviceEventEmitter.addListener("@personal_name", value => this.setState({ name: value }));
    DeviceEventEmitter.addListener("@personal_cellphone", value => this.setState({ cellphone: value }));
    DeviceEventEmitter.addListener("@resume_expectation", value => this.setState({ position: value }))
    DeviceEventEmitter.addListener("@resume_education", value => this.setState({ education: value }))

  };
  // setListern(events:Array){
  //   events.map((item:string)=>{
  //     DeviceEventEmitter.addListener(item, value => this.setState({}))
  //   })
  // };
  // componentWillUnmount() {
  //   this.setState = (state, callback) => false;
  // };
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
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ResumePersonal', { name: this.state.name, cellphone: this.state.cellphone })}>
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
          <TouchableWithoutFeedback onPress={() => this.props.navigation.push('Expectation')}>
            <View style={styles.box}>
              <Text style={styles.h1}>求职期望</Text>
              <Text style={styles.text}>{this.state.position === null ? '点击填写' : this.state.position}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.push('Education')}>
            <View style={styles.box}>
              <Text style={styles.h1}>教育经历</Text>
              <Text style={styles.text}>{this.state.education === null ? '点击填写教育经历' : this.state.education}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            if (this.state.pdf !== '') {
              this.props.navigation.push('Preview', { uri: this.state.pdf });
              return false;
            }
            getData('resume/attach', {})
              .then(res => {
                if (res.status === 0) {
                  Alert.alert("发送成功，请前往您的邮箱上传PDF格式的简历");
                } else {
                  Alert.alert("failed")
                }
              }).catch(e => Alert.alert("发送失败"))
          }}>
            <View style={styles.box}>
              <Text style={styles.h1}>简历附件</Text>
              <Text style={styles.text}>{this.state.pdf === '' ? '点击上传' : this.state.pdf}</Text>
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