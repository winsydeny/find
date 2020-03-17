import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
interface Props {
    text: string,
    list: number,
    name?: string
}
export default class test extends Component {
    getMethods(props: Props) {
        const { text, list } = props;
        // console.log(s)
        // console.log()
        console.log(text, list)
    };
    render() {
        return (
            <View>
                <Text></Text>
                <ScrollView>xijia</ScrollView>
                <Button title="xijia" onPress={() => this.getMethods({ text: 'text', list: 1 })}></Button>
            </View>
        )
    }
}
