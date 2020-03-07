import React, { Component } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import EnIcon from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/FontAwesome';
import global from '../../style';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Button, Alert, Image } from 'react-native';
interface Props {
  navigate?: any
}
export default class ListItem extends Component<Props> {
  state = {
    bookmark: false
  };
  collectJob() {
    this.setState({
      bookmark: true
    })
  };
  render() {
    const nav = this.props.navigate;
    return (
      <View style={styles.listCard}>
        <TouchableWithoutFeedback onPress={() => nav.navigate('ListDetail')}>
          <Image
            style={styles.img}
            source={{ uri: "https://facebook.github.io/react-native/img/tiny_logo.png" }}>
          </Image>
        </TouchableWithoutFeedback>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Director of Product Design</Text>
            <TouchableWithoutFeedback onPress={() => this.collectJob()}>
              {
                this.state.bookmark ?
                  <AIcon name="bookmark" style={[{ fontSize: 18, color: fontGray2 }, styles.textRight]}></AIcon> :
                  <AIcon name="bookmark-o" style={[{ fontSize: 18, color: fontGray2 }, styles.textRight]}></AIcon>
              }
            </TouchableWithoutFeedback>

          </View>

          <Text>Airbnb</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <EnIcon name="location-pin" style={{ fontSize: 14, color: fontGray2 }}></EnIcon>
            <Text style={{ color: fontGray2 }}>San Jose,California,US</Text>
            <Text style={[styles.textRight, { color: fontGray }]}>2 days ago</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <Text style={{ color: fontGray }}>Full Time</Text>
            <Text style={[styles.textRight, { color: blue, fontWeight: "bold" }]} onPress={() => Alert.alert("Apply for it")}>Apply for this job</Text>
          </View>
        </View>
      </View>
    )
  }
}

const fontGray = '#b0b4be';
const fontGray2 = '#98a0b0';
const { color } = global.fontColor;
const blue = global.font.color;
const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    borderRadius: 16,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 8
    // justifyContent: "center"
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 14
  },
  listCard: {
    marginLeft: 13,
    marginRight: 13,
    backgroundColor: '#FFFFFF',
    // height: 100,
    // marginTop: 12,
    // marginBottom: 12,
    borderRadius: 6,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
  },
  textRight: {
    position: 'absolute',
    right: 0
  }

});