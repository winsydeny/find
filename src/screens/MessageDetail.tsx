
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import CIon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import global from '../../style'

export default class MessageDetail extends Component {
  state = {
    num: '0',
    list: [1, 2, 3, 4, 5, 6]
  }
  render() {
    const { detail } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, backgroundColor: '', marginTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>详情</Text>
          </View>
        </View>
        <View>

          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={0}
            size={20}
          ></AirbnbRating>
        </View>
      </View >
    );

  }
}
const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    borderRadius: 6,
    marginLeft: 16, marginRight: 16, paddingTop: 18, paddingBottom: 18, backgroundColor: "#FFFFFF"
  }
})

