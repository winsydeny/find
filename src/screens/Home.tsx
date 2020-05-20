import React, { Component } from 'react';
import global from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from './Login'
// import { Text, View,Button } from 'react-native';
import { SearchBar, Text, Avatar, Button, Badge } from 'react-native-elements';
import ListItem from '../components/ListItem';
import Geolocation from '@react-native-community/geolocation';
import { _storeData, toast, reset } from '../utils/utils';
import { StackActions, NavigationActions } from "react-navigation"
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  PermissionsAndroid,
  DeviceEventEmitter,
  Platform,
  BackHandler,
  ActivityIndicator,
  Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getData } from '../api/index';
import { LoadingUtil } from '../utils/LoadingUtils';
interface Props {
  navigation: any;
}
export default class Home extends Component<Props> {
  state = {
    search: '',
    modalVisible: false,
    latitude: null,
    longitude: null,
    current: null,
    recommendList: []
  };
  listener: any;
  updateSearch(search: string) {
    this.setState({
      search: search,
    });
  }
  search() {
    // console.log('search');
    Alert.alert('search successful');
  }
  async getLocation() {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]
    const granteds = await PermissionsAndroid.requestMultiple(permissions);
    if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
      Geolocation.getCurrentPosition((res: any) => {
        const { longitude, latitude } = res.coords
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
        fetch(`https://restapi.amap.com/v3/geocode/regeo?key=3e682fe78613fe4f024e2d2d5ac98940&location=${longitude},${latitude}`)
          .then((response) => response.json())
          .then((responseJson: any) => {
            const { city, province } = responseJson.regeocode.addressComponent;
            let current = city.length === 0 ? province : city;
            if (province.length === 0 && city.length === 0) {
              current = '定位失败'
            }
            this.setState({
              current: current
            })
          }).catch((err: any) => console.log(err))
      })
    } else {
      Alert.alert("定位权限被禁止")
    }
  };

  exitApp() {
  };
  async getRecommend() {
    try {
      const response = await getData('search', { keyword: 'java' });
      // this.setState({ recommendList: data })
      // console.log(response)
      if (response.status < 0 || response.data === undefined) {
        // this.props.navigation.navigate("Login");
        toast("request fail")
        return false;
      }
      LoadingUtil.hideLoading();
      this.setState({ recommendList: response.data })
      // console.log('sdf', response)
    } catch (e) {
    }
  }
  componentDidMount() {
    // console.log(this.props)
    // this.props.navigation.actions.reset();
    // this.props.navigation.navigate("Login")
    this.getRecommend();
    BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    this.getLocation();
    this.listener = DeviceEventEmitter.addListener('@Location', (city) => {
      this.setState({
        current: city
      });
      toast("位置修改成功");
    })
  };
  componentDidUpdate() {
    // toast('update');
  };
  componentWillUnmount() {
    this.listener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.exitApp);
    // ExceptionsManager.js:126 Warning: Can't perform a React state update on an unmounted component. 用下面这段代码解决这个问题
    this.setState = (state, callback) => {
      return;
    };
    // toast('exit')
  };
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation
    // this.renderLogin();
    return (
      <View
        style={{
          // paddingBottom: 44,
          marginTop: global.statusBarHeight.paddingTop,
          backgroundColor: "#f1f1f1",
          flex: 1
        }}>
        {/* <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar> */}

        {/* <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"></StatusBar> */}
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        > */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 0.4,
          borderBottomColor: '#929292c7sf'
        }}>
          {/* <SearchBar 
          clearIcon={true}
          placeholder="Type here ...."
          onChangeText={this.updateSearch.bind(this)}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputSearchBar}
          inputStyle={styles.input}
          value={search}
        /> */}
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.push('Search', { transition: "forHorizontal" })}>
            <View style={styles.searchBar}>
              <Icon
                name="search1"
                style={{ paddingLeft: 10, color: '#867f7fc9' }}></Icon>
              <Text style={{ paddingLeft: 6, color: '#867f7fc9' }}>请输入</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={{ paddingBottom: 10 }} onPress={() => this.props.navigation.push("Location", { city: this.state.current })}>{this.state.current}</Text>
          {/* <Avatar
            rounded
            size={50}
            containerStyle={styles.avatar}
            avatarStyle={{}}
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}></Avatar>
          <Badge
            status="error"
            value="10"
            badgeStyle={{}}
            containerStyle={{ position: 'absolute', top: 0, right: 2 }}></Badge> */}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 12, paddingTop: 8 }}>
            公司推荐
            </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
            <View style={styles.cardBox}>
              <TouchableWithoutFeedback onPress={() => navigate('CompanyDetail',
                {
                  com: 'facebook',
                  url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2943523138,4161584829&fm=26&gp=0.jpg',
                  detail: `Facebook（中文译为脸书或者脸谱网 [1]  ）是美国的一个社交网络服务网站 ，创立于2004年2月4日，总部位于美国加利福尼亚州门洛帕克。2012年3月6日发布Windows版桌面聊天软件Facebook Messenger [2]  。主要创始人马克·扎克伯格（Mark Zuckerberg）。
                  Facebook是世界排名领先的照片分享站点，截至2013年11月每天上传约3.5亿张照片。截至2012年5月，Facebook拥有约9亿用户。Facebook的总部设在硅谷的门洛帕克（Menlo Park）——1 Hacker Way [3-4]  。从2006年9月11日起，任何用户输入有效电子邮件地址和自己的年龄段，即可加入。Facebook自2009年以来一直被中国屏蔽，其被禁的原因有社会和政治等方面的因素，但Facebook也从未间断与中国科技企业界的联系，期望通过投资中国科技企业等方式获得中国政府的开闸。 [5] 
                  2018年3月17日曝光，剑桥分析公司“窃取”5000万脸书用户的信息。 `
                })}>
                <View style={[styles.card, styles.bg1]}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>FaceBook</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigate('CompanyDetail',
                {
                  com: 'apple',
                  url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589432757653&di=79d47255138a0a9954ef1f39ea309cbf&imgtype=0&src=http%3A%2F%2Fgadgetstouse.com%2Fwp-content%2Fuploads%2F2017%2F02%2FApple-Bengaluru.jpg',
                  detail: `苹果公司（Apple Inc. ）是美国一家高科技公司。由史蒂夫·乔布斯、斯蒂夫·沃兹尼亚克和罗·韦恩(Ron Wayne)等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc. ），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。
                  苹果公司1980年12月12日公开招股上市，2012年创下6235亿美元的市值记录，截至2014年6月，苹果公司已经连续三年成为全球市值最大公司。苹果公司在2016年世界500强排行榜中排名第9名。 [1]  2013年9月30日，在宏盟集团的“全球最佳品牌”报告中，苹果公司超过可口可乐成为世界最有价值品牌。2014年，苹果品牌超越谷歌（Google），成为世界最具价值品牌。
                  2016年9月8日凌晨1点，2016苹果秋季新品发布会在美国旧金山的比尔·格雷厄姆市政礼堂举行 [2]  。`,
                })}>
                <View style={[styles.card, styles.bg2]}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold", }}>Apple</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigate('CompanyDetail',
                {
                  com: 'baidu',
                  url: 'http://c.hiphotos.baidu.com/baike/c0%3Dbaike60%2C5%2C5%2C60%2C20%3Bt%3Dgif/sign=d9a4f18db74543a9e116f29e7f7ee1e7/37d12f2eb9389b50257fcf2b8535e5dde6116ec2.jpg',
                  detail: `百度（纳斯达克：BIDU）是全球最大的中文搜索引擎，中国最大的以信息和知识为核心的互联网综合服务公司，全球领先的人工智能平台型公司。百度愿景是：成为最懂用户，并能帮助人们成长的全球顶级高科技公司。 [1] 
                  “百度”二字，来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这句话描述了词人对理想的执着追求。1999年底，身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。
                  百度拥有数万名研发工程师，这是中国乃至全球都顶尖的技术团队。这支队伍掌握着世界上最为先进的搜索引擎技术，使百度成为中国掌握世界尖端科学核心技术的中国高科技企业，也使中国成为美国、俄罗斯、和韩国之外，全球仅有的4个拥有搜索引擎核心技术的国家之一。 [1]`
                })}>
                <View style={[styles.card, styles.bg3, {}]}>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>Baidu</Text>
                </View>
              </TouchableWithoutFeedback>

            </View>
          </ScrollView>
          <View style={{ height: 60, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 12 }}>为你推荐</Text>
            <Text style={{ fontSize: 14, paddingRight: 12, position: "absolute", right: 0, color: global.bg2.backgroundColor }}>查看更多</Text>
            {/* <ActivityIndicator size="small" color="#00ff00" /> */}
            {/* <Image style={{ width: 100, height: 100 }} source={require('../assets/pic/loading.gif')}></Image> */}
          </View>

          {
            this.state.recommendList.length > 0 ?
              this.state.recommendList.map((item, index) => (
                <View style={{ marginBottom: 12, }} key={index}>
                  <ListItem
                    navigate={this.props.navigation}
                    data={item}></ListItem>
                </View>
              )) :
              <View>
                {/* <ActivityIndicator size="large" color="red" />
                <Text>Loading....</Text> */}
                <View style={{ backgroundColor: "#FFFFFF", height: 110, marginBottom: 12 }}>
                  {/* <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#d6d3d3fa',
                      borderRadius: 8,
                      marginTop: 14,
                      marginLeft: 12
                    }}></View>
                  <View style={{
                    backgroundColor: '#d6d3d3fa',
                    height: 10,


                  }}></View> */}
                </View>
                <View style={{ backgroundColor: "#FFFFFF", height: 110, marginBottom: 12 }}>
                  {/* <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#d6d3d3fa',
                      borderRadius: 8,
                      marginTop: 14,
                      marginLeft: 12
                    }}></View>
                  <View style={{
                    backgroundColor: '#d6d3d3fa',
                    height: 10,


                  }}></View> */}
                </View>
                <View style={{ backgroundColor: "#FFFFFF", height: 110, marginBottom: 12 }}>
                  {/* <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#d6d3d3fa',
                      borderRadius: 8,
                      marginTop: 14,
                      marginLeft: 12
                    }}></View>
                  <View style={{
                    backgroundColor: '#d6d3d3fa',
                    height: 10,


                  }}></View> */}
                </View>
              </View>
          }
          {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.recommendList}
            renderItem={(item: any) => (
              <View style={{ marginBottom: 12 }}>
                <ListItem
                  navigate={this.props.navigation}
                  data={item}></ListItem>
              </View>
            )

            }
          ></FlatList> */}
        </ScrollView>

      </View>
    );
  }
}

const { color } = global.fontColor;
const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginRight: 12,
    borderRadius: 16,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 8
    // justifyContent:"center"
  },
  avatar: {
    marginRight: 8,
    marginBottom: 8,
    // width:50,
    // height:50,
    // borderRadius:200
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    // letterSpacing: '',
    width: 410,
    height: 178,
    // marginTop: 20,
    // backgroundColor: 'red',
  },
  card: {
    width: 120,
    height: 150,
    backgroundColor: '#2e77f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    // marginRight: 14,

    elevation: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 1,
    // shadowRadius: 1.5,

  },
  defaultCard: {
    height: 80,
    backgroundColor: 'rgb(200, 204, 206)',
    borderRadius: 8,
  },
  bg1: {
    backgroundColor: '#2e77f3',

  },
  bg2: {
    backgroundColor: '#c0c0c0',
    color: "#FFFFFF",
  },
  bg3: {
    backgroundColor: '#e10602',
    color: "#FFF",
  }
});
