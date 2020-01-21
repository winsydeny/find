
import React, { Component } from 'react';
import { Text, View } from 'react-native';
const Name = 'This is my macbook pro'
export default class Home extends Component {
  componentDidMount() {
    const value = typeof identity("xijia")

  }
  render() {
    const value = identity<string>('sdf')

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Mine</Text>
        <Text>{value}</Text>
      </View>
    );
  }
}


function identity<T>(arg: T): T {
  return arg
}
