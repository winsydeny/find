/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import nav from './src/navigator/index';
import Start from './src/screens/Start'
import { toast, _retrieveData, reset } from './src/assets/utils';
import { AppState, Alert, StatusBar, View } from 'react-native';
import Login from './src/screens/Login'
import { createAppContainer } from 'react-navigation';
class App extends Component {
  handleNavigationChange() {

  }
  state = {
    isLogin: false
  }
  timer: any;
  async isLogin() {
    console.log('App.tsx')
    try {
      const isLogin = await _retrieveData("isLogin");
      // console.log("islOgin", isLogin)
      console.log('getinfo', isLogin)
      if (isLogin) {
        // 如果已经登陆并且token还未过期，则直接重置导航器，不显示登陆页面
        // reset(this.props.navigation, 'BottomTabNavigator');
        this.setState({ isLogin: true })
      }
    } catch (err) {
      Alert.alert(err.toString())
    }
  };
  componentDidMount() {
    // this.isLogin();
    // this.timer = setInterval(() => {
    //   if (this.state.sec <= 1) {
    //     // this.props.navigation.navigate('Home')
    //     toast("Login");
    //     clearTimeout(this.timer);
    //     return false;
    //   }
    //   this.setState({ sec: this.state.sec - 1 })
    //   // console.log('sdf')
    // }, 1000); 
  };

  render() {
    const AppContainer = createAppContainer(nav(this.state.isLogin))
    function getCurrentRouteName(navigationState) {
      if (!navigationState) {
        return null;
      }
      const route = navigationState.routes[navigationState.index];
      // dive into nested navigators
      if (route.routes) {
        return getCurrentRouteName(route);
      }
      return route.routeName;
    }
    return (
      <>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        <View
          style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        >
          <AppContainer
            onNavigationStateChange={function (prevState, currentState) {
              // console.log(this)
            }} />
        </View>
      </>

    )

  }
}

export default App;
