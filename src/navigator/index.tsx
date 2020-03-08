import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackViewStyleInterpolator } from 'react-navigation-stack';
import Welcome from '../screens/Hello';
import TabBar from './tabbar';
import Login from '../screens/Login';
import Registerd from '../screens/Registerd';
import Search from '../screens/Search';
import Forum from '../screens/Forum';
import SearchResults from '../screens/SearchResults';
import ListDetail from '../screens/ListDetail';
import ForumDetail from '../screens/ForumDetail';
import Identity from '../screens/Identity'
import Resume from '../screens/Resume';
/**
* 1、从右向左：forHorizontal
* 2、从下向上：forVertical
* 3、安卓那种的从下向上：forFadeFromBottomAndroid
* 4、无动画：forInitial
*/
const TransitionConfiguration = () => ({
	screenInterpolator: (sceneProps: any) => {
		const { scene } = sceneProps;
		const { route } = scene;
		// 获取屏幕切换时新屏幕的参数
		const params = route.params || {};
		// 否有 transition 参数，有则使用，否则使用缺省值 forHorizontal
		// forHorizontal 表示从右向左滑出
		const transition = params.transition || 'forVertical';
		return StackViewStyleInterpolator[transition](sceneProps);
	},
});
// import Views from 'react-navigation-stack/lib/commonjs/views/StackView/StackViewStyleInterpolator.js'
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
			header: null
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
	},
	ForumDetail: {
		screen: ForumDetail,
		navigationOptions: {
			// header: null
			title: "详情",
		}
	},
	Identity: {
		screen: Identity,
		navigationOptions: {
			header: null
		}
	},
	Resume: {
		screen: Resume,
		navigationOptions: {
			header: null
		},

	}
}, {
	defaultNavigationOptions: {
		gesturesEnabled: true
	},
	transitionConfig: TransitionConfiguration
})

export default createAppContainer(App);