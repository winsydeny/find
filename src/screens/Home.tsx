import React, { Component } from 'react';
import global from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';
// import { Text, View,Button } from 'react-native';
import { SearchBar, Text, Avatar, Button, Badge } from 'react-native-elements';
import ListItem from '../components/ListItem'
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
interface Props {
  navigation: any;
}
export default class Home extends Component<Props> {
  state = {
    search: '',
    modalVisible: false,
  };
  updateSearch(search: string) {
    this.setState({
      search: search,
    });
  }
  search() {
    console.log('search');
    Alert.alert('search successful');
  }
  componentDidMount() {
    // this.props.navigation.navigate('Registerd')
  }
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation
    return (
      <View
        style={{

          paddingBottom: 58,
          marginTop: 8,
        }}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"></StatusBar>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        > */}
        <View style={{
          flexDirection: 'row', alignItems: 'center', paddingLeft: 12,
          paddingRight: 12,
        }}>
          {/* <SearchBar 
          clearIcon={true}
          placeholder="Type here ...."
          onChangeText={this.updateSearch.bind(this)}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputSearchBar}
          inputStyle={styles.input}
          value={search}
        /> */}
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Search')}>
            <View style={styles.searchBar}>
              <Icon
                name="search1"
                style={{ paddingLeft: 10, color: '#867f7fc9' }}></Icon>
              <Text style={{ paddingLeft: 6, color: '#867f7fc9' }}>请输入</Text>
            </View>
          </TouchableWithoutFeedback>
          <Avatar
            rounded
            size={50}
            containerStyle={styles.avatar}
            avatarStyle={{}}
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}></Avatar>
          <Badge
            status="error"
            value="10"
            badgeStyle={{}}
            containerStyle={{ position: 'absolute', top: 0, right: 2 }}></Badge>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#f4f5f5" }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 12, paddingTop: 8 }}>
            Top companies
            </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 12 }}>
            <View style={styles.cardBox}>
              <TouchableWithoutFeedback onPress={() => navigate('Forum')}>
                <View style={[styles.card]}>
                  <Text>每日动态</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigate('ListDetail')}>
                <View style={[styles.card]}>
                  <Text>详情</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* <View style={styles.card}></View> */}
              <View style={styles.card}></View>
            </View>
          </ScrollView>

          <View>
            <Text style={{ lineHeight: 60, fontSize: 20, fontWeight: 'bold', paddingLeft: 12 }}>
              Jobs for you
            </Text>
            <View style={{ marginBottom: 10 }}>
              <ListItem></ListItem>
            </View>
            <View style={{ marginBottom: 10 }}>
              <ListItem></ListItem>
            </View>
            <View style={{ marginBottom: 10 }}>
              <ListItem></ListItem>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const { color } = global.fontColor;
const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginRight: 12,
    borderRadius: 16,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 8
    // justifyContent:"center"
  },
  avatar: {
    marginRight: 8,
    marginBottom: 8,
    // width:50,
    // height:50,
    // borderRadius:200
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // width:516,
    marginTop: 20,
  },
  card: {
    width: 120,
    height: 150,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 14,
  },
  defaultCard: {
    height: 80,
    backgroundColor: 'rgb(200, 204, 206)',
    borderRadius: 8,
  },
});
