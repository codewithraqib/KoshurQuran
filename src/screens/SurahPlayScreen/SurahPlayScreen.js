// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StatusBar, StyleSheet, View } from "react-native";
import { BOOKMARKS_SCREEN, HOME_SCREEN } from "src/navigation";
import { connectData } from "src/redux";
import CommonService from "src/services/commonService";
import Player from "src/components/Player";
import Header from "src/components/Header";
import index from "../../assets/index.json";
import storageService from "src/services/storageService";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

class SurahPlayScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { index: this.props.data && this.props.data.allSurahs };
  }

  goToMainScreen = () => {
    this.setState({ showModal: false });

    CommonService.setRoot(HOME_SCREEN);
  };

  componentDidMount() {
    console.log("Data in play screen---", this.props);

    storageService.getItem("allSurahs").then((data) => {
      if (data) {
        let allSurahs = JSON.parse(data);
        console.log("All surahs from local storage are", allSurahs);
      } else {
        // CommonService.setRoot(LOGIN_SCREEN);
        console.log("No surah in local storage");
      }
    });

    if (
      this.state.index &&
      this.props.data &&
      this.props.data.currentSurah &&
      this.props.data.currentSurah.quranIndex
    ) {
      let currentSurahIndex;

      this.state.index &&
        this.state.index.map((val, key) => {
          if (val.id === this.props.data.currentSurah.surah.id) {
            currentSurahIndex = key;
          }
        });

      console.log("currentSurahIndex---------", this.state.index.length);
      this.setState({
        tracks:
          this.state.index &&
          this.state.index.slice(currentSurahIndex, this.state.index.length),
      });
    }

    if (
      this.props.data &&
      this.props.data.currentSurah &&
      this.props.data.currentSurah.position
    ) {
      this.setState({
        position: this.props.data.currentSurah.position,
      });
    }
  }

  onRightIconPress = () => {
    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      BOOKMARKS_SCREEN
    );
  };

  render() {
    console.log("Sliced tracks are-------", this.state.tracks);
    return (
      <View style={styles.flex}>
        {/* <StatusBar
          translucent
          backgroundColor="#444"
          barStyle="light-content"
        /> */}
        <Header
          message={
            this.props.data &&
            this.props.data.currentSurah &&
            this.props.data.currentSurah.surah
              ? `Playing ...`
              : "Loading"
          }
          style={{ height: 80, paddingTop: 40 }}
          onRightIconPress={this.onRightIconPress}
        />
        {this.props &&
          this.props.data &&
          this.props.data.currentSurah &&
          this.props.data.currentSurah.surah && (
            <Player
              tracks={
                this.state.tracks
                  ? this.state.tracks
                  : [this.props.data.currentSurah.surah]
              }
              position={this.state.position ? this.state.position : 0}
            />
          )}
      </View>
    );
  }
}

SurahPlayScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connectData()(SurahPlayScreen);
