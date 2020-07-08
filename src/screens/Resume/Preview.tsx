
import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native';
import Pdf from 'react-native-pdf';
interface Prop {
    navigation: any
}
export default class Preview extends Component<Prop> {
    state = {
        num: '0'
    }
    render() {
        const filename = this.props.navigation.state.params.uri;

        const source = { uri: `https://www.vanlansh.wang/upload/${filename}`, cache: true };
        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});