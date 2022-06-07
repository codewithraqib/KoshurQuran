import React, { PureComponent } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { connectData } from "src/redux";
import { ScrollView } from "react-native-gesture-handler";
import PBText from "src/components/PBText";
import Header from "src/components/Header";
import { dimensions } from "src/theme";
import CommonService from "src/services/commonService";
import { BOOKMARKS_SCREEN, SURAH_PLAY_SCREEN } from "src/navigation";
import storageService from "src/services/storageService";

var moment = require("moment-hijri");

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      thisMonthNumber: new Date().getMonth(),
      fullIslamicDate: moment().format("iD/iM/iYYYY"),
    };
  }

  componentDidMount() {
    // console.log({ index });

    // this.setState({ tracks: index });

    this.props.getAllSurahs({
      callback: (res) => {
        console.log("All surahs data is-----", res);

        if (res && res.data && res.data.status && res.data.data) {
          this.setState({ tracks: res.data.data });
          storageService.setItem("allSurahs", res.data);
          this.props.setAllSurahs(res.data.data);
        }
      },
    });
  }

  goToScreen = (surah) => {
    console.log("this.props------", this.props);

    this.props.setCurrentSurah({ surah: surah, quranIndex: true });
    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      SURAH_PLAY_SCREEN
    );
  };

  renderListItem = (surah, key) => {
    return (
      <TouchableOpacity onPress={() => this.goToScreen(surah)}>
        <View key={key} style={styles.listItem}>
          <PBText white={true} style={{ marginRight: 10 }}>
            {surah.SurahId ? surah.SurahId : surah.id}
          </PBText>
          <PBText white={true}>{surah.PostTitle}</PBText>
        </View>
      </TouchableOpacity>
    );
  };

  onRightIconPress = () => {
    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      BOOKMARKS_SCREEN
    );
  };

  render() {
    console.log("All surahs are-----", this.state.tracks);
    return (
      <View style={styles.flex}>
        {/* <Player tracks={this.state.TRACKS} /> */}
        <StatusBar
          translucent
          backgroundColor="#f7b267"
          barStyle="light-content"
        />
        <Header
          headerBackgroundColor={{ backgroundColor: "#f7b267" }}
          message={`Quran Tarjam - Kashur`}
          style={{ height: 62, paddingTop: 20 }}
          onRightIconPress={this.onRightIconPress}
        />

        <PBText
          style={{ marginHorizontal: 12, lineHeight: 19, marginTop: 10 }}
          center
          bold
        >
          First 77 Surah translations are in process, They will be added soon!
        </PBText>

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
    // position: "relative",
  },
  heroImageContainer: {
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: "100%",
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 36 },
  text: { textAlign: "center", fontSize: 10 },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: "#f00",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    minHeight: dimensions.vh * 6,
    marginHorizontal: dimensions.vw * 3,
    backgroundColor: "#f4845f",
    marginVertical: 5,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

export default connectData()(HomeScreen);
