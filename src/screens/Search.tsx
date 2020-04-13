import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import global from '../../style';
import { suggest } from '../api';
interface Props {
  navigation: any;
}
export default class Search extends Component<Props> {
  state = {
    search: '',
    isShow: true,
    users: [],
    keyWord: ''
  };
  async updateSearch(search: string) {
    this.setState({
      isShow: true
    })
    if (search === '') {
      this.setState({
        users: [],
        search: search,
      });
      return;
    }
    // const sug = await suggest(search);
    // console.log(sug)

    // let list:any = this.state.users
    this.setState({
      search: search,
      users: this.getSearchList(),
    });
  }
  getSearchList() {

    // console.log(list)
    return [
      // { info: 'java', key: '0' },
      // { info: '前端', key: '1' },
      // { info: 'jack', key: '2' },
      // { info: 'tom', key: '3' },
      // { info: 'hello', key: '4' },
    ];
  };
  searchInfo(item: any) {
    if (item === '') return false;
    this.setState({ search: item.info, isShow: false, keyWord: item })
    this.props.navigation.navigate('SearchResults', { transition: 'forHorizontal', keyWord: item });
    // Alert.alert(item.info)
  }
  render() {
    const { search, users, isShow, keyWord } = this.state;
    const display = isShow ? 'flex' : 'none';
    const btn = isShow ? 'none' : 'flex';
    return (
      <View style={{ paddingTop: global.statusBarHeight.paddingTop }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar
            clearIcon={true}
            placeholder="Type here ...."
            onChangeText={this.updateSearch.bind(this)}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputSearchBar}
            selectionColor={global.bg2.backgroundColor}
            inputStyle={styles.input}
            value={search}
            autoFocus={true}
            returnKeyType="search"
            onBlur={() => this.searchInfo(search)}
          />
          <Text
            style={{ marginRight: 12 }}
            onPress={() => this.props.navigation.pop()}>
            取消
          </Text>
        </View>

        <FlatList
          keyboardShouldPersistTaps="handled"
          style={{ paddingLeft: 12, paddingRight: 12, display: display }}
          data={users}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback onPress={this.searchInfo.bind(this, item)}>
                <View style={styles.result}>
                  <Text
                    style={{ lineHeight: 40, paddingLeft: 12 }}>
                    {item.info}
                  </Text>
                  <Icon
                    name="arrow-up-left"
                    style={{
                      fontSize: 18,
                      color: 'gray',
                      position: 'absolute',
                      right: 0,
                    }}></Icon>
                </View>
              </TouchableWithoutFeedback>

            );
          }}></FlatList>
        <View style={{ display: btn }}>
          {/* serach-results-list */}
        </View>
      </View>
    );
  }
}

const { color } = global.fontColor;
const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    flex: 1,
  },
  inputSearchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    height: 40,
  },
  input: {
    color: '#000000',
    // fontWeight: "bold",123
    fontSize: 16,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
});
