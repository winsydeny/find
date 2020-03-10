import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class ChoseCity extends Component {

    state = {
        data: [],               // 用于存放所有的城市数据
        right: [],              // 右边的字母导航数据
        currentLetter: 'A'      // 当前选中的城市
    }


    async componentDidMount() {
        const { data } = await require('../assets/cities.json');
        let cityInfo: any = [];
        let right: any = [];

        // 这里的保证了城市数据和右边的字母导航同步
        data.map((item, index) => {
            cityInfo[index] = { key: item.key, data: item.cities };
            right[index] = item.key;
        });

        this.setState({ data: cityInfo, right: right });
    }

    renderItem = ({ item, index }) => (
        <View style={styles.cityPiece}>
            <Text style={styles.keyText}>{item.key}</Text>
            <View style={styles.cities}>
                {item.data.map(({ city }, index) => (
                    <TouchableOpacity key={index} style={styles.cityItem}>
                        <Text>{city}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    handleViewableItemsChanged = ({ viewableItems, changed }) => {
        this.setState({
            currentLetter: viewableItems[0].key
        });
    }

    scrollTo = (index: number) => {
        console.log(index);
        this.list.scrollToIndex({ viewOffset: -6, viewPosition: 0, index, animated: true });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#F6F5F5' }}>
                {/* <View style={{ flexDirection: "row", height: 40, alignItems: "center", backgroundColor: "#FFFFFF" }}>
                    <Text style={{ marginLeft: 12 }}>当前定位:</Text>
                    <Text style={{}}>北极</Text>
                </View> */}

                <FlatList
                    style={{}}
                    data={this.state.data}
                    ref={flatList => this.list = flatList}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                />
                <View style={styles.right}>
                    {this.state.right.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => { this.scrollTo(index) }}>
                            <Text style={[this.state.currentLetter === item && { color: '#FD7700' }]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cityPiece: {
        marginTop: 6,
        backgroundColor: '#FFF',
        paddingLeft: 21,
        paddingRight: 21,
        paddingTop: 15,
        paddingBottom: 15
    },
    cities: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    cityItem: {
        flex: 0,
        backgroundColor: '#F6F5F5',
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 18,
        marginTop: 14,
        marginRight: 10,
    },
    right: {
        position: 'absolute',
        top: 18,
        right: 0,
        bottom: 0,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        // marginBottom: 8,
        // justifyContent: 'space-between',
        // backgroundColor: '#F6F5F5',
        paddingLeft: 10,
    },
})