
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import styles from '../../style';
export default class Resume extends Component {
  state = {
    num: '0'
  }
  render() {
    return (
      <View>
        <View style={{ height: 32, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 20, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, left: -18 }}>
            <Text>我的简历</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 18, paddingRight: 18 }}>
          <TouchableWithoutFeedback>
            <View>
              <Text>席佳</Text>
              <Text>一年内经验·24·本科</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text>个人优势</Text>
              <Text>水电费水电费</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback>
            <View>
              <Text>席佳</Text>
              <Text>一年内经验·24·本科</Text>
              <View style={{ height: 0.2, backgroundColor: "gray" }}></View>
            </View>
          </TouchableWithoutFeedback> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    // borderBottomColor: "#eef0f4",
    // borderBottomWidth: 1
  }
})