
import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Text, View, Button } from 'react-native';
interface Props {
  navigation: any
}
export default class Mine extends Component<Props> {
  componentDidMount() {
  }
  render() {
    const value = identity<string>('Mine')
    // const navigation = this.props.navigation
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{value}</Text>
        <Button title="login" onPress={() => this.props.navigation.navigate('Login')}></Button>
        <Button title="Registerd" onPress={() =>
          this.props.navigation.navigate('Registerd')
        }></Button>
        <Button title="go to hello" onPress={() => this.props.navigation.navigate('Mine')}></Button>
      </View>
    );
  }
}


function identity<T>(arg: T): T {
  return arg
}
