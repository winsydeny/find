import React, { Component } from "react";
// import { Dialog } from 'react-native-ui-lib';
import { Overlay } from 'react-native-elements';
import { View, Text, Modal } from 'react-native'
import { Dialog } from "react-native-ui-lib";
interface Props {
  content: string,
  showDialog: boolean,
  dissmiss: any
}
export default class BottomDialog extends Component<Props>{
  state = {
    isVisible: false
  };
  dismiss() {
    // this.setState({ showDialog: false });
    // this.props.clsoe

  };
  componentDidMount() {
    // this.setState({ isVisible: this.props.showDialog })
  }
  render() {
    // const { showDialog } = this.state
    const { content, showDialog, dissmiss } = this.props
    // const { showDialog } = this.state
    return (
      <>
        {/* <Modal

          visible={showDialog}
          animationType="slide"
          transparent={true}
        >
          <View style={{ backgroundColor: 'gray', height: 200, bottom: 0, position: "absolute", width: '100%' }}>
            <Text>Hello Model</Text>
          </View>
        </Modal> */}
      </>


      // <Overlay
      //   isVisible={showDialog}
      //   windowBackgroundColor="gray"
      //   overlayBackgroundColor="red"
      //   onBackdropPress={dissmiss}
      //   // fullScreen={true}
      //   width="auto"
      //   height="auto"
      // >
      //   <Text>Hello from Overlay!</Text>
      // </Overlay>
    )
  }
}

{/* <Dialog
          overlayBackgroundColor="#797a7b64"
          onDismiss={dissmiss}
          visible={showDialog}
          height={300}
          width="100%"
          bottom>
          <View style={{ backgroundColor: '#FFFFFF', height: 300, padding: 10 }}>
            <Text>{content}</Text>
            <Text>sdfsdf</Text>
          </View>
        </Dialog> */}