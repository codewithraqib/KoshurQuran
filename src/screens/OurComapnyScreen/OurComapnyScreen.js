// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import { connectData } from "src/redux";
import { dimensions } from "src/theme";
import PBCard from "src/components/PBCard";
import CommonService from "src/services/commonService";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import SuccessFailureModal from "src/components/SuccessFailureModal";
import WebView from "react-native-webview";
import PBText from "src/components/PBText";

class DonationScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uri: "https://bracecodes.com",
    };
  }

  componentDidMount() {
    console.log("Props i  withdraw add screen ", this.props);
  }

  render() {
    return (
      <View style={(styles.flex, styles.screenwrapper)}>
        <FullQuizBG color={true} type={1} />
        <CarpoolHeader
          leftIconColor="#fff"
          backIconColor="#fff"
          backIcon={true}
          labelDark={false}
          componentId={this.props.componentId}
          label={"Our"}
          labelBold="company"
        />

        <View style={{ backgroundColor: "#fff", height: dimensions.vh * 87 }}>
          <WebView
            showsHorizontalScrollIndicator={true}
            originWhitelist={["*"]}
            scalesPageToFit={true}
            androidHardwareAccelerationDisabled={true}
            style={{
              opacity: 0.99,
              overflow: "hidden",
              zIndex: 100,
            }}
            source={{
              uri: this.state.uri,
            }}
          />
        </View>

        <SuccessFailureModal
          showModal={this.state.walletSuccess}
          success={this.state.walletSuccessStatus}
          smallIcon={true}
          bodyText={this.state.modalBodyText}
          buttonText={"OK"}
          onButtonPress={() => {
            this.setState({ walletSuccess: false });
            this.state.walletSuccessStatus
              ? CommonService.goBack(this.props.componentId)
              : null;
          }}
          onBackButtonPress={() => {
            this.setState({ walletSuccess: false });
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
  flex1: {
    flex: 1,
    maxHeight: dimensions.vh * 90,
    height: dimensions.vh * 90,
  },
  button: {
    backgroundColor: "#039893",
  },
  screenwrapper: {
    width: dimensions.vw * 100,
  },
});

export default connectData()(DonationScreen);
