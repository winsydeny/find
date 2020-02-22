import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from '../screens/Hello';
import TabBar from './tabbar';
import Login from '../screens/Login';
import Registerd from '../screens/Registerd';
import Search from '../screens/Search';
import Forum from '../screens/Forum';
import SearchResults from '../screens/SearchResults';
import ListDetail from '../screens/ListDetail';

const App = createStackNavigator({
	BottomTabNavigator: {
		screen: TabBar,
		navigationOptions: {
			header: null
		}
	},
	Welcome: {
		screen: Welcome
	},
	Login: {
		screen: Login,
		navigationOptions: {
			// cancel header style
			header: null
		}
	},
	Registerd: {
		screen: Registerd,
		navigationOptions: {
			header: null
		}
	},
	Search: {
		screen: Search,
		navigationOptions: {
			header: null
		}
	},
	Forum: {
		screen: Forum,
		navigationOptions: {

		},
	},
	SearchResults: {
		screen: SearchResults,
		navigationOptions: {
			header: null
		}
	},
	ListDetail: {
		screen: ListDetail,
		navigationOptions: {
			header: null,

		}
	}
})

export default createAppContainer(App);