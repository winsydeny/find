
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
const Name = 'This is my macbook pro'
import global from '../../style'
export default class Identity extends Component {
  state = {
    num: '0'
  }
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{}}>
          <View style={[styles.btn]}>
            <Button title="我要找工作" onPress={() => { }} color={global.bg2.backgroundColor}></Button>
          </View>
          <View style={[styles.btn]}>
            <Button title="我要招人" onPress={() => { }} color={global.bg2.backgroundColor}></Button>
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
