
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons';

import global from '../../style'

export default class Add extends Component {
  state = {
    num: '0'
  }
  render() {
    return (
      <View style={{ marginTop: global.statusBarHeight.paddingTop }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>

        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Add To</Text>
          </View>
        </View>
      </View>
    );
  }
}
