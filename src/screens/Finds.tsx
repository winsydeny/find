import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Image,
  Button,
  StatusBar,
  Alert,
  Platform,
  BackHandler,
  RefreshControl
} from 'react-native'
import { colors } from 'react-native-elements'
import { Dialog } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Micon from 'react-native-vector-icons/MaterialIcons'
import AntIcon from 'react-native-vector-icons/AntDesign';
import BottomDialog from '../components/BottomDialog'
import global from '../../style';
import ListItem from "../components/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import { toast } from "../utils/utils";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Login from "./Login";
import Registerd from "./Registerd";
import ViewPager from "@react-native-community/viewpager";
import { getData, postData } from "../api";
// https://github.com/ptomasroos/react-native-scrollable-tab-view => 

interface ItemList {
  title: string
}
interface Prop {
  navigation: any
}
export default class Forum extends Component<Prop> {
  _keyExtractor = (item: any, index: any) => item.id;
  child = '';
  state = {
    // thumb:false,
    tab: 1,
    dynamicList: [],
    showDialog: false,
    dialogContent: '',
    recommendList: [],
    refress: false
  };
  thumbHandle(item: any) {
    Alert.alert(item.f_id)
    // const { list } = this.state
    // const temp = Object.assign([], list);
    // temp.forEach((el: any) => {
    //   if (Object.is(el.uid, item.uid)) {
    //     el.thumb = !el.thumb;
    //     if (el.thumb) {
    //       el.thumb_num = el.thumb_num + 1;
    //     } else {
    //       el.thumb_num = el.thumb_num - 1;
    //     }
    //   }
    // });
    // this.setState({ list: temp })
  };
  commentsHandle(item: any) {
    this.setState({ showDialog: true, dialogContent: item.uid })
  };
  async getRecommend() {
    try {
      const response = await getData('search', { keyword: '' });
      // this.setState({ recommendList: data })
      console.log(response)
      if (response.status < 0 || response.data === undefined) {
        // this.props.navigation.navigate("Login");
        toast("request fail")
        return false;
      }
      this.setState({ recommendList: response.data })
      console.log('sdf', response)
    } catch (e) {
    }
  };
  async getDynamicList() {
    const list = await getData('forum/list', {});
    list.data.reverse();
    this.setState({ dynamicList: list.data, refress: false });


  };
  publishDynamic() {
    postData('forum/publish', {})
      .then(res => {
        if (res.status === 0) {
          toast("发布成功");
        }
      })
  };
  topRefresh() {
    console.log('refress');
    console.log(this.state.tab)
    this.setState({ refress: true });
    this.getDynamicList()
    // switch (this.state.tab) {
    //   case 0: this.getRecommend(); break;
    //   case 1: this.getRecommend(); break;
    //   default; break;
    // }
    setTimeout(() => {
      this.setState({ refress: false });
    }, 1000);
  };

  componentDidMount() {
    this.setState({ refress: true })
    this.getDynamicList()
    const dynamicList: any = [];
    // for (let i = 0; i < 6; i++) {
    //   dynamicList.push({
    //     title: 'xiji123a',
    //     uid: i + 1,
    //     thumb: false,
    //     thumb_num: 0,
    //     comments: [],
    //     comment_num: 0,
    //     msg: '据国家卫健委最新消息：截至1月22日24时，我委收到国内25个省（区、市）累计报告新型冠状病毒感染的肺炎确诊病例571例，其中重症95例，死亡17例（均来自湖北省）'
    //   })
    // }
    // this.setState({ dynamicList });
    this.getRecommend();
    // if (Platform.OS === 'android') {
    //   BackHandler.addEventListener('hardwareBackPress', () => {
    //     BackHandler.exitApp();
    //   });
    // }
  };
  componentWillUnmount() {
    // toast("exit finds")
  };
  render() {
    const { dynamicList, showDialog, dialogContent, tab } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "", paddingTop: global.statusBarHeight.paddingTop }}>
        <ScrollableTabView
          initialPage={this.state.tab}
          tabBarBackgroundColor="#FFFFFF"
          onChangeTab={({ i }) => this.setState({ tab: i })}
          tabBarUnderlineStyle={{ backgroundColor: global.bg2.backgroundColor, height: 2.7 }}
          tabBarActiveTextColor={global.bg2.backgroundColor}
          renderTabBar={() => <DefaultTabBar />}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refress}
                onRefresh={() => this.topRefresh()}
                tintColor="red"
                colors={[global.bg2.backgroundColor, '#4284f3',]}></RefreshControl>
            }
            style={{ backgroundColor: "#f1f1f1" }}
            tabLabel="最新发布"
            keyExtractor={(item, index) => index.toString()}
            data={this.state.recommendList}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 5 }}>
                <ListItem
                  marginHorizontal={0}
                  navigate={this.props.navigation}
                  data={item}></ListItem>
              </View>
            )}>
          </FlatList>
          <View tabLabel="最新动态" style={{ flex: 1 }}>
            <FlatList
              style={{}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refress}
                  onRefresh={() => this.topRefresh()}
                  tintColor="red"
                  colors={[global.bg2.backgroundColor, '#4284f3',]}></RefreshControl>
              }
              data={dynamicList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback key={index}>
                  <View style={styles.itemList}>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginRight: 10 }}
                      source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                    ></Image>
                    <View style={{}}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>{item.user}</Text>
                        <Text style={{ position: 'absolute', right: 26, fontSize: 12, color: 'gray' }}>{item.created}</Text>
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ForumDetail", { detail: item.content })}>
                        <Text numberOfLines={2} style={styles.text}>{item.content}</Text>
                      </TouchableWithoutFeedback>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                          name="thumb-up"
                          style={[styles.icon, { color: item.thumb ? global.fontColor.color : 'gray', }]}
                          onPress={this.thumbHandle.bind(this, item.f_id)}>
                        </Icon>
                        <Text style={styles.iconText}>{item.thumb}</Text>
                        <Icon
                          name="message-processing"
                          style={[styles.icon]}
                          onPress={this.commentsHandle.bind(this, item)}>
                        </Icon>
                        <Text style={styles.iconText}>{item.comment}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}></FlatList>
            <BottomDialog
              content={dialogContent}
              showDialog={showDialog}
              dissmiss={() => { this.setState({ showDialog: false }) }}
            ></BottomDialog>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ForumPublish')}>
              <View style={{ position: "absolute", width: 40, height: 40, bottom: 10, right: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                <Micon name="add-circle" style={{ fontSize: 40, color: global.bg2.backgroundColor }}></Micon>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View tabLabel="其他">
            <Text style={{ textAlign: "center" }}>Noting。。。</Text>
          </View>
        </ScrollableTabView>
      </View>

    )
  }






  // render() {
  //   const { list, showDialog, dialogContent, tab } = this.state;
  //   return (
  //     <View style={{ paddingTop: 0 }}>
  //       {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar>
  //         <View style={{ height: 30, backgroundColor: global.bg2.backgroundColor }}>

  //           <AntIcon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></AntIcon>
  //         </View> */}
  //       <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.2, borderBottomColor: '#b5b4b494' }}>
  //         <Text
  //           onPress={() => this.setState({ tab: 1 })}
  //           style={[styles.tab, this.state.tab === 1 ? styles.tabChose : null]}>最新发布</Text>
  //         <Text
  //           onPress={() => this.setState({ tab: 2 })}
  //           style={[styles.tab, this.state.tab === 2 ? styles.tabChose : null]}>最新消息</Text>
  //         <Text
  //           onPress={() => this.setState({ tab: 3 })}
  //           style={[styles.tab, this.state.tab === 3 ? styles.tabChose : null]}>其他</Text>
  //       </View>

  //       <ScrollView style={[tab === 1 ? null : styles.hidden]}>
  //         {/* <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View>
  //         <View style={{ marginBottom: 10 }}>
  //           <ListItem navigate={this.props.navigation}></ListItem>
  //         </View> */}
  //       </ScrollView>
  //       <View style={[tab === 2 ? null : styles.hidden]}>

  //         <FlatList
  //           data={list}
  //           keyExtractor={this._keyExtractor}
  //           renderItem={({ item }) => (
  //             <TouchableWithoutFeedback>
  //               <View style={styles.itemList}>
  //                 <Image
  //                   style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginRight: 10 }}
  //                   source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
  //                 ></Image>
  //                 <View style={{}}>
  //                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                     <Text style={styles.title}>{item.title}{item.uid}</Text>
  //                     <Text style={{ position: 'absolute', right: 26, fontSize: 12, color: 'gray' }}>2019年12月12</Text>
  //                   </View>
  //                   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("ForumDetail", { detail: item.msg })}>
  //                     <Text numberOfLines={2} style={styles.text}>{item.msg}</Text>
  //                   </TouchableWithoutFeedback>
  //                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                     <Icon
  //                       name="thumb-up"
  //                       style={[styles.icon, { color: item.thumb ? global.fontColor.color : 'gray', }]}
  //                       onPress={this.thumbHandle.bind(this, item)}>
  //                     </Icon>
  //                     <Text style={styles.iconText}>{item.thumb_num}</Text>
  //                     <Icon
  //                       name="message-processing"
  //                       style={[styles.icon]}
  //                       onPress={this.commentsHandle.bind(this, item)}>
  //                     </Icon>
  //                     <Text style={styles.iconText}>{item.comment_num}</Text>

  //                   </View>
  //                 </View>
  //               </View>
  //             </TouchableWithoutFeedback>
  //           )}></FlatList>
  //      

  //       </View>

  //     </View>
  //   )

  //   // } else if (tab === 2) {
  //   //   return (
  //   //     <View>
  //   //       {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar>
  //   //       <View style={{ height: 30, backgroundColor: global.bg2.backgroundColor }}>

  //   //         <AntIcon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></AntIcon>
  //   //       </View> */}
  //   //       <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.2, borderBottomColor: '#b5b4b494' }}>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 1 })}
  //   //           style={[styles.tab, this.state.tab === 1 ? styles.tabChose : null]}>最新发布</Text>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 2 })}
  //   //           style={[styles.tab, this.state.tab === 2 ? styles.tabChose : null]}>最新消息</Text>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 3 })}
  //   //           style={[styles.tab, this.state.tab === 3 ? styles.tabChose : null]}>其他</Text>
  //   //       </View>
  //   //       <FlatList
  //   //         data={list}
  //   //         keyExtractor={this._keyExtractor}
  //   //         renderItem={({ item }) => (
  //   //           <TouchableWithoutFeedback>
  //   //             <View style={styles.itemList}>
  //   //               <Image
  //   //                 style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginRight: 10 }}
  //   //                 source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
  //   //               ></Image>
  //   //               <View style={{}}>
  //   //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //   //                   <Text style={styles.title}>{item.title}{item.uid}</Text>
  //   //                   <Text style={{ position: 'absolute', right: 26, fontSize: 12, color: 'gray' }}>2019年12月12</Text>
  //   //                 </View>
  //   //                 <TouchableWithoutFeedback o nPress={() => this.props.navigation.navigate("ForumDetail")}>
  //   //                   <Text numberOfLines={2} style={styles.text}>{item.msg}</Text>
  //   //                 </TouchableWithoutFeedback>
  //   //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //   //                   <Icon
  //   //                     name="thumb-up"
  //   //                     style={[styles.icon, { color: item.thumb ? global.fontColor.color : 'gray', }]}
  //   //                     onPress={this.thumbHandle.bind(this, item)}>
  //   //                   </Icon>
  //   //                   <Text style={styles.iconText}>{item.thumb_num}</Text>
  //   //                   <Icon
  //   //                     name="message-processing"
  //   //                     style={[styles.icon]}
  //   //                     onPress={this.commentsHandle.bind(this, item)}>
  //   //                   </Icon>
  //   //                   <Text style={styles.iconText}>{item.comment_num}</Text>

  //   //                 </View>
  //   //               </View>
  //   //             </View>
  //   //           </TouchableWithoutFeedback>
  //   //         )}></FlatList>
  //   //       <BottomDialog
  //   //         content={dialogContent}
  //   //         showDialog={showDialog}
  //   //         dissmiss={() => { this.setState({ showDialog: false }) }}
  //   //       ></BottomDialog>
  //   //     </View>
  //   //   )
  //   // } else {
  //   //   return (
  //   //     <View>
  //   //       {/* <StatusBar backgroundColor={global.bg2.backgroundColor} barStyle="light-content"></StatusBar>
  //   //       <View style={{ height: 30, backgroundColor: global.bg2.backgroundColor }}>

  //   //         <AntIcon onPress={() => this.props.navigation.pop()} name="arrowleft" style={styles.arrow}></AntIcon>
  //   //       </View> */}
  //   //       <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 0.2, borderBottomColor: '#b5b4b494' }}>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 1 })}
  //   //           style={[styles.tab, this.state.tab === 1 ? styles.tabChose : null]}>最新发布</Text>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 2 })}
  //   //           style={[styles.tab, this.state.tab === 2 ? styles.tabChose : null]}>最新消息</Text>
  //   //         <Text
  //   //           onPress={() => this.setState({ tab: 3 })}
  //   //           style={[styles.tab, this.state.tab === 3 ? styles.tabChose : null]}>其他</Text>
  //   //       </View>

  //   //       <BottomDialog
  //   //         content={dialogContent}
  //   //         showDialog={showDialog}
  //   //         dissmiss={() => { this.setState({ showDialog: false }) }}
  //   //       ></BottomDialog>
  //   //     </View>
  //   //   )
  //   // }
  // }
}

const styles = StyleSheet.create({
  itemList: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,

  },
  text: {
    width: 300,
    lineHeight: 20,
    paddingTop: 8,
    paddingRight: 10,
    marginBottom: 12,
    color: '#333'
  },
  flatList: {
    paddingRight: 10,
    paddingLeft: 10
  },
  icon: {
    marginRight: 4,
    fontSize: 14,
    color: 'gray'
  },
  iconText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 16
  },
  tab: {
    flex: 1,
    textAlign: "center",
    // lineHeight: 50
    paddingTop: 20,
    paddingBottom: 8,
    fontWeight: "bold"
  },
  tabChose: {
    borderBottomColor: global.bg2.backgroundColor, borderBottomWidth: 2, color: global.bg.backgroundColor
  },
  arrow: {
    // color: global.bg2.backgroundColor,
    color: "#FFFFFF",
    // color: "#000",
    fontSize: 25,
    marginLeft: 25
    // top: 28,
    // left: 25,
    // position: "absolute"
  },
  hidden: {
    display: "none",
  }
})

