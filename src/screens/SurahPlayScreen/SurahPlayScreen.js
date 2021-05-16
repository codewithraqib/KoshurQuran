// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StatusBar, StyleSheet, View } from "react-native";
import { HOME_SCREEN } from "src/navigation";
import { connectData } from "src/redux";
import CommonService from "src/services/commonService";
import Player from "src/components/Player";
import Header from "src/components/Header";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

class SurahPlayScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goToMainScreen = () => {
    this.setState({ showModal: false });

    CommonService.setRoot(HOME_SCREEN);
  };

  render() {
    return (
      <View style={styles.flex}>
        {/* <StatusBar
          translucent
          backgroundColor="#444"
          barStyle="light-content"
        /> */}
        <Header
          message={
            this.props.data && this.props.data.currentSurah
              ? `Playing ${this.props.data.currentSurah.title}`
              : "Loading"
          }
          style={{ height: 80, paddingTop: 40 }}
        />
        {this.props && this.props.data && this.props.data.currentSurah && (
          <Player tracks={[this.props.data.currentSurah]} />
        )}
      </View>
    );
  }
}

SurahPlayScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connectData()(SurahPlayScreen);
