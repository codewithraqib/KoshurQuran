// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import { colors, commonStyles, dimensions } from "src/theme";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import PBModal from "src/components/PBModal";
import { connectData } from "src/redux";
import WebView from "react-native-webview";

class YoutubeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log("regions in render ---------", this.props);
    return (
      <View style={styles.flex}>
        <FullQuizBG color={true} type={1} />
        <CarpoolHeader
          menuIcon={false}
          backIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          label=" "
          labelBold="Videos"
        />

        <WebView
          showsHorizontalScrollIndicator={false}
          originWhitelist={["*"]}
          scalesPageToFit={false}
          source={{ uri: this.props.youtube_link }}
        />

        <PBModal
          showModal={this.state.showPG}
          modalHeight={dimensions.vh * 35}
          titleText="You will be redirected to Payment Gateway for payment"
          showButton1={true}
          button1Text="Yes, go to PG"
          button1Press={this.logout}
          showButton2={true}
          button2Text="No, Stay"
          button2Press={() => {
            this.setState({ showPG: false });
          }}
          onBackButtonPress={() => {
            this.setState({ showPG: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  outerRadioButtonCircle: {
    height: 26,
    width: 26,
    borderRadius: 26 / 2,
    borderColor: "#eee",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  innerRadioButtonCircleFilled: {
    height: 16,
    width: 16,
    borderRadius: 18 / 2,
    backgroundColor: "#e74c3c",
  },
});

export default connectData()(YoutubeScreen);
