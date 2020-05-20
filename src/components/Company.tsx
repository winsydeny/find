
import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StatusBar
} from 'react-native';
import global from '../../style';
import CIon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
export default class CompanyDetail extends Component {
  state = {
    num: '0'
  }
  render() {
    const company = this.props.company;
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"></StatusBar>
        <Image
          style={{ height: 200 }}
          source={{ uri: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2943523138,4161584829&fm=26&gp=0.jpg" }}></Image>
        <CIon name="ios-arrow-back" style={{ fontSize: 24, marginLeft: 18, color: "#FFFFFF", position: "absolute", top: 24 }} onPress={() => this.props.navigation.pop()}></CIon>
        <AIcon name="bookmark-o" style={[{ fontSize: 18, color: "#FFFFFF", position: "absolute", right: 18, top: 24, fontWeight: "bold" },]}></AIcon>
        <View style={{ paddingHorizontal: 16, paddingTop: 20, position: 'absolute', top: 170, backgroundColor: '#FFFFFF', borderRadius: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 16 }}>{company}</Text>
          <Text>阿里巴巴网络技术有限公司（简称：阿里巴巴集团或阿里巴巴）是以曾担任英语教师的马云为首的18人于1999年在浙江杭州创立的公司。 [1-2]
阿里巴巴集团经营多项业务，另外也从关联公司的业务和服务中取得经营商业生态系统上的支援。业务和关联公司的业务包括：淘宝网、天猫、聚划算、全球速卖通、阿里巴巴国际交易市场、1688、阿里妈妈、阿里云、蚂蚁金服、菜鸟网络等。</Text>
        </View>
      </View >
    );
  }
}
