import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from '../screens/Hello';
import TabBar from './tabbar';
import Login from '../screens/Login'
import Registerd from '../screens/Registerd'
const App = createStackNavigator({
    BottomTabNavigator:{
        screen: TabBar,
        navigationOptions:{
            header: null
        }
    },
    Welcome:{
        screen: Welcome
    },
    Login:{
        screen: Login,
        navigationOptions:{
            // cancel header style
            header:null
        }
    },
    Registerd:{
        screen: Registerd,
        navigationOptions:{
            // cancel header style
            header:null
        }
    }

})

export default createAppContainer(App);