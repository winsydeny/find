
import React, { Component } from 'react';
// import Geolocation from '@react-native-community/g'
// import { Text, View } from 'react-native';
import { Text, View, Button, TouchableWithoutFeedback, StyleSheet, StatusBar, Alert, PermissionsAndroid, ActivityIndicator, AsyncStorage } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../style'
import Geolocation from '@react-native-community/geolocation';
import { toast, _remove, _getAllKey } from '../assets/utils';
import { saveImg, getData } from '../api/index'
import ImagePicker from 'react-native-image-picker';
interface Props {
  navigation: any
}
export default class Mine extends Component<Props> {
  state = {
    avatarSource: 'https://www.vanlansh.wang/boy.png'
  }
  componentDidMount() {
    this.requestCarmeraPermission()

  };
  async requestCarmeraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // toast("你已获取了相机权限")
      } else {
        toast("获取相机权限失败")
      }
    } catch (err) {
      toast(err.toString())
    }
  };
  onClickChoosePicture = () => {
    const options = {
      title: '操作',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    ImagePicker.showImagePicker(options, (response: any) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        toast(response.uri)
        this.setState({
          avatarSource: response.uri
        })
        // const msg = saveImg(response.path);
        // toast(msg);
        // const source = { uri: response.uri };
        // this.setState({
        //   avatarSource: source,
        // });
        // console.warn(this.state.avatarSource.uri);
      }
    });
  };
  async get() {
    const { data } = await getData('search', { keyword: 'java' });
    console.log(data.length)
  }
  render() {
    const list = [
      {
        title: '面试',
        name: 'Message',

      },
      {
        title: '简历',
        name: 'Resume'
      },
      {
        title: "收藏",
        name: 'Collection'
      },
      {
        title: "投递记录",
        name: 'ForumPublish'
      },
      {
        title: "意见反馈",
        name: 'ForumPublish'
      },
      // {
      //   title: "我的投递",
      //   name: 'ForumPublish'
      // },
      // {
      //   title: "关于",
      //   name: 'Resume'
      // },
      // {
      //   title: "设置",
      //   name: 'Resume'
      // },
      // {
      //   title: '退出登陆',
      //   name: 'Login'
      // }
    ]
    // const value = identity<string>('Mine')
    // const navigation = this.props.navigation
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <Button title="login" onPress={() => this.props.navigation.navigate('Login')}></Button>
      //   <Button title="Registerd" onPress={() =>
      //     this.props.navigation.navigate('Registerd')
      //   }></Button>
      // </View>
      <View style={{ paddingTop: 0 }}>
        {/* <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar> */}
        {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar> */}
        <View style={styles.avatarBg}>
          <Avatar
            size={120}
            rounded
            // title="sd"
            source={{ uri: this.state.avatarSource }}
            showEditButton
            onPress={() => this.onClickChoosePicture()}
          // source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
          ></Avatar>
          <View style={{ marginLeft: 22 }}>
            <Text style={styles.info}>席佳</Text>
            <Text>Front End Develop</Text>
          </View>
        </View>
        <View>
          {
            list.map((list, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.push(list.name, { transition: 'forHorizontal' })}>
                <ListItem
                  rightIcon={<Icon name="right"></Icon>}
                  title={list.title}
                  bottomDivider
                ></ListItem>
              </TouchableWithoutFeedback>
            ))
          }
          <View>
          </View>
          <Button title="查看缓存" onPress={() => _getAllKey()}></Button>
          <Button title="清除缓存" onPress={() => _remove("isLogin")}></Button>
          <Button title="Request" onPress={() => this.get()}></Button>
        </View>
      </View >
    );
  }
}


// function identity<T>(arg: T): T {
//   return arg
// }
const styles = StyleSheet.create({
  avatarBg: {
    // justifyContent: "center",
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    // backgroundColor: global.bg2.backgroundColor,
    height: 160,
    // borderBottomLeftRadius:200,
    // borderBottomRightRadius:200
  },
  info: {
    fontWeight: "bold",
    fontSize: 22
  }
})