import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
interface Prop {
  navigation: any
}
export default class ForumDetail extends Component<Prop> {
  render() {
    const { detail } = this.props.navigation.state.params;
    // console.log(detail);
    return (
      <View>
        <View style={styles.pan}>
          <Text>{detail}
          </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  pan: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 25,
    paddingBottom: 25
  }
})