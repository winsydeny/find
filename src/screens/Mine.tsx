
import React, { Component } from 'react';
// import Geolocation from '@react-native-community/g'
// import { Text, View } from 'react-native';
import { Text, View, Button, TouchableWithoutFeedback, StyleSheet, StatusBar, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../style'
import Geolocation from '@react-native-community/geolocation';
import { toast } from '../assets/utils';
import { saveImg } from '../api/index'
import ImagePicker from 'react-native-image-picker';
interface Props {
  navigation: any
}
export default class Mine extends Component<Props> {
  state = {
    avatarSource: ''
  }
  componentDidMount() {
    this.requestCarmeraPermission()

  };
  async requestCarmeraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // {
        //   title: 'Camera Permission',
        //   message: 'the project needs access to your camera ' + 'so you can take awesome pictures.'
        // }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        toast("你已获取了相机权限")
      } else {
        toast("获取相机失败")
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
        const msg = saveImg(response.path);
        // toast(msg);
        // const source = { uri: response.uri };
        // this.setState({
        //   avatarSource: source,
        // });
        // console.warn(this.state.avatarSource.uri);
      }
    });
  };


  // async getLocation() {
  //   const permissions = [
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   ]
  //   const granteds = await PermissionsAndroid.requestMultiple(permissions);
  //   if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
  //     //  this.getPosition();
  //     // console.log()
  //     Geolocation.getCurrentPosition((res: any) => {
  //       console.log(res)

  //     })
  //     // Toast("定位权限被禁止")
  //     // let rs = ''
  //     // for (let i in navigator) {
  //     //   rs += i
  //     // }
  //     // Alert.alert(navigator.geolocation)

  //     // 
  //   } else {
  //     // Toast("定位权限被禁止")
  //   }
  // };
  render() {
    const list = [
      {
        title: '登陆',
        name: 'Login',

      },
      {
        title: '注册',
        name: 'Registerd',
      },
      {
        title: '我的简历',
        name: 'Resume'
      },
      {
        title: '意见反馈',
        name: 'Login'
      },
      {
        title: '退出登陆',
        name: 'Login'
      }
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
      <View>
        {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar> */}
        <View style={styles.avatarBg}>
          <Avatar
            size={120}
            rounded
            source={{ uri: this.state.avatarSource }}
          // source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
          ></Avatar>
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
          <Button title="camera" onPress={() => this.onClickChoosePicture()}></Button>
        </View>
      </View>
    );
  }
}


// function identity<T>(arg: T): T {
//   return arg
// }
const styles = StyleSheet.create({
  avatarBg: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: global.bg2.backgroundColor,
    height: 160,
    // borderBottomLeftRadius:200,
    // borderBottomRightRadius:200
  }
})