
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign'
import global from '../../style';
import ImagePicker from 'react-native-image-picker';

import { Avatar, Button } from 'react-native-elements';
import { TextInput, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { toast, reset } from '../assets/utils';
import { saveImg, postData } from '../api';
// import styles from '../../style';
//     position,
//     company,
//     location,
//     type,
//     preview,
//     salary,
//     description,
//     experience
interface Props {
  navigation: any
}
export default class Add extends Component<Props> {
  state = {
    detailPercent: 0,
    tips: '未填写',
    company: '',
    prview: 'null',
    salary: '',
    description: '',
    experience: '',
    position: '',
    location: '',
    type: ''
  };
  emiter1: any;
  emiter2: any;
  async publish() {
    try {
      const result = await postData('add', this.state);
      console.log(result)
      if (result.status === 0) {
        toast('发布成功！');
      } else {
        toast('失败');
      }
    } catch (e) {
      Alert.alert(e.toString());
      // console.log(e);
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
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // toast(response.uri)
        // console.log(response)
        this.setState({
          avatarSource: response.uri
        })
        saveImg(response.uri)
          .then(res => {
            console.log(res)
            if (res.status === 0) {
              this.setState({ preview: res.url });
              toast("图片上传成功")
            }
          })
      }
    });
  };
  componentDidMount() {
    this.emiter1 = DeviceEventEmitter.addListener('@agent_detail', state => {
      let percent: any = 0;
      for (let item in state) {
        if (state[item] !== '') {
          percent += 1;
        }
      }
      this.setState({
        position: state.position,
        experience: state.experience,
        salary: state.salary,
        location: state.location,
        type: state.type,
        detailPercent: (percent / 5).toFixed(2) * 100
      });
    })
    this.emiter2 = DeviceEventEmitter.addListener('@agent_jd', value => {
      let tips = '未填写';
      if (value !== '') {
        tips = '已填写';
      }
      this.setState({ description: value, tips: tips });
    })
  };
  componentWillUnmount() {
    this.emiter1.remove();
    this.emiter2.remove();
  };
  render() {
    return (
      <View style={{ marginTop: global.statusBarHeight.paddingTop, flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>

        <View style={{ height: 40, alignItems: "center", flexDirection: "row", backgroundColor: "#FFFFFF" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1, marginLeft: -20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Add To</Text>
          </View>
          {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>发布</Text> */}
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 15, borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Text style={{ flex: 1 }}>Logo</Text>
            {/* <Text style={{ position: "absolute" }}>公司头像</Text>
            <TextInput
              placeholder="Type here"
              style={styles.input}></TextInput> */}
            <Avatar
              source={{ uri: this.state.prview }}
              size={80}
              onPress={() => this.onClickChoosePicture()}> </Avatar>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Text style={{ position: "absolute" }}>公司</Text>
            <TextInput
              placeholder="Type here"
              onChangeText={(com) => this.setState({ company: com })}
              style={styles.input}></TextInput>
          </View>

          <TouchableNativeFeedback
            style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 15, borderBottomWidth: 0.5, borderColor: 'gray' }}
            onPress={
              () => this.props.navigation.push('JobDetail',
                {
                  position: this.state.position,
                  experience: this.state.experience,
                  salary: this.state.salary,
                  location: this.state.location,
                  type: this.state.type
                })}
          >
            <Text style={{ flex: 1 }}>详细信息</Text>
            <Text style={{ position: "absolute", right: 20, color: 'gray' }}>{this.state.detailPercent}%</Text>
            <Icon name="right" style={{ color: 'gray', fontSize: 16 }}></Icon>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 15, borderBottomWidth: 0.5, borderColor: 'gray' }}
            onPress={() => this.props.navigation.push('JobDesc', { desc: this.state.description })}
          >
            <Text style={{ flex: 1 }}>职位描述</Text>
            <Text style={{ position: "absolute", right: 20, color: 'gray' }}>{this.state.tips}</Text>
            <Icon name="right" style={{ color: 'gray', fontSize: 16 }}></Icon>
          </TouchableNativeFeedback>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 16, position: "absolute", bottom: 10, }}>
          <Button title="Publish" onPress={() => this.publish()}></Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    textAlign: "right"
  }
})
