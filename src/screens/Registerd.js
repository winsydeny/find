import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native'
export default class Registerd extends Component {
    render(){
        return(
            <View>
                <Text>Registerd</Text>
                <Button title="back"
                    onPress={() => {
                        this.props.navigation.navigate('Home')
                    }}
                ></Button>
            </View>
        )
    }
}