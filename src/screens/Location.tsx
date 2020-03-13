import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import CitySelector from '../components/CitySelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CIon from 'react-native-vector-icons/Ionicons'
import global from '../../style';
import { _storeData, _retrieveData, _getAllKey } from '../assets/utils'
interface Prop {
  navigation: any,
}
export default class Home extends Component<Prop> {
  state = {
    city: ''
  }
  _chooseCity(city: string) {
    // 后期可以直接通过navigation传值
    this.back()
    this.setState({ city: city });
    _storeData('citys', city);
    DeviceEventEmitter.emit('@Location', city);

  };
  componentDidMount() {
    // _retrieveData('citys')
    //   .then((res: any) => {
    //     this.setState({
    //       city: res
    //     })
    //   }).catch((err: any) => Alert.alert(String(err)));
  };
  back() {
    this.props.navigation.pop();
  }
  render() {
    const { city } = this.state
    return (
      <View>
        <View style={{ flexDirection: "row", height: 40, alignItems: "center" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 20, marginLeft: 18 }} onPress={() => this.back()}></CIon>
          <Text style={{ marginLeft: 12, fontWeight: "bold" }}>当前定位:</Text>
          <Text style={{ fontWeight: "bold" }}> {city === '' ? '定位失败' : city}</Text>
          <Icon name="my-location" style={[{ fontSize: 18, position: "absolute", right: 10 }, { color: global.bg2.backgroundColor }]}></Icon>
          {/* <Text style={{ position: "absolute", right: 12 }}>s</Text> */}
        </View>
        <CitySelector chooseCity={(res: string) => this._chooseCity(res)}></CitySelector>
      </View>
    );
  }
}
