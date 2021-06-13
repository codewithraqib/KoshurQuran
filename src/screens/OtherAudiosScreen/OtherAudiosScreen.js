// @flow

import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors, commonStyles, dimensions } from "src/theme";
import PBModal from "src/components/PBModal";
import { connectData } from "src/redux";
import PBText from "src/components/PBText";
import Header from "src/components/Header";
import CommonService from "src/services/commonService";
import { SURAH_PLAY_SCREEN } from "src/navigation";

class OtherAudiosScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {
          id: 0,
          title: "Awraad e fatheya",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/other_audios/awraad_new.mpeg",
        },
      ],
      set: false,
    };
  }

  componentDidMount() {}

  goToScreen = (surah) => {
    // console.log("this.props------", this.props);

    this.props.setCurrentSurah({ surah: surah, quranIndex: false });

    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      SURAH_PLAY_SCREEN
    );
  };

  renderListItem = (surah, key) => {
    return (
      <TouchableOpacity onPress={() => this.goToScreen(surah)}>
        <View key={key} style={styles.listItem}>
          {/* <PBText white={true} style={{ marginRight: 10 }}>
            {surah.id}
          </PBText> */}
          <PBText white={true}>{surah.title}</PBText>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.flex}>
        <StatusBar
          translucent
          backgroundColor="#444"
          barStyle="light-content"
        />
        <Header
          headerBackgroundColor={{ backgroundColor: "#444" }}
          message={`Audios`}
          style={{ height: 80, paddingTop: 40 }}
        />

        <ScrollView>
          {this.state.tracks &&
            this.state.tracks.map((val, key) => {
              return this.renderListItem(val, key);
            })}
        </ScrollView>
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
  listItem: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    minHeight: dimensions.vh * 6,
    marginHorizontal: dimensions.vw * 3,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

export default connectData()(OtherAudiosScreen);
