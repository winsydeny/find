import React, { Component } from 'react';
import global from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from './Login'
// import { Text, View,Button } from 'react-native';
import { SearchBar, Text, Avatar, Button, Badge } from 'react-native-elements';
import ListItem from '../components/ListItem';
import Geolocation from '@react-native-community/geolocation';
import { _storeData, toast, reset } from '../assets/utils';
import { StackActions, NavigationActions } from "react-navigation"
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  PermissionsAndroid,
  DeviceEventEmitter,
  Platform,
  BackHandler,
} from 'react-native';
interface Props {
  navigation: any;
}
export default class Home extends Component<Props> {
  state = {
    search: '',
    modalVisible: false,
    latitude: null,
    longitude: null,
    current: null,
  };
  listener: any;
  updateSearch(search: string) {
    this.setState({
      search: search,
    });
  }
  search() {
    // console.log('search');
    Alert.alert('search successful');
  }
  async getLocation() {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]
    const granteds = await PermissionsAndroid.requestMultiple(permissions);
    if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
      Geolocation.getCurrentPosition((res: any) => {
        const { longitude, latitude } = res.coords
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
        fetch(`https://restapi.amap.com/v3/geocode/regeo?key=3e682fe78613fe4f024e2d2d5ac98940&location=${longitude},${latitude}`)
          .then((response) => response.json())
          .then((responseJson: any) => {
            const { city, province } = responseJson.regeocode.addressComponent;
            let current = city.length === 0 ? province : city;
            if (province.length === 0 && city.length === 0) {
              current = '定位失败'
            }
            this.setState({
              current: current
            })
          }).catch((err: any) => console.log(err))
      })
    } else {
      Alert.alert("定位权限被禁止")
    }
  };

  exitApp() {
  }
  componentDidMount() {
    // console.log(this.props)
    // this.props.navigation.actions.reset();
    // this.props.navigation.navigate("Login")

    BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    this.getLocation();
    this.listener = DeviceEventEmitter.addListener('@Location', (city) => {
      this.setState({
        current: city
      });
      toast("位置修改成功");
    })
  };
  componentDidUpdate() {
    // toast('update');
  };
  componentWillUnmount() {
    this.listener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.exitApp);
    // ExceptionsManager.js:126 Warning: Can't perform a React state update on an unmounted component. 用下面这段代码解决这个问题
    this.setState = (state, callback) => {
      return;
    };
    // toast('exit')
  };
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation
    // this.renderLogin();
    return (
      <View
        style={{
          paddingBottom: 44,
          marginTop: global.statusBarHeight.paddingTop,
        }}>
        {/* <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar> */}

        {/* <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"></StatusBar> */}
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
            onPress={() => this.props.navigation.push('Search', { transition: "forHorizontal" })}>
            <View style={styles.searchBar}>
              <Icon
                name="search1"
                style={{ paddingLeft: 10, color: '#867f7fc9' }}></Icon>
              <Text style={{ paddingLeft: 6, color: '#867f7fc9' }}>请输入</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={{ paddingBottom: 10 }} onPress={() => this.props.navigation.push("Location")}>{this.state.current}</Text>
          {/* <Avatar
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
            containerStyle={{ position: 'absolute', top: 0, right: 2 }}></Badge> */}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#f4f5f5" }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 12, paddingTop: 8 }}>
            公司推荐
            </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 12 }}>
            <View style={styles.cardBox}>
              <TouchableWithoutFeedback onPress={() => navigate('Forum')}>
                <View style={[styles.card, styles.bg1]}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>FaceBook</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigate('ListDetail')}>
                <View style={[styles.card, styles.bg2]}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>Apple</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* <View style={styles.card}></View> */}
              <View style={[styles.card, styles.bg3, { marginRight: 28 }]}>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>Baidu</Text>
              </View>
            </View>
          </ScrollView>

          <View>
            <View style={{ height: 60, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 12 }}>为你推荐</Text>
              <Text style={{ fontSize: 14, paddingRight: 12, position: "absolute", right: 0, color: global.bg2.backgroundColor }}>查看更多</Text>
            </View>
            {/* <View style={{ marginBottom: 10 }}>
              <ListItem
                navigate={this.props.navigation}
                data={{ key: 'sdf' }}></ListItem>
            </View>
            <View style={{ marginBottom: 10 }}>
              <ListItem navigate={this.props.navigation}></ListItem>
            </View>
            <View style={{ marginBottom: 10 }}>
              <ListItem navigate={this.props.navigation}></ListItem>
            </View> */}
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
    backgroundColor: '#2e77f3',
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
  bg1: {
    backgroundColor: '#2e77f3'
  },
  bg2: {
    backgroundColor: '#c0c0c0',
    color: "#FFFFFF",
  },
  bg3: {
    backgroundColor: '#e10602',
    color: "#FFF",
  }
});
