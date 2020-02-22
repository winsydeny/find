import React, { Component } from "react";
import { Dialog } from 'react-native-ui-lib';
import { View, Text } from 'react-native'
interface Props {
  content: string,
  showDialog: boolean,
  dissmiss: any
}
export default class BottomDialog extends Component<Props>{
  // state = {
  //   showDialog: false
  // };
  dismiss() {
    // this.setState({ showDialog: false });
    // this.props.clsoe

  };
  componentDidMount() {
  }
  render() {
    // const { showDialog } = this.state
    const { content, showDialog, dissmiss } = this.props
    // const { showDialog } = this.state
    return (
      <View>
        <Dialog
          overlayBackgroundColor="#797a7b64"
          onDismiss={dissmiss}
          visible={showDialog}
          height={300}
          width="100%"
          bottom>
          <View style={{ backgroundColor: '#FFFFFF', height: 300, padding: 10 }}>
            <Text>{content}</Text>

          </View>
        </Dialog>
      </View>
    )
  }
}