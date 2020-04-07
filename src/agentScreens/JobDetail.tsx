
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../assets/utils';
import { saveImg, postData } from '../api';
import global from '../../style'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
interface Prop {
  navigation: any
}
export default class JobDetail extends Component<Prop> {
  state = {
    position: '',
    experience: '',
    salary: '',
    type: '',
    location: '',
    options: ['全职', '兼职', 'cancel']
  };
  ActionSheet: ActionSheet | null;
  onChangeText(text: string) {

    if (text.length > 240) {
      toast("字数限制为240字");
      return false;
    }
    this.setState({ value: text, num: text.length })
  };
  save() {
    // request api and save my advantage in the futrue
    // if (this.state.value === '') {
    //   toast("亲，意见为空时不能提交的哦！")
    //   return false;
    // }
    DeviceEventEmitter.emit('@agent_detail', {
      position: this.state.position,
      experience: this.state.experience,
      salary: this.state.salary
    })
    this.props.navigation.goBack();
  };
  componentDidMount() {
    const params = this.props.navigation.state.params;
    this.setState({
      position: params.position,
      experience: params.experience,
      salary: params.salary,
    })
  };
  componentWillUnmount() {
    this.setState(() => {
      return false;
    })
  };
  showActionSheet = () => {
    this.ActionSheet.show()
  };
  render() {

    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <View style={{ height: 40, alignItems: "center", flexDirection: "row" }}>
          <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18 }} onPress={() => this.props.navigation.pop()}></CIon>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>详细信息</Text>
          </View>
          <AntIcon name="check" style={{ paddingRight: 18, fontSize: 24 }} onPress={() => this.save()}></AntIcon>
        </View>
        <View style={{ paddingHorizontal: 16 }}>

          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Text style={{ position: "absolute" }}>职位</Text>
            <TextInput
              placeholder="Type here"
              value={this.state.position}
              onChangeText={(pos) => this.setState({ position: pos })}
              style={styles.input}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Text style={{ position: "absolute" }}>经验</Text>
            <TextInput
              value={this.state.experience}
              placeholder="Type here"
              onChangeText={(exp) => this.setState({ experience: exp })}
              style={styles.input}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Text style={{ position: "absolute" }}>薪资</Text>
            <TextInput
              value={this.state.salary}
              placeholder="Type here"
              onChangeText={(sal) => this.setState({ salary: sal })}
              style={styles.input}></TextInput>
          </View>
          <TouchableWithoutFeedback
            style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 15, borderBottomWidth: 0.5, borderColor: 'gray' }}
            onPress={() => this.showActionSheet()}
          >
            <Text style={{ flex: 1 }}>工作类型</Text>
            <Text style={{ position: "absolute", right: 20, color: 'gray' }}>{this.state.location}</Text>
            <Text style={{ color: 'gray' }}>{this.state.type === '' ? '点击选择' : this.state.type}</Text>
            {/* <Icon name="right" style={{ color: 'gray', fontSize: 16 }}></Icon> */}
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 15, borderBottomWidth: 0.5, borderColor: 'gray' }}
            onPress={() => { }}
          >
            <Text style={{ flex: 1 }}>工作地点</Text>
            <Text style={{ position: "absolute", right: 20, color: 'gray' }}>{this.state.location}</Text>
            <Text style={{ color: 'gray' }}>点击选择</Text>
            {/* <Icon name="right" style={{ color: 'gray', fontSize: 16 }}></Icon> */}
          </TouchableWithoutFeedback>
        </View>
        {/* <View
          style={{ height: 160 }}
        >
          <TextInput
            placeholder="请输入您的职位描述"
            autoFocus={true}
            style={{ paddingLeft: 18, paddingRight: 18, fontSize: 14 }}
            multiline={true}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
          ></TextInput>
        </View>
        <Text style={{ textAlign: "right", paddingRight: 18 }}>{this.state.num}/240</Text> */}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select Working Type'}
          options={this.state.options}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            if (index === 2) return false;
            this.setState({ type: this.state.options[index] });
          }}
        />
        {/* <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select Working Type'}
          options={this.state.options}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            if (index === 2) return false;
            this.setState({ type: this.state.options[index] });
          }}
        /> */}
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