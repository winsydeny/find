
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { } from 'react-native-elements';
import CIon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const Name = 'This is my macbook pro'
export default class Message extends Component {
  state = {
    num: '0',
    list: [1, 2, 3, 4, 5, 6]
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>消息</Text>
          </View>
        </View>
        <ScrollView>
          {
            this.state.list.map((item, index) => {
              return (
                <View style={styles.card} key={index}>
                  <View style={{ flexDirection: "row", paddingLeft: 16, paddingRight: 16 }}>
                    <View style={{ flex: 1, }}>
                      <Text style={{ fontWeight: "bold", lineHeight: 25 }}>阿里巴巴·前端工程师</Text>
                      <Text>北京 12月17日</Text>
                    </View>
                    <Avatar rounded></Avatar>
                  </View>
                  <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
                    <View style={{ height: 32, backgroundColor: "#43c2ee", justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
                      <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: "bold" }}>同意</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
          {/* <View style={styles.card}>
            <View style={{ flexDirection: "row", paddingLeft: 16, paddingRight: 16 }}>
              <View style={{ flex: 1, }}>
                <Text style={{ fontWeight: "bold", lineHeight: 25 }}>阿里巴巴·前端工程师</Text>
                <Text>北京 12月17日</Text>
              </View>
              <Avatar rounded></Avatar>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
              <View style={{ height: 32, backgroundColor: "#43c2ee", justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: "bold" }}>同意</Text>
              </View>
            </View>
          </View> */}
        </ScrollView>

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

