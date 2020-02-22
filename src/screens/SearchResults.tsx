import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import EnIcon from 'react-native-vector-icons/Entypo'
import AIcon from 'react-native-vector-icons/FontAwesome'
import global from '../../style';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Button, Alert, Image, ListView } from 'react-native';
import { Avatar } from 'react-native-elements';
import ListItem from '../components/ListItem'
interface Prop {
    navigation: any
}
export default class SearchResults extends Component<Prop> {
    state = {
        jobList: [{ key: 'a' }, { key: 'a' }, { key: 'a' }, { key: 'a' }, { key: 'a' }, { key: 'a' }]
    }
    componentDidMount() {
        // if (this.props.keyword !== '') {
        //     // Alert.alert();
        //     console.log(this.props)
        // Alert.alert(this.props.navigation.state.params.keyWord)
        // this.props.navigation.state.params.keyword
        // }
    };
    getList() {
        return this.state.jobList;
    };
    getMore() {
        if (this.getList().length <= 16) {
            this.setState({
                jobList: this.state.jobList.concat([{ key: 'a' }, { key: 'a' }, { key: 'a' }, { key: 'a' }])
            })
        }

        // Alert.alert("more")
    };
    render() {
        const keyword = this.props.navigation.state.params.keyWord;
        return (
            <View style={{ backgroundColor: '#f4f5f5', flex: 1 }}>
                <View style={{ height: 50, paddingLeft: 10, paddingRight: 10, backgroundColor: "#FFFFFF" }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.pop()}>
                        <View style={styles.searchBar}>
                            <Icon
                                name="search1"
                                style={{ paddingLeft: 10, color: '#867f7fc9' }}></Icon>
                            <Text style={{ paddingLeft: 6, color: '#867f7fc9' }}>{keyword}</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => this.getMore()}
                    data={this.getList()}
                    onEndReachedThreshold={0.1}
                    renderItem={() => {
                        return (
                            <View style={{ marginTop: 12 }}>
                                <ListItem></ListItem>
                            </View>
                        )
                    }}></FlatList>

            </View >
        )
    }
}


const fontGray = '#b0b4be';
const fontGray2 = '#98a0b0';
const { color } = global.fontColor;
const blue = global.font.color
const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        borderRadius: 16,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        marginBottom: 8
        // justifyContent: "center"
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 6,
        marginRight: 14
    },
    listCard: {
        marginLeft: 13,
        marginRight: 13,
        backgroundColor: '#FFFFFF',
        // height: 100,
        marginTop: 12,
        borderRadius: 6,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
    },
    textRight: {
        position: 'absolute',
        right: 0
    }

});