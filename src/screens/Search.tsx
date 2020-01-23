import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
import {SearchBar,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import global from '../../style';
interface Props {
  navigation: any;
}
export class Search extends Component<Props> {
  state = {
    search: '',
    isShow: true,
    users: [],
  };
  updateSearch(search: string) {
      this.setState({
          isShow:true
      })
    if (search === '') {
      this.setState({
        users: [],
        search: search,
      });
      return;
    }
    // let list:any = this.state.users
    this.setState({
      search: search,
      users: this.getSearchList(),
    });
  }
  getSearchList() {
    return [
      {info: 'test', key: '0'},
      {info: 'test', key: '1'},
      {info: 'test', key: '2'},
      {info: 'test', key: '3'},
      {info: 'test', key: '4'},
    ];
  };
  searchInfo(item:any){
      this.setState({search:item.info,isShow:false})
    // Alert.alert(item.info)
  }
  render() {
    const {search, users, isShow} = this.state;
    const display = isShow?'flex':'none';
    const btn = isShow?'none':'flex';
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SearchBar
            clearIcon={true}
            placeholder="Type here ...."
            onChangeText={this.updateSearch.bind(this)}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputSearchBar}
            inputStyle={styles.input}
            value={search}
            autoFocus={true}
          />
          <Text
            style={{marginRight: 12}}
            onPress={() => this.props.navigation.pop()}>
            取消
          </Text>
        </View>

        <FlatList
          keyboardShouldPersistTaps="handled"
          style={{paddingLeft: 12, paddingRight: 12,display:display}}
          data={users}
          renderItem={({item}) => {
            return (
                <TouchableWithoutFeedback onPress={this.searchInfo.bind(this,item)}>
                <View style={styles.result}>
                <Text 
                    style={{lineHeight: 40, paddingLeft: 12}}>
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
        <View style={{display:btn}}>
        <Button  title={this.state.search} onPress={()=>{}}></Button>
        </View>
      </View>
    );
  }
}

const {color} = global.fontColor;
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
    color: color,
    fontSize: 13,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
});
