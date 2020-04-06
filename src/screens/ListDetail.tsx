import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements'
import global from "../../style";
import EnIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
import { postData } from "../api";
import { _retrieveData, toast } from "../assets/utils";
interface Prop {
  navigation: any
}
export default class ListDetail extends Component<Prop> {
  async applyJob(info: any) {
    const email = await _retrieveData('user_info');
    const user = await _retrieveData('user_name');
    postData('apply', {
      uuid: info.uuid,
      email: email,
      user: user
    })
      .then(res => {
        if (res.status === 0) {
          toast("申请成功");
        } else if (res.status === 10004) {
          toast("您已经申请过了")
        }
      })
      .catch(err => toast("申请失败"))
  };
  render() {
    // console.log(this.props.navigation.state.params)
    const { jobdetail } = this.props.navigation.state.params;
    console.log('listDetail', jobdetail)
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar>
        {/* <View style={styles.header}>
          <Icon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></Icon>
          <View style={{ alignItems: 'center' }}>
            <Image style={{ width: 60, height: 60, marginTop: 40 }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}></Image>
          </View>
        </View> */}
        <View style={{ height: 48, backgroundColor: global.bg2.backgroundColor }}>
          <Icon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></Icon>
        </View>
        <ScrollView>
          <View style={styles.header}>
            {/* <Icon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></Icon> */}
            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 60, height: 60, }} source={{ uri: jobdetail.preview }}></Image>
            </View>
          </View>
          <View style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>{jobdetail.company}</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{jobdetail.position}</Text>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <EnIcon name="location-pin" style={{ fontSize: 22, marginLeft: -5, color: fontGray2 }}></EnIcon>
              <Text style={{ color: fontGray2, fontSize: 16, paddingBottom: 6 }}>{jobdetail.location}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: fontGray, fontSize: 16, }}>{jobdetail.created}</Text>
              <Text style={{ right: 0, position: "absolute", color: fontGray }}>14+ Applicants</Text>
            </View>
            <View style={styles.information}>
              <View style={styles.infoItem}>
                <Text style={{ color: fontGray2 }}>经验</Text>
                <Text style={[styles.top, { fontWeight: "bold" }]}>{jobdetail.experience}</Text>
              </View>
              <View style={[styles.infoItem,]}>
                <Text style={{ textAlign: "center", color: fontGray2 }}>工作类型</Text>
                <Text style={[, styles.top, { textAlign: "center", fontWeight: "bold" }]}>{jobdetail.type}</Text>
              </View>
              <View style={[styles.infoItem]}>
                <Text style={{ textAlign: "right", marginRight: 10, color: fontGray2 }}>薪水</Text>
                <Text style={[styles.top, { textAlign: "right", fontWeight: "bold" }]}>{jobdetail.salary}</Text>
              </View>

            </View>
            <View style={{ height: 0.6, backgroundColor: "#dcdcdcc7" }}></View>
          </View>
          <View style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 20 }}>
            <Text style={styles.h1}>职位描述（JD）</Text>
            <Text style={styles.content}>
              {jobdetail.description}
              {/* Vue.js is an open-source Model–view–viewmodel JavaScript{"\n"}
              1.Original author(s): Evan You{"\n"}
              {"\n"}
              2.Initial release: February 2014; 6 years ago\n{"\n"}
              {"\n"}
              3.License: MIT License\n{"\n"}
              4.Written in: JavaScript\n{"\n"}
              Stable release: 2.6.11 / December 13, 2019; 2 months ago{"\n"} */}
            </Text>

          </View>
        </ScrollView>
        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
          <Button
            buttonStyle={{ borderRadius: 30, backgroundColor: global.bg2.backgroundColor }}
            onPress={() => this.applyJob(jobdetail)}
            title="申请此职位"></Button>
        </View>

      </View >
    )
  }
}

const fontGray = '#b0b4be';
const fontGray2 = '#98a0b0';
const styles = StyleSheet.create({
  header: {
    height: 30,
    backgroundColor: global.bg2.backgroundColor,
    marginBottom: 28
  },
  arrow: {
    // color: global.bg2.backgroundColor,
    color: "#FFFFFF",
    // color: "#000",
    fontSize: 25,
    top: 22,
    left: 16,
    position: "absolute"
  },
  information: {
    flexDirection: "row",
    marginBottom: 18
    // backgroundColor: 'red'
    // alignItems: "center"
    // justifyContent: "center"
  },
  infoItem: {
    flex: 1,
  },
  top: {
    marginTop: 6
  },
  h1: {
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 10,
    fontSize: 18
  },
  content: {
    color: fontGray2,
    fontSize: 16,
    marginBottom: 7
  }
});