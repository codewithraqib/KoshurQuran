// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { get } from "lodash";

import { pushTutorialScreen } from "src/navigation";
import { connectData } from "src/redux";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.99,
  },
});

class QiblaScreen extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission",
        message:
          "Give location permission to the app so that we can locate Qibla for you!",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
      }
    )
      .then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // this.gpsDetectedCount++;
          // this.getGPSLocation();
        } else {
          // Handle
        }
      })
      .catch((err) => {
        console.log("PermissionsAndroid", err);
      });

    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //   title: "Camera Permission",
    //   message: "JK meeqat App needs access to your camera ",
    //   buttonNeutral: "Ask Me Later",
    //   buttonNegative: "Cancel",
    //   buttonPositive: "OK",
    // });
  }

  navigationButtonPressed({ buttonId }) {
    const { data } = this.props;

    switch (buttonId) {
      case "nav_logout_btn": {
        pushTutorialScreen();
        break;
      }
      case "nav_user_btn": {
        Alert.alert(get(data, "user.name", "Unknown User"));
        break;
      }
      default:
        break;
    }
  }

  render() {
    return (
      // <View style={styles.flex}>
      <WebView
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: "https://qiblafinder.withgoogle.com/intl/en",
        }}
      />
      // </View>
    );
  }
}

QiblaScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connectData()(QiblaScreen);
