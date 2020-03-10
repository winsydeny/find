import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';
import CitySelector from '../components/CitySelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../../style'
const Name = 'This is my macbook pro'
export default class Home extends Component {
    state = {
        city: ''
    }
    render() {
        const { city } = this.state
        return (
            <View>
                <View style={{ flexDirection: "row", height: 40, alignItems: "center" }}>
                    <Text style={{ marginLeft: 12, fontWeight: "bold" }}>当前定位:</Text>
                    <Text style={{ fontWeight: "bold" }}> {city === '' ? '定位失败' : city}</Text>
                    <Icon name="my-location" style={[{ fontSize: 18, position: "absolute", right: 10 }, { color: global.bg2.backgroundColor }]}></Icon>
                    {/* <Text style={{ position: "absolute", right: 12 }}>s</Text> */}
                </View>
                <CitySelector></CitySelector>

            </View>
        );
    }
}
