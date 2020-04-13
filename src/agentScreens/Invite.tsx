
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  DeviceEventEmitter,
  StatusBar,
  StyleSheet
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import CIon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { toast } from '../utils/utils';
import { saveImg, postData, getData } from '../api';
import global from '../../style'
import { LoadingUtil } from '../utils/LoadingUtils';
import { PageControl } from 'react-native-ui-lib';
interface Prop {
  navigation: any
}
export default class Invite extends Component<Prop> {
  state = {
    list: [],
    datetime: '',
    location: ''
  };
  componentDidMount() {
    this.getList();
  };
  async getList() {
    // const res = await getData('apply/agent', {});
    // console.log(res)
    // this.setState({ list: res.data });
  };
  async invite() {
    try {
      const result = await postData('apply/invite', {
        datetime: this.state.datetime,
        location: this.state.location,
        job_uuid: this.props.navigation.state.params.userInfo.job_uuid
      })
      console.log(result)
      if (result.status === 0) {
        toast('邀请成功');
        DeviceEventEmitter.emit('@invited')
        this.props.navigation.pop();
        return false;
      }
      toast('邀请失败');
    }
    catch (e) {
      console.log(e)
    }
  };
  render() {
    const { userInfo } = this.props.navigation.state.params;
    console.log(userInfo)
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop, paddingHorizontal: 16 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>公司</Text>
            <Text style={{ textAlign: "center", flex: 1 }}>{userInfo.company}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>职位</Text>
            <Text style={{ textAlign: 'center', flex: 1 }}>{userInfo.position}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>时间</Text>
            <DatePicker
              style={{ flex: 1 }}
              date={this.state.datetime}
              mode="datetime"
              placeholder="选择时间"
              format="YYYY-MM-DD HH:mm"
              // showIcon={false}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  width: 0
                },
                dateInput: {
                  borderWidth: 0,
                  borderColor: "#f2f2f2",
                  borderRadius: 20,
                  height: 40,
                  backgroundColor: "#f2f2f2"
                }
              }}

              minuteInterval={10}
              onDateChange={(datetime) => { this.setState({ datetime: datetime }); }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>地点</Text>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                textAlign: "center", height: 40, borderWidth: 0,
                borderColor: "#f2f2f2",
                borderRadius: 20
              }}
              onChangeText={text => this.setState({ location: text })}
              placeholder="输入地点"></TextInput>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>面试者</Text>
            <Text style={{ textAlign: 'center', flex: 1 }}>{userInfo.user}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.title}>面试方式</Text>
            <Text style={{ textAlign: 'center', flex: 1 }}>视频面试</Text>
          </View>

        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Button
            title="发送面试邀请"
            onPress={() => this.invite()}></Button>
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  title: {
    paddingRight: 10,
    width: 70
  }
})