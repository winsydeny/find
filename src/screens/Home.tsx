import React, {Component} from 'react';
import global from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';
// import { Text, View,Button } from 'react-native';
import {SearchBar, Text, Avatar, Button, Badge} from 'react-native-elements';
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
    const {search} = this.state;
    return (
      <View
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 60,
          marginTop: 8,
        }}>
        <StatusBar backgroundColor="white" barStyle="dark-content"></StatusBar>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        > */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                style={{paddingLeft: 10, color: '#867f7fc9'}}></Icon>
              <Text style={{paddingLeft: 6, color: '#867f7fc9'}}>请输入</Text>
            </View>
          </TouchableWithoutFeedback>

          <Avatar
            rounded
            containerStyle={styles.avatar}
            avatarStyle={{}}
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}></Avatar>
            {/* <Badge
              status="error"
              value="9"
              badgeStyle={{}}
              containerStyle={{position:'absolute',top:0,right:8}}></Badge> */}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cardBox}>
              <View style={styles.card}></View>
              <View style={styles.card}></View>
              <View style={[styles.card]}></View>
            </View>
          </ScrollView>

          <View>
            <Text style={{lineHeight: 60, fontSize: 20, fontWeight: 'bold'}}>
              今日投递
            </Text>
            <View style={[styles.defaultCard]}>
              <Text>Status</Text>
            </View>
          </View>
          <View>
            <Text style={{lineHeight: 60, fontSize: 20, fontWeight: 'bold'}}>
              周数据
            </Text>
            <View style={[styles.defaultCard]}></View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{lineHeight: 60, fontSize: 20, fontWeight: 'bold'}}>
              月数据
            </Text>
            <View style={[styles.defaultCard]}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const {color} = global.fontColor;
const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginRight: 12,
    borderRadius: 16,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom:8
    // justifyContent:"center"
  },
  avatar: {
    marginRight: 8,
    marginBottom:8,
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
    width: 150,
    height: 180,
    backgroundColor: 'rgb(200, 204, 206)',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 14,
  },
  defaultCard: {
    height: 80,
    backgroundColor: 'rgb(200, 204, 206)',
    borderRadius: 8,
  },
});
