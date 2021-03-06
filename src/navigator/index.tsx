import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, StackViewStyleInterpolator } from 'react-navigation-stack';
import Welcome from '../screens/Start';
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
import Location from '../screens/Location';
import Filter from '../screens/Filter';
import ResumePersonal from '../screens/ResumePersonal';
import ResumeAdvantage from '../screens/ResumeAdvantage';
import RegisterPersonal from '../screens/RegisterPersonal';
import Message from '../screens/Message';
import ForumPublish from '../screens/ForumPublish';
import Collection from '../screens/Collection';
import MessageDetail from '../screens/MessageDetail';
import Feedback from '../screens/Feedback';
import CompanyDetail from '../screens/CompanyDetail';
import Name from '../screens/Resume/Name';
import CellPhone from '../screens/Resume/CellPhone';
import Expectation from '../screens/Resume/Expectation';
import Education from '../screens/Resume/Education';
import Preview from '../screens/Resume/Preview';
import Agent from '../agentScreens/Agent';
import Add from '../agentScreens/Add';
import JobDesc from '../agentScreens/JobDesc';
import JobDetail from '../agentScreens/JobDetail';
import Applicant from '../agentScreens/Applicant';
import Video from '../components/Video';
import Invite from '../agentScreens/Invite';
import InviteList from '../agentScreens/InviteList';

/**
* 1、从右向左：forHorizontal
* 2、从下向上：forVertical
* 3、安卓那种的从下向上：forFadeFromBottomAndroid
* 4、无动画：forInitial
*/
const TransitionConfiguration = () => ({
	screenInterpolator: (sceneProps: any) => {
		const { scene } = sceneProps;
		const { route } = scene;// 获取屏幕切换时新屏幕的参数
		const params = route.params || {};// 否有 transition 参数，有则使用，否则使用缺省值 forHorizontal
		const transition = params.transition || 'forHorizontal';//forHorizontal 表示从右向左滑出
		return StackViewStyleInterpolator[transition](sceneProps);
	},
});
// import Views from 'react-navigation-stack/lib/commonjs/views/StackView/StackViewStyleInterpolator.js'
const App: any = () => {
	return createStackNavigator({
		BottomTabNavigator: {
			screen: TabBar,
			navigationOptions: {
				header: null
			}
		},
		Welcome: {
			screen: Welcome,
			navigationOptions: {
				// cancel header style
				header: null
			}
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
				header: null
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
		},
		Location: {
			screen: Location,
			navigationOptions: {
				header: null
			},
		},
		Filter: {
			screen: Filter,
			navigationOptions: {
				header: null
			},
		},
		ResumePersonal: {
			screen: ResumePersonal,
			navigationOptions: {
				header: null
			},
		},
		ResumeAdvantage: {
			screen: ResumeAdvantage,
			navigationOptions: {
				header: null
			},
		},
		RegisterPersonal: {
			screen: RegisterPersonal,
			navigationOptions: {
				header: null
			},
		},
		Message: {
			screen: Message,
			navigationOptions: {
				header: null
			},
		},
		MessageDetail: {
			screen: MessageDetail,
			navigationOptions: {
				header: null
			},
		},
		ForumPublish: {
			screen: ForumPublish,
			navigationOptions: {
				header: null
			},
		},
		Collection: {
			screen: Collection,
			navigationOptions: {
				header: null
			},
		},
		Feedback: {
			screen: Feedback,
			navigationOptions: {
				header: null
			}
		},
		CompanyDetail: {
			screen: CompanyDetail,
			navigationOptions: {
				header: null
			}
		},
		Name: {
			screen: Name,
			navigationOptions: {
				header: null
			}
		},
		CellPhone: {
			screen: CellPhone,
			navigationOptions: {
				header: null
			}
		},
		Expectation: {
			screen: Expectation,
			navigationOptions: {
				header: null
			}
		},
		Education: {
			screen: Education,
			navigationOptions: {
				header: null
			}
		},
		Preview: {
			screen: Preview,
			navigationOptions: {
				header: null
			}
		},
		Agent: {
			screen: Agent,
			navigationOptions: {
				header: null
			}
		},
		Add: {
			screen: Add,
			navigationOptions: {
				header: null
			}
		},
		JobDesc: {
			screen: JobDesc,
			navigationOptions: {
				header: null
			}
		},
		JobDetail: {
			screen: JobDetail,
			navigationOptions: {
				header: null
			}
		},

		Applicant: {
			screen: Applicant,
			navigationOptions: {
				header: null
			}
		},
		Video: {
			screen: Video,
			navigationOptions: {
				header: null
			}
		},
		Invite: {
			screen: Invite,
			navigationOptions: {
				header: null
			}
		},
		InviteList: {
			screen: InviteList,
			navigationOptions: {
				header: null
			}
		}
	}, {
		initialRouteName: false ? 'BottomTabNavigator' : 'Login',
		defaultNavigationOptions: {
			gesturesEnabled: true
		},
		transitionConfig: TransitionConfiguration
	})
}
// configAppNavigator(){
// 	return createAppContainer(App);
// }
// console.log('sd', createAppContainer(App))
export default App;