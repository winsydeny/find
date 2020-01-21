
import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';
interface IState {
  date: number
}
export default class Home extends Component<any>{
  constructor(props:any){
    super(props);
  }
  state = {date: getDate()}

  componentDidMount(){
    // const na = this.props.navigation;
    this.props.navigation.navigate('Registerd')
  }
  componentWillUnMount(){

  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <Text>Home { this.state.date }</Text>
        <Button title="login" onPress={() => 
          this.props.navigation.navigate('Login')
        }></Button>
        <Button title="Registerd" onPress={() => 
          this.props.navigation.navigate('Registerd')
        }></Button>
        <Button title="go to hello" onPress={() => this.props.navigation.navigate('Mine')}></Button>
      </View>
    );
  }
}
function getDate():number{
  let date = new Date()
  return date.getHours()
}