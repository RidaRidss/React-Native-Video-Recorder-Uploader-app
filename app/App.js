import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { NativeEventEmitter, NativeModules } from "react-native";
import { ZIGGEO_APP_TOKEN } from "./constants";
import Ziggeo from "react-native-ziggeo-library";
let subscription;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingFinished: false,
      video: undefined
    };
  }
  async componentDidMount() {
    await this.record().done();
  }

  getSettings() {
    var appToken = ZIGGEO_APP_TOKEN;
    Ziggeo.setAppToken(appToken);
    Ziggeo.setCameraSwitchEnabled(true);
    Ziggeo.setCoverSelectorEnabled(true);
    Ziggeo.setCamera(Ziggeo.REAR_CAMERA);
  }

  async record() {
    this.getSettings();
    this.setState({
      isLoading: true
    });
    const recorderEmitter = Ziggeo.recorderEmitter();
    alert("Please wait uploading start");
    subscription = recorderEmitter.addListener("UploadProgress", progress => {
      this.setState({
        bytesSent: progress.bytesSent,
        totalBytes: progress.totalBytes
      });
      if (progress.bytesSent === progress.totalBytes) {
        alert("upload completed");
        this.setState({
          loadingFinished: true
        });
      }
    });

    try {
      //record and upload the video and return its token
      var token = await Ziggeo.record();
      console.log("Token:" + token);
      if (token) {
        this.setState({
          videoToken: token
        });
        // Ziggeo.play(token);
      }
    } catch (e) {
      console.log("Error:" + e);
      //recorder error or recording was cancelled by user
      alert(e);
    }
  }

  render() {
    let { loadingFinished, videoToken } = this.state;
    return (
      <View style={styles.container}>
        {!loadingFinished ? (
          <Text>
            {" uploaded " +
              this.state.bytesSent +
              " from " +
              this.state.totalBytes +
              " total bytes"}
          </Text>
        ) : null}

        {loadingFinished ? (
          <Button
            style={{ marginTop: -80 }}
            onPress={() => {
              Ziggeo.play(videoToken);
            }}
            title="Play video"
            accessibilityLabel="Play video"
          />
        ) : null}

        <Button
          onPress={() => this.record}
          title="Record"
          accessibilityLabel="Record"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
