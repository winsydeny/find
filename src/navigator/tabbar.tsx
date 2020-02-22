import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home'
import Mine from '../screens/Mine'
import Finds from '../screens/Finds'

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
        }
    },
    Finds: {
        screen: Finds,
        navigationOptions: {
            tabBarLabel: '发现',

        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
        }
    }
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            // console.log('this===',tintColor,navigation)ß
            const { routeName } = navigation.state;
            const mapIcon: any = {
                Home: 'home',
                Finds: 'bullseye',
                Mine: 'user-circle',
            };
            return <Icon name={mapIcon[routeName]} size={20} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#43c2ee',
        inactiveTintColor: 'black',
    },
});

export default BottomTabNavigator