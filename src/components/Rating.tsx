import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// import { px } from '../utils/device';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Rate extends Component {
    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         value: this.props.value
    //     }
    // }
    // componentWillReceiveProps(newProps) {
    //     const { value } = newProps;
    //     if (value !== this.state.value) {
    //         this.setState({
    //             value
    //         });
    //     }
    // }
    // static propTypes = {//如果使用组件时调用了onPress，那么组件默认为可以改变，如果没有，那么组件应该为只读
    //     value: PropTypes.number,
    //     size: PropTypes.number,
    //     margin: PropTypes.number,
    //     max: PropTypes.number,
    //     color: PropTypes.string,
    //     onPress: PropTypes.func
    // }
    // static defaultProps = {
    //     value: 0,
    //     size: 20,
    //     margin: 5,
    //     max: 5,
    //     color: '#00b600'
    // }
    state = {
        value: 0,
        size: 20,
        margin: 5,
        max: 5,
        color: '#00b600'
    }
    bindClick = (index) => {
        const { onPress } = this.props;
        if (!onPress) {
            return;
        }
        onPress(index + 1);
        this.setState({
            value: index + 1
        })
    }
    render() {
        const { size, margin, max, color } = this.state;
        const { value } = this.state;
        const defaultStars = [], activeStars = [];
        for (let i = 0; i < max; i++) {
            defaultStars.push(<Icon name='star' key={i} size={size} color='#ececec' onPress={() => this.bindClick(i)} style={{ marginRight: margin }}></Icon>)
        }
        for (let i = 0; i < value; i++) {
            activeStars.push(<Icon name='star' key={i} size={size} color={color} onPress={() => this.bindClick(i)} style={{ marginRight: margin }}></Icon>)
        }
        // 选中状态的星星的宽度
        const activeStarsWidth = (size + margin) * Math.floor(value) + size * (value - Math.floor(value));
        return (
            <View style={styles.rates}>
                <View style={[styles.stars, styles.active, { width: activeStarsWidth }]}>
                    {activeStars.map(item => item)}
                </View>
                <View style={styles.stars}>
                    {defaultStars.map(item => item)}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    rates: {
        flexDirection: 'row',
        position: 'relative'
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        flexGrow: 0
    },
    active: {
        position: 'absolute',
        zIndex: 200,
        left: 0,
        top: 0
    }
});