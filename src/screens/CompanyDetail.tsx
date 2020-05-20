
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StatusBar
} from 'react-native';
import global from '../../style';
import CIon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
export default class CompanyDetail extends Component {
  state = {
    num: '0'
  }
  render() {
    const { com, url, detail } = this.props.navigation.state.params;
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar>
        <Image
          style={{ height: 200 }}
          source={{ uri: url }}></Image>
        <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18, color: "#FFFFFF", position: "absolute", top: 24 }} onPress={() => this.props.navigation.pop()}></CIon>
        <AIcon name="bookmark-o" style={[{ fontSize: 18, color: "#FFFFFF", position: "absolute", right: 18, top: 24, fontWeight: "bold" },]}></AIcon>
        <View style={{ paddingHorizontal: 16, paddingTop: 20, position: 'absolute', top: 170, backgroundColor: '#FFFFFF', borderRadius: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 16 }}>{com}</Text>
          <Text>{detail}</Text>
        </View>
      </View >
    );
  }
}
