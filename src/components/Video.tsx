
import React, { Component } from 'react';
import { RtcEngine, AgoraView } from 'react-native-agora';
import { cameraAndAudioPermission } from '../utils/utils';
import {
  Text,
  View,
  Button,
  NativeModules,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Image
} from 'react-native';
import global from '../../style'

const { Agora } = NativeModules;
const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora;
const config: any = {                            //Setting config of the app
  appid: 'db263a90c4e54677a48ddde4d77bf037',               //Enter the App ID generated from the Agora Website
  channelProfile: 0,                        //Set channel profile as 0 for RTC
  videoEncoderConfig: {                     //Set Video feed encoder settings
    width: 720,
    height: 1080,
    bitrate: 1,
    frameRate: FPS30,
    orientationMode: Adaptative,
  },
  audioProfile: AudioProfileDefault,
  audioScenario: AudioScenarioDefault,
};

let dimensions = {                                //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
interface State {
  peerIds: Array<String>,
  uid: number,
  appid: string,
  channelName: string,
  joinSucceed: boolean
}
export default class Video extends Component {
  state: State;
  RtcEngineListern: any;
  RtcEngineListernOn: any;
  RtcengineListernOff: any;
  RtcEngineListernSuccess: any;
  RtcEngineListernOff: any;
  constructor(props: any) {
    super(props);
    this.state = {
      peerIds: [],                                       //Array for storing connected peers
      uid: Math.floor(Math.random() * 100),              //Generate a UID for local user
      appid: config.appid,
      channelName: props.navigation.state.params.channel,                        //Channel Name for the current session
      joinSucceed: false,                                //State variable for storing success
    };
    // console.log(props.navigation.state);
    if (Platform.OS === 'android') {                    //Request required permissions from Android
      cameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }
  };

  componentDidMount() {
    // console.log(this.props.navigation.state.params.channel)
    // this.setState({ uid: this.props.navigation.state.params.channel })
    // BackHandler.addEventListener('hardwareBackPress', this.endCall);
    this.RtcEngineListernOn = RtcEngine.on('userJoined', (data) => {
      const { peerIds } = this.state;                   //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {           //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid],              //add peer ID to state array
        });
      }
    });
    this.RtcEngineListernOff = RtcEngine.on('userOffline', (data) => {             //If user leaves
      this.setState({
        peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
      });
    });
    this.RtcEngineListernSuccess = RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
      RtcEngine.startPreview();                                      //Start RTC preview
      this.setState({
        joinSucceed: true,                                           //Set state variable to true
      });
    });
    RtcEngine.init(config);                                         //Initialize the RTC engine
  };
  componentWillUnmount() {
    RtcEngine.destroy();
  }
  startCall() {
    console.log('开始', this.state.uid)
    console.log(RtcEngine)
    RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
    RtcEngine.enableAudio();                                        //Enable the audio
    console.log('打开成功')
  }
  /**
  * @name endCall
  * @description Function to end the call
  */
  endCall() {
    this.setState({
      peerIds: [],
      joinSucceed: false,
    });
    RtcEngine.stopPreview();
    RtcEngine.leaveChannel();

  };

  render() {
    return (
      <View style={styles.max}>
        {/* <StatusBar hidden={true}></StatusBar> */}
        {
          <View style={styles.max}>

            {
              !this.state.joinSucceed ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ height: 200, width: 280 }} source={require('../assets/pic/video.png')}></Image>
                </View>
                :
                <View style={styles.fullView}>
                  {
                    this.state.peerIds.length > 2                   //view for three videostreams
                      ? <View style={styles.full}>
                        <View style={styles.half}>
                          <AgoraView style={styles.full}
                            remoteUid={this.state.peerIds[0]} mode={1} />
                        </View>
                        <View style={styles.halfViewRow}>
                          <AgoraView style={styles.half}
                            remoteUid={this.state.peerIds[1]} mode={1} />
                          <AgoraView style={styles.half}
                            remoteUid={this.state.peerIds[2]} mode={1} />
                        </View>
                      </View>
                      : this.state.peerIds.length > 1                   //view for two videostreams
                        ? <View style={styles.full}>
                          <AgoraView style={styles.full}
                            remoteUid={this.state.peerIds[0]} mode={1} />
                          <AgoraView style={styles.full}
                            remoteUid={this.state.peerIds[1]} mode={1} />
                        </View>
                        : this.state.peerIds.length > 0                   //view for videostream
                          ? <AgoraView style={styles.full}
                            remoteUid={this.state.peerIds[0]} mode={1} />
                          : <View>
                            <Text style={styles.noUserText}> No users connected </Text>
                          </View>
                  }
                  <AgoraView style={styles.localVideoStyle}
                    zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
                </View>
            }
          </View>
        }
        <View style={styles.buttonHolder}>
          {
            !this.state.joinSucceed ?
              <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity onPress={() => this.startCall()} style={styles.button}>
                  <Text style={styles.buttonText}> Start Call </Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={() => this.endCall()} style={styles.button}>
                <Text style={styles.buttonText}> End Call </Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({


  max: {
    flex: 1,
    paddingTop: 10
  },
  buttonHolder: {
    height: 100,
    // flex: 1,
    alignItems: 'center',
    // bottom: 0,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: global.bg2.backgroundColor,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height,
  },
  halfViewRow: {
    flex: 1 / 2,
    flexDirection: 'row',
  },
  full: {
    flex: 1,
  },
  half: {
    flex: 1 / 2,
  },
  localVideoStyle: {
    width: 120,
    height: 150,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});