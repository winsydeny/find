import React, { Component } from 'react';
import {
    Input,
    Button,
    Icon,
    Overlay,
    Text
} from 'react-native-elements'
import { View, ActivityIndicator, Alert } from 'react-native'
export default class Registerd extends Component {
    state = {
        email: '',
        emailError: '',
        loading: false
    }
    showAlert() {
        Alert.alert("", "已发送至邮箱,请查看并填写相关信息", [{ text: '我知道了' }])
    }
    registerd() {
        const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (pattern.test(this.state.email)) {
            this.setState({ emailError: '', loading: true })
            setTimeout(() => {
                this.setState({
                    loading: false
                })
                this.showAlert()
            }, 200)
            // registerd success
        } else {
            this.setState({
                emailError: '邮箱格式错误'
            })
        }

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Input
                    placeholder="请输入邮箱"
                    errorMessage={this.state.emailError}
                    onChangeText={email => this.setState({ email: email })}></Input>
                <View style={{ width: '94%', marginTop: 12 }}>
                    <Button
                        title="一键注册"
                        loading={this.state.loading}
                        onPress={this.registerd.bind(this)}></Button>
                    {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                </View>
            </View>
        )
    }
}