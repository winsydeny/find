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
interface Prop {
  navigation: any
}
export default class ListDetail extends Component<Prop> {
  render() {
    return (
      <View >
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar>
        {/* <View style={styles.header}>
          <Icon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></Icon>
          <View style={{ alignItems: 'center' }}>
            <Image style={{ width: 60, height: 60, marginTop: 40 }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}></Image>
          </View>
        </View> */}
        <ScrollView>
          <View style={styles.header}>
            <Icon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></Icon>
            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 60, height: 60, marginTop: 40 }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}></Image>
            </View>
          </View>
          <View style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>FaceBook</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Princile & Lead UX Engineer</Text>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <EnIcon name="location-pin" style={{ fontSize: 22, marginLeft: -5, color: fontGray2 }}></EnIcon>
              <Text style={{ color: fontGray2, fontSize: 16, paddingBottom: 6 }}>Sydney,Australia</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: fontGray, fontSize: 16, }}>4 days ago</Text>
              <Text style={{ right: 0, position: "absolute", color: fontGray }}>14+ Applicants</Text>
            </View>
            <View style={styles.information}>
              <View style={styles.infoItem}>
                <Text style={{ color: fontGray2 }}>Experience</Text>
                <Text style={[styles.top, { fontWeight: "bold" }]}>2-5 Years</Text>
              </View>
              <View style={[styles.infoItem,]}>
                <Text style={{ textAlign: "center", color: fontGray2 }}>Employment</Text>
                <Text style={[, styles.top, { textAlign: "center", fontWeight: "bold" }]}>Full Time</Text>
              </View>
              <View style={[styles.infoItem]}>
                <Text style={{ textAlign: "right", marginRight: 10, color: fontGray2 }}>Salary</Text>
                <Text style={[styles.top, { textAlign: "right", fontWeight: "bold" }]}>$10,000</Text>
              </View>

            </View>
            <View style={{ height: 0.6, backgroundColor: "#dcdcdcc7" }}></View>
          </View>
          <View style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 20 }}>
            <Text style={styles.h1}>Job Description</Text>
            <Text style={styles.content}>
              Vue.js is an open-source Model–view–viewmodel JavaScript{"\n"}
              1.Original author(s): Evan You{"\n"}
              {"\n"}
              2.Initial release: February 2014; 6 years ago\n{"\n"}
              {"\n"}
              3.License: MIT License\n{"\n"}
              4.Written in: JavaScript\n{"\n"}
              Stable release: 2.6.11 / December 13, 2019; 2 months ago{"\n"}
            </Text>
            <Button
              buttonStyle={{ borderRadius: 30, backgroundColor: global.bg2.backgroundColor }}
              onPress={() => Alert.alert("Already Apply")}
              title="Apply for this job"></Button>
          </View>
        </ScrollView>
      </View >
    )
  }
}

const fontGray = '#b0b4be';
const fontGray2 = '#98a0b0';
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: global.bg2.backgroundColor,
    marginBottom: 28
  },
  arrow: {
    // color: global.bg2.backgroundColor,
    color: "#FFFFFF",
    // color: "#000",
    fontSize: 25,
    top: 28,
    left: 25,
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