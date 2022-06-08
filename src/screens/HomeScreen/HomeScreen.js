import React, { PureComponent } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { connectData } from "src/redux";
import { ScrollView } from "react-native-gesture-handler";
import PBText from "src/components/PBText";
import Header from "src/components/Header";
import { colors, dimensions } from "src/theme";
import CommonService from "src/services/commonService";
import { BOOKMARKS_SCREEN, SURAH_PLAY_SCREEN } from "src/navigation";
import storageService from "src/services/storageService";
import { WHITE } from "src/constants/Colors";

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

  renderListItem = (item, key) => {

    console.log("Testing surah-----", item)

    const audio = item.item;
    return (
      <TouchableOpacity key={item.index} onPress={() => this.goToScreen(surah)}>
        <View key={key} style={styles.listItem}>
          <View style={styles.postNumber}>
            <PBText white={true} style={{ fontSize: 12}}>
              {audio.AudioNumber ? audio.AudioNumber : audio.id}
            </PBText>
          </View>
          <View style={styles.postText}>
            <PBText white center>{audio.PostTitle}</PBText>
          </View>
          
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
        <StatusBar
          translucent
          backgroundColor={colors.primaryBG}
          barStyle="light-content"
        />
        <Header
          componentId={this.props.componentId}
          screenName={'Maulana Faizul Waheed'}
          showLeftIcon={true}
          leftIconSize={26}
          showRightIcon={true}
          leftIcon={'more-vert'}
          rightIcon={'chevron-right'}
          onLeftIconClick={() => CommonService.openCloserMenu()}
          // onRightIconClick={() => CommonService.goBack()}
          backgroundColor={colors.primaryBG}
          iconsColor={WHITE}
        />
        {this.state.tracks ?
            <FlatList
              data={this.state.tracks}
              renderItem={this.renderListItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
        : null}
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
  head: { height: 40, backgroundColor: colors.primaryBG },
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
    alignItems: "center",
    minHeight: dimensions.vh * 12,
    // maxWidth:dimensions.vw*30,
    minWidth: dimensions.vw*92/2,
    marginLeft: dimensions.vw*2,
    marginRight: dimensions.vw*2,
    backgroundColor: colors.thirdColor,
    marginVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
    position:"relative"
  },
  postNumber:{
    position:"absolute",
    top: 0,
    left: 0,
    minWidth:40,
    minHeight: 40,
    backgroundColor:colors.black,
    color:"white",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderBottomRightRadius:30,
    borderTopLeftRadius:6,
  },
  postText:{
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"center", 
    flex: 1, 
    height: "100%"
  }
});

export default connectData()(HomeScreen);
