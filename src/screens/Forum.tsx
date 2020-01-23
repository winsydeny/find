import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from 'react-native'
import { } from 'react-native-elements'
import { Dialog } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomDialog from '../components/BottomDialog'
import global from '../../style'
interface ItemList {
  title: string
}
export default class Forum extends Component {
  _keyExtractor = (item: any, index: any) => item.id;
  state = {
    // thumb:false,
    list: [],
    showDialog: false,
    dialogContent: ''
  };
  componentDidMount() {
    const list: any = [];
    for (let i = 0; i < 6; i++) {
      list.push({
        title: 'xijia',
        uid: i + 1,
        thumb: false,
        thumb_num: 0,
        comments: [],
        comment_num: 0,
        msg: '据国家卫健委最新消息：截至1月22日24时，我委收到国内25个省（区、市）累计报告新型冠状病毒感染的肺炎确诊病例571例，其中重症95例，死亡17例（均来自湖北省）'
      })
    }
    this.setState({ list })
  };
  thumbHandle(item: any) {
    const { list } = this.state
    const temp = Object.assign([], list);
    temp.forEach((el: any) => {
      if (Object.is(el.uid, item.uid)) {
        el.thumb = !el.thumb;
        if (el.thumb) {
          el.thumb_num = el.thumb_num + 1;
        } else {
          el.thumb_num = el.thumb_num - 1;
        }
      }
    });

    this.setState({ list: temp })
  };
  commentsHandle(item: any) {
    this.setState({ showDialog: true, dialogContent: item.uid })
  };
  render() {
    const { list, showDialog, dialogContent } = this.state;
    return (
      <View>
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={styles.itemList}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginRight: 10 }}
                  source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                ></Image>
                <View style={{}}>
                  <Text style={styles.title}>{item.title}{item.uid}</Text>
                  <Text numberOfLines={2} style={styles.text}>{item.msg}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="thumb-up"
                      style={[styles.icon, { color: item.thumb ? global.fontColor.color : 'gray', }]}
                      onPress={this.thumbHandle.bind(this, item)}>
                    </Icon>
                    <Text style={styles.iconText}>{item.thumb_num}</Text>
                    <Icon
                      name="message-processing"
                      style={[styles.icon]}
                      onPress={this.commentsHandle.bind(this, item)}>
                    </Icon>
                    <Text style={styles.iconText}>{item.comment_num}</Text>

                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}></FlatList>
        <BottomDialog content={dialogContent} showDialog={showDialog}></BottomDialog>
      </View>
    )
  }
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
    fontSize: 12,
    color: 'gray'
  },
  iconText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 16
  }
})

