import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedbackComponent,
  TouchableHighlightBase,
  Alert
} from 'react-native';
import global from '../../style'
import { reset } from '../assets/utils';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const Name = 'This is my macbook pro'
interface Props {
  navigation: any;
}
export default class Agent extends Component<Props> {
  state = {
    num: '0'
  };
  goto(route: string) {
    this.props.navigation.push(route);
  };
  componentDidMount() {
    // reset(this.props.navigation, 'Agent');
  };
  render() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar>
        <Image
          style={{ height: 220 }}
          source={{ uri: 'https://www.vanlansh.wang/agent_bg.jpg' }}></Image>
        <View style={styles.container}>
          <TouchableNativeFeedback
            onPress={() => this.goto('Add')}
            style={[styles.card, {
              borderRightWidth: 1,
              borderBottomWidth: 1
            }]}
          >
            <Image
              style={styles.icons}
              source={require('../assets/pic/WISHLIST.png')}
            ></Image>
            <Text style={styles.title}>Add To</Text>

          </TouchableNativeFeedback>
          <TouchableNativeFeedback style={[styles.card, {
            borderBottomWidth: 1
          }]}
            onPress={() => Alert.alert("此功能未开通")}
          >
            <Image style={styles.icons} source={require('../assets/pic/FASTDELIVERY.png')}></Image>
            <Text style={styles.title}>Invitation</Text>
          </TouchableNativeFeedback>
          <View style={[styles.card, {
            borderRightWidth: 1
          }]}>
            <Image style={styles.icons} source={require('../assets/pic/SEARCH.png')}></Image>
            <Text style={styles.title}>Search</Text>
          </View>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.push('Applicant')}
            style={styles.card}>
            <Image style={styles.icons} source={require('../assets/pic/PROFILE.png')}></Image>
            <Text style={styles.title}>Applicant</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'red',
    height: 100,
    width: 140,
    borderColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: "center"

    // margin: 4
  },
  container: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    marginTop: 60,
    flexWrap: "wrap",
    // width: 136,
  },
  icons: {
    width: 40,
    height: 40,
    marginBottom: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  }
})
