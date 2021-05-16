// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import { colors, commonStyles, dimensions } from "src/theme";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import PBModal from "src/components/PBModal";
import { connectData } from "src/redux";
import PBText from "src/components/PBText";
import PBTouchable from "src/components/PBTouchable";
import CommonService from "src/services/commonService";
import { YOUTUBE_SCREEN } from "src/navigation";
import { Neomorph } from "react-native-neomorph-shadows";
import { ScrollView } from "react-native-gesture-handler";

class YoutubeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scholars: [
        {
          id: 1,
          name: "Mufti Ayoub Sb",
          link: "https://youtube.com/c/MuftiAyoubSahab",
          image: require("../../assets/images/youtube.png"),
        },
        {
          id: 1,
          name: "Muslim Kashmir",
          link:
            "https://www.youtube.com/channel/UCRB8M340v7fNB7HIeSmhi6g/videos",
          image: require("../../assets/images/youtube.png"),
        },
        {
          id: 1,
          name: "Scholars Of Kashmir",
          link: "https://www.youtube.com/channel/UCGAQmSW8FYO_Db76Ie6kQjQ",
          image: require("../../assets/images/youtube.png"),
        },
        {
          id: 1,
          name: "IRPC",
          link: "https://www.youtube.com/channel/UCwANQXRT--41DvRPmwbu28A",
          image: require("../../assets/images/youtube.png"),
        },
        {
          id: 1,
          name: "Muslimeen",
          link: "https://www.youtube.com/channel/UCjbtZ5g1IzAfIkM2BqpeGMw",
          image: require("../../assets/images/youtube.png"),
        },
      ],
    };
  }

  componentDidMount() {}

  goToScreen = (link) => {
    CommonService.goToScreenHideTopBar(this.props.componentId, YOUTUBE_SCREEN, {
      youtube_link: link,
    });
  };

  renderScholar = (scholar, index) => {
    return (
      <Neomorph
        swapShadows
        style={{
          shadowRadius: 5,
          borderRadius: 6,
          backgroundColor: "#151a30",
          width: dimensions.vw * 90,
          height: 60,
          marginVertical: 10,
          padding: 10,
          justifyContent: "center",
        }}
        key={index}
      >
        <PBTouchable onPress={() => this.goToScreen(scholar.link)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={scholar.image}
              style={{ height: 30, width: 40, borderRadius: 10 }}
            />
            <PBText bold={true} white={true} style={{ marginLeft: 10 }}>
              {scholar.name}
            </PBText>
          </View>
        </PBTouchable>
      </Neomorph>
    );
  };

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
          label="Youtube"
          labelBold="Channels "
        />

        <ScrollView>
          <View style={{ marginHorizontal: dimensions.vw * 5 }}>
            {this.state.scholars.map((scholar, index) => {
              return this.renderScholar(scholar, index);
            })}
          </View>
        </ScrollView>

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
