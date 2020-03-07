
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
const Name = 'This is my macbook pro'
export default class Identity extends Component {
  state = {
    num: '0'
  }
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{}}>
          <View style={[styles.btn]}>
            <Button title="求职者" onPress={() => { }} color="gray"></Button>
          </View>
          <View style={[styles.btn]}>
            <Button title="招聘者" onPress={() => { }} color="gray"></Button>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 260,
    margin: 20
  }
})
