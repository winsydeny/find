import React, { Component } from "react";
import { Dialog } from 'react-native-ui-lib';
import { View,Text } from 'react-native'
interface Props {
  content: string,
  showDialog: boolean
}
export default class BottomDialog extends Component<Props>{
  state = {
    // showDialog:false
  };
  dismiss(){
    
  };
  render() {
    // const { showDialog } = this.state
    const { content,showDialog } = this.props
    return (
      <View>
        <Dialog
          overlayBackgroundColor="#797a7b64"
          onDismiss={this.dismiss}
          visible={showDialog}
          height={300}
          width="100%"
          bottom>
            <View style={{backgroundColor:'#FFFFFF',height:300,padding:10}}>
              <Text>{content}</Text>
            </View>
        </Dialog>
      </View>
    )
  }
}