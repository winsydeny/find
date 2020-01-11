
import React, { Component } from 'react';
import { 
    Text, 
    View,
    Button
} from 'react-native';
const Name = 'This is my macbook pro'
export default class Home extends Component {
    state = {
        num:'0'
    }
    render() {
    return (
      <View>
        <Text>微信</Text>
        <Button title={this.state.num} onPress={() => {}}></Button>
      </View>
    );
  }
}
