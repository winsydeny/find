import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home'
import Mine from '../screens/Mine'
import Finds from '../screens/Finds'
import Forum from '../screens/Forum';
import { BackHandler } from 'react-native';

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
            return <Icon name={mapIcon[routeName]} size={22} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#43c2ee',
        inactiveTintColor: 'black',
    },
});
// const defaultGetStateForAction = BottomTabNavigator.router.getStateForAction;
// BottomTabNavigator.router.getStateForAction = (action, state) => {
//     console.log(state)
//     // if (state && state.routes.length == 1 && action.type == 'Navigation/BACK') {
//     //     //在项目首页并且按了物理键返回
//     //     BackHandler.exitApp()
//     // }
//     return defaultGetStateForAction(action, state);
// };
function Init() {
    setTimeout(() => {
        return 'Home';
    }, 2000)
    return 'Login'
}
export default BottomTabNavigator