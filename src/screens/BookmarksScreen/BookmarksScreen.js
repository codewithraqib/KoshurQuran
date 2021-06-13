// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { colors, commonStyles, dimensions } from "src/theme";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import PBModal from "src/components/PBModal";
import { connectData } from "src/redux";
import PBText from "src/components/PBText";
import PBTouchable from "src/components/PBTouchable";
import CommonService from "src/services/commonService";
import { SURAH_PLAY_SCREEN, YOUTUBE_SCREEN } from "src/navigation";
import { Neomorph } from "react-native-neomorph-shadows";
import { ScrollView } from "react-native-gesture-handler";
import storageService from "src/services/storageService";
import Header from "src/components/Header";
import Toast from "react-native-easy-toast";

class BookmarksScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks = () => {
    storageService.getItem("bookmarks").then((bookmarks) => {
      let parsedData = JSON.parse(bookmarks);

      if (bookmarks && bookmarks.length > 0) {
        this.setState({ bookmarks: parsedData });
      }
    });
  };

  goToScreen = (bookmark) => {
    this.props.setCurrentSurah({
      surah: bookmark.surah,
      quranIndex: true,
      position: bookmark.position,
    });
    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      SURAH_PLAY_SCREEN
    );
  };

  removeBookmark = (bookmark) => {
    let newBookmarks = this.state.bookmarks.filter((val) => {
      return val.id !== bookmark.id;
    });

    if (storageService.setItem("bookmarks", JSON.stringify(newBookmarks))) {
      this.refs.toast.show("Bookmark removed!");
      this.getBookmarks();
    }
  };

  renderBookmark = (bookmark, index) => {
    console.log("Bookmark is-----", bookmark);
    var minutes = CommonService.preZero(Math.floor(bookmark.position / 60));
    var seconds = CommonService.preZero(bookmark.position - minutes * 60);
    return (
      <PBTouchable onPress={() => this.goToScreen(bookmark)}>
        <Neomorph
          swapShadows
          style={{
            shadowRadius: 5,
            borderRadius: 6,
            backgroundColor: "#151a30",
            width: dimensions.vw * 90,
            height: 45,
            marginVertical: 10,
            padding: 10,
            paddingHorizontal: 5,
            justifyContent: "center",
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <PBText white={true} style={{ marginLeft: 10 }}>
                  {`${bookmark.surah.id})` || "title"}
                </PBText>
                <PBText white={true} style={{ marginLeft: 10 }}>
                  {bookmark.surah.title || "title"}
                </PBText>
              </View>

              <PBText
                white={true}
                style={{ marginLeft: 10, alignSelf: "flex-end" }}
              >
                at: {`${minutes}:${seconds}`}
              </PBText>
            </View>

            <TouchableOpacity onPress={() => this.removeBookmark(bookmark)}>
              <Image
                style={styles.button}
                source={require("../../assets/icons/bookmarked.png")}
              />
            </TouchableOpacity>
          </View>
        </Neomorph>
      </PBTouchable>
    );
  };

  render() {
    // console.log("bookmarks in render ---------", this.state.bookmarks);
    return (
      <View style={styles.flex}>
        <FullQuizBG color={true} type={1} />

        <CarpoolHeader
          menuIcon={false}
          backIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          label="Bookmarks"
          labelBold=""
        />

        <ScrollView>
          <View style={{ marginHorizontal: dimensions.vw * 5 }}>
            {this.state.bookmarks &&
              this.state.bookmarks
                .sort((a, b) => a.id - b.id)
                .map((bookmark, index) => {
                  return this.renderBookmark(bookmark, index);
                })}
          </View>
        </ScrollView>

        <Toast ref="toast" />
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
  button: {
    opacity: 1,
    width: 22,
    height: 22,
    tintColor: "#fff",
    padding: 10,
  },
});

export default connectData()(BookmarksScreen);
