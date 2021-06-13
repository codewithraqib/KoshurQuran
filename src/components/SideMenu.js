import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Platform,
  Image as Img,
  StyleSheet,
  AppState,
  Switch,
  Linking,
  ImageBackground,
} from "react-native";

import { connectData } from "src/redux";
import { Navigation } from "react-native-navigation";
import {
  ALARM_SCREEN,
  BOOKMARKS_SCREEN,
  BOOK_LIST_SCREEN,
  DONATION_SCREEN,
  HOME_SCREEN,
  INFO_SCREEN,
  ISLAMIC_DATE_SCREEN,
  OTHER_AUDIO_SCREEN,
  OUR_COMPANY_SCREEN,
  QIBLA_SCREEN,
  SCHOLAR_SCREEN,
} from "../navigation/Screens";
import PBText from "./PBText";
import CommonService from "src/services/commonService";
import PBTouchable from "./PBTouchable";
import { colors, dimensions } from "../theme";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Image from "react-native-scalable-image";
import SoundPlayer from "react-native-sound-player";
import { Neomorph } from "react-native-neomorph-shadows";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PBModal from "./PBModal";
import WebView from "react-native-webview";
// import PBContactModal from './PBContactModal';

const menuItems = [
  {
    id: "4",
    name: "Bookmarks",
    src: require("../assets/images/books.png"),
    screen: BOOKMARKS_SCREEN,
    title: "islamic",
  },
  {
    id: "0",
    name: "Audios",
    src: require("../assets/images/audio.png"),
    screen: OTHER_AUDIO_SCREEN,
    title: "audios",
  },
  {
    id: "1",
    name: "Videos",
    src: require("../assets/images/videos.png"),
    screen: SCHOLAR_SCREEN,
    title: "youtube videos",
  },
  {
    id: "2",
    name: "Books",
    src: require("../assets/images/books.png"),
    screen: BOOK_LIST_SCREEN,
    title: "islamic",
  },
  // {
  //   id: "6",
  //   name: "Donate and help",
  //   src: require("../assets/images/dollar.png"),
  //   screen: DONATION_SCREEN,
  //   title: "donate",
  // },
  {
    id: "7",
    name: "Privacy policy & Terms",
    src: require("../assets/images/privacy.png"),
    screen: INFO_SCREEN,
    title: "privacy",
  },
];

const MenuItem = (props) => {
  return (
    <PBTouchable onPress={props.onMenuItemPresed}>
      <View style={styles.menuItem}>
        <View style={styles.iconContainer}>
          <Img height={18} style={styles.icon} source={props.icon} />
          {/* <FontAwesome5Icon
            style={{ fontSize: 24, color: "#151a2e" }}
            name={props.icon}
          /> */}
        </View>
        <View style={styles.labelContainer}>
          <PBText style={styles.label} dark={true}>
            {props.label}
          </PBText>
        </View>
      </View>
    </PBTouchable>
  );
};

const WelcomeContainer = (props) => {
  console.log("Props in welcome screen", props);
  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground
        style={{
          width: dimensions.vw * 100,
          // flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          height: dimensions.vh * 20,
        }}
        // source={{ uri: "https://source.unsplash.com/1024x768/?flowers" }}
        source={require("../assets/images/side_menu_image.jpeg")}
      >
        {/* <View style={styles.welcomeAndLogut}>
          <View style={styles.welcomeImageContainer}>
            <View style={styles.userNameContainer}> */}
        <View
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
            // justifyContent: "center",
          }}
        >
          <PBText
            bold={true}
            center={true}
            white={true}
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Quran Tarjam - Kashur
          </PBText>
        </View>
        {/* </View>
          </View>
        </View> */}
      </ImageBackground>
    </View>
  );
};

class SideMenu extends PureComponent {
  static displayName = "SideMenu";
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
      isEnabled: true,
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log("App State: " + nextAppState);
    this.setState({ appState: nextAppState });
  };

  // componentDidUpdate() {
  //   // this.webview.injectJavaScript('document.getElementById("audio").pause();');
  // }

  onMenuItemPresed = (mItem) => {
    Navigation.mergeOptions("leftSideDrawer", {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });

    CommonService.goToScreenHideTopBar("AppRoot", mItem.screen);
  };

  toggleSwitch = (val) => {
    if (this.state.isEnabled) {
      console.warn("Sound stopped");
      // SoundPlayer.stop();
      this.webview.injectJavaScript(
        'document.getElementById("audio").pause();'
      );
      this.setState({ isEnabled: !this.state.isEnabled });
    } else {
      console.warn("Sound resumed");
      // SoundPlayer.playUrl(
      //   'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
      // );
      this.webview.injectJavaScript('document.getElementById("audio").play();');
      this.setState({ isEnabled: !this.state.isEnabled });
    }
  };

  renderMenuScroll = () => {
    return (
      <ScrollView style={{ maxHeight: dimensions.vh * 75 }}>
        <WelcomeContainer
          //   gotoProfileAndOpenCamera={this.gotoProfileAndOpenCamera}
          //   gotoEditProfile={this.gotoEditProfile}
          //   welcomeText={'Name'}
          loginData={this.props.data.loginData}
          isEnabled={this.state.isEnabled}
          toggleSwitch={(val) => this.toggleSwitch(val)}
          showLogout={() => this.setState({ showLogoutModal: true })}
          // welcomeState={this.state}
        />
        {/* <View style={styles.pinkBox} /> */}
        <View style={styles.menuContainer}>
          {menuItems.map(
            (item, key) => (
              // item.id != 9 ||
              // !this.props.data.loginData ? (
              <MenuItem
                key={key}
                id={item.id}
                icon={item.src}
                label={item.name}
                onMenuItemPresed={() => this.onMenuItemPresed(item)}
              />
            )
            // ) : null,
          )}
        </View>
      </ScrollView>
    );
  };

  renderSocialIcons = () => {
    return (
      <View style={styles.socialIconContainer}>
        <View style={styles.socialIcon}>
          <PBTouchable
            onPress={() =>
              Linking.openURL("https://www.facebook.com/officialraqib")
            }
          >
            <View>
              {/* <FontAwesome5Icon
                style={{ fontSize: 26, color: "#151a2e" }}
                name="facebook"
              /> */}
              <Img
                source={require("../assets/images/facebook.png")}
                style={{ height: 25, width: 25 }}
              />
            </View>
          </PBTouchable>
        </View>

        <View style={styles.socialIcon}>
          <PBTouchable
            onPress={() =>
              Linking.openURL(
                "whatsapp://send?text=Quran&phone=" + 919596263439
              )
            }
          >
            <View>
              {/* <FontAwesome5Icon
                style={{ fontSize: 26, color: "#151a2e" }}
                name="whatsapp"
              /> */}
              <Img
                source={require("../assets/images/whatsapp.png")}
                style={{ height: 25, width: 28 }}
              />
            </View>
          </PBTouchable>
        </View>

        <View style={styles.socialIcon}>
          <PBTouchable
            onPress={() => Linking.openURL("https://twitter.com/raqibspeaks")}
          >
            <View>
              {/* <FontAwesome5Icon
                style={{ fontSize: 26, color: "#151a2e" }}
                name="twitter"
              /> */}
              <Img
                source={require("../assets/images/twitter128.png")}
                style={{ height: 25, width: 25 }}
              />
            </View>
          </PBTouchable>
        </View>

        {/* <View style={styles.socialIcon}>
          <PBTouchable>
            <View>
              <FontAwesome5Icon
                style={{ fontSize: 26, color: "#151a2e" }}
                name="youtube"
              />
            </View>
          </PBTouchable>
        </View> */}
      </View>
    );
  };

  logout = () => {
    console.log("Logout called");
    this.setState({ showLogoutModal: false });

    Navigation.mergeOptions("leftSideDrawer", {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
    setTimeout(() => {
      CommonService.goToScreenHideTopBar("AppRoot", HOME_SCREEN);
    }, 100);
    CommonService.logout();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>{this.renderMenuScroll()}</View>
        <View style={{ marginTop: 20 }}>{this.renderSocialIcons()}</View>
        <View style={[styles.footerBgImgContainer]}>
          <View style={styles.footerTextContainer}>
            <PBText white={true} bold={true} style={{ fontSize: 11 }}>
              App Version : 0.1 (1001)
            </PBText>
          </View>
          <Img
            style={[styles.footerBgImg]}
            source={require("../assets/bgs/bg-inner-bottom.png")}
          />
        </View>

        <PBModal
          showModal={this.state.showLogoutModal}
          titleText="Do you really want to logoout!"
          showButton1={true}
          button1Text="No, Stay"
          button1Press={() => {
            this.setState({ showLogoutModal: false });
          }}
          showButton2={true}
          button2Text="Yes, Go on!"
          button2Press={this.logout}
        />

        {/* <View>
          <WebView
            ref={ref => (this.webview = ref)}
            originWhitelist={['*']}
            mediaPlaybackRequiresUserAction={false} // Allow autoplay
            useWebKit={true}
            style={{
              backgroundColor: '#00f',
              position: 'absolute',
              maxHeight: 0,
            }}
            source={{
              html:
                '<audio id="audio" loop> <source src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3" type="audio/mp3" /> </audio>',
            }}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: "space-between",
    borderRadius: 20,
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // marginBottom:-10,
    // paddingBottom:15
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    height: dimensions.vh * 20,
  },
  welcomeImageContainer: {
    padding: 15,
    paddingTop: 15,
    paddingLeft: 20,
    marginBottom: 0,
    flexDirection: "row",
    // backgroundColor: '#F00',
  },

  welcomeAndLogut: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 0,
    backgroundColor: "#ccc",
  },
  welcomeImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    color: "#FDE9E0",
    fontSize: 17,
  },
  userNameContainer: {
    justifyContent: "center",
  },
  pinkBox: {
    backgroundColor: "#FDE9E0",
    height: dimensions.vh * 8,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  menuContainer: {
    // height:dimensions.vh*40,
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  menuHeader: {
    paddingTop: 25,
    paddingLeft: 10,
  },
  menuHeaderText: {
    fontSize: 14,
  },
  menuItem: {
    width: "100%",
    flexDirection: "row",
    height: 42,
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    color: "#151a2e",
  },
  offer: {
    position: "absolute",
    right: 25,
    top: 5,
    alignItems: "center",
    paddingTop: 5,
  },
  footerContainer: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerImage: {
    width: 50,
    height: 50,
    marginLeft: 2,
    marginRight: 2,
  },
  footerBg: {
    width: "100%",
    height: 80,
    justifyContent: "center",
  },
  footerBgImgContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    // backgroundColor:"blue"
  },
  footerBgImg: {
    width: "100%",
    height: 100,
    resizeMode: "stretch",
    position: "relative",
    bottom: 0,
    borderBottomRightRadius: 20,
  },

  footerTextContainer: {
    position: "absolute",
    bottom: 20,
    zIndex: 100,
    left: 20,
  },

  contactRow: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  contactIconContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconItem: {
    width: (dimensions.vw * 100) / 4,
    // height:(dimensions.vw*100)/4,
    alignItems: "center",
  },
  contactIcon: {
    marginBottom: 10,
  },
  iconItemInner: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    fontFamily:
      Platform.OS === "android"
        ? "AvenirNextLTPro-Regular"
        : "AvenirNextLTPro-Regular",
  },
  footerBold: {
    fontFamily:
      Platform.OS === "android"
        ? "AvenirNextLTPro-Demi"
        : "AvenirNextLTPro-Demi",
  },
  socialIcon: {
    // marginHorizontal: 14,
    padding: 14,
  },
  socialIconContainer: {
    position: "absolute",
    bottom: 85,
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  musicButton: {
    flexDirection: "row",
    position: "absolute",
    top: 15,
    right: 15,
    alignItems: "center",
  },
});

export default connectData()(SideMenu);
