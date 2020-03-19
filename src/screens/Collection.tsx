
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import global from '../../style'
export default class Collection extends Component {
  state = {
    num: '0'
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: global.statusBarHeight.paddingTop }}>
        {/* <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar> */}
        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF", }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>我的收藏</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>暂无收藏</Text>
        </View>
      </View >
    );
  }
}
const dis = 15;
const styles = StyleSheet.create({
  container: {
    // marginLeft: dis,
    // marginRight: dis,
    // marginTop: dis - 4,
    // marginBottom: dis - 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    flex: 1
    // backgroundColor: "#FFFFFF"
  }
})