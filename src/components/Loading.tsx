import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
let _this = null;
interface Prop {
  show: Boolean,
  title?: String
}
class Loading extends Component<Prop> {
  state = {
    show: true,
  };
  componentDidMount() {
    _this = this;
  }
  render() {
    const loading = this.props.show;
    const title = this.props.title || '正在加载'
    if (loading) {
      return (
        <View style={styles.LoadingPage}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}>
            <ActivityIndicator size="large" color="#FFF" />
            <Text style={{ marginLeft: 10, color: '#FFF', marginTop: 10 }}>
              {title}...
            </Text>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}
export default Loading;
const styles = StyleSheet.create({
  LoadingPage: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
