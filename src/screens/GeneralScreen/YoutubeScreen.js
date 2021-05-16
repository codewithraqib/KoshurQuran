// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import { colors, commonStyles, dimensions } from "src/theme";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import PBModal from "src/components/PBModal";
import { connectData } from "src/redux";

class YoutubeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log("regions in render ---------", this.state.regions);
    return (
      <View style={styles.flex}>
        <FullQuizBG color={true} type={1} />

        <CarpoolHeader
          menuIcon={false}
          backIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          label="Set"
          labelBold="Location"
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
