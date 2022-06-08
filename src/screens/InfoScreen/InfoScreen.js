// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StatusBar, StyleSheet, View } from "react-native";
import { connectData } from "src/redux";
import { WebView } from "react-native-webview";
import PButton from "src/components/PButton";
import FullQuizBG from "src/components/FullQuizBG";
import CarpoolHeader from "src/components/CarpoolHeader";
import { dimensions } from "src/theme";
import Header from "src/components/HeaderOld";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: "relative",
  },
  flex1: {
    flex: 1,
    maxHeight: dimensions.vh * 84,
    zIndex: 10,
  },
});

class InfoScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uri: "https://bracecodes.in/jkmeeqat/privacy-policy.html",
    };
  }

  componentDidMount() {}

  render() {
    console.log("Uri is -----", this.state.uri);
    return (
      <View style={styles.flex}>
        {/* <FullQuizBG color={true} type={1} /> */}

        <StatusBar
          translucent
          backgroundColor="#444"
          barStyle="light-content"
        />
        <Header
          headerBackgroundColor={{ backgroundColor: "#444" }}
          message={`Privacy and terms`}
          style={{ height: 80, paddingTop: 40 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            left: dimensions.vw * 5,
            zIndex: 10000,
            backgroundColor: "#fff",
          }}
        >
          <PButton
            onPress={() =>
              this.setState({
                uri: "https://bracecodes.in/jkmeeqat/privacy-policy.html",
              })
            }
            primaryButtonColor={false}
            style={{
              borderRadius: 10,
              marginTop: 25,
              maxWidth: dimensions.vw * 43,
              marginRight: 10,
            }}
            width={dimensions.vw * 43}
            noGradient={false}
            title={"Privacy Policy"}
            primaryButton={true}
          />
          <PButton
            onPress={() =>
              this.setState({
                uri: "https://bracecodes.in/jkmeeqat/tnc.html",
              })
            }
            primaryButtonColor={false}
            style={{
              borderRadius: 10,
              marginTop: 25,
              maxWidth: dimensions.vw * 43,
              marginLeft: 10,
            }}
            width={dimensions.vw * 43}
            noGradient={false}
            title={"Terms"}
            primaryButton={true}
          />
        </View>

        <View style={styles.flex1}>
          <WebView
            showsHorizontalScrollIndicator={true}
            originWhitelist={["*"]}
            scalesPageToFit={true}
            androidHardwareAccelerationDisabled={true}
            style={{ opacity: 0.99, overflow: "hidden", zIndex: 100 }}
            source={{
              uri: this.state.uri,
            }}
          />
        </View>

        {/* <View style={{ opacity: 0.999 }}>
          <WebView
            style={{ marginTop: 10 }}
            style={{
              backgroundColor: "#00f",
              position: "absolute",
              bottom: 0,
              left: 0,
              maxHeight: 0,
              height: 1,
              opacity: 0.1,
              zIndex: 1,
            }}
            showsHorizontalScrollIndicator={false}
            originWhitelist={["*"]}
            useWebKit={true}
            scalesPageToFit={false}
            source={{
              uri: this.state.uri,
            }}
          />
        </View> */}
      </View>

      // </View>
    );
  }
}

InfoScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connectData()(InfoScreen);
