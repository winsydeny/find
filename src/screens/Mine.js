
import React, { Component } from 'react';
import { Text, View } from 'react-native';
const Name = 'This is my macbook pro'
export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Mine</Text>
      </View>
    );
  }
}
