import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Image from "react-native-scalable-image";

import PBText from "./PBText";
import { dimensions, colors } from "../theme";
import PBTouchable from "./PBTouchable";
import CommonService from "../services/commonService";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { NeomorphBlur } from "react-native-neomorph-shadows";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CarpoolHeader = ({
  menuIcon,
  menuIconStyle,
  backIcon,
  backIconColor,
  leftIcon,
  rightIcon,
  rightIconLabel,
  rightIconLabelStyle,
  rightIcon2,
  label,
  labelBold,
  labelDark,
  onLefIconPress,
  onRightIconPress,
  onRightIcon2Press,
  componentId,
  leftIconColor,
  rightIconColor,
  leftIconHeight,
  rightIconHeight,
  rightIconStyle,
  rightIconStyle2,
  noSpace,
  showHomeIcon,
  homeIconColor,
  menuHeight,
  middleIcon,
  middleIconImage,
  middleIconPress,
  labelAndMiddleIcon,
  labelAndMiddleIconText,
  labelAndMiddleIconTextColor,
  labelAndMiddleIconImage,
  notificationDot,
}) => {
  return (
    <View style={styles.header}>
      {label ? (
        <View style={styles.label}>
          {/* {console.log("Component Id", componentId)} */}
          <PBText
            style={{ color: labelDark ? "#464647" : "#fff", fontSize: 19 }}
          >
            {label}
            {noSpace ? "" : " "}
          </PBText>
          {labelBold ? (
            <PBText
              bold={true}
              style={{ color: labelDark ? "#464647" : "#fff", fontSize: 19 }}
            >
              {labelBold}
            </PBText>
          ) : null}
        </View>
      ) : // : middleIcon ? (
      //   <View style={{flexDirection:"row", justifyContent:"center"}}>

      //       <Image
      //         style={{ tintColor: leftIconColor }}
      //         height={25}
      //         source={require("../assets/carpool/kupos-com.png")}
      //       />

      //   </View>
      // )
      null}
      {menuIcon ? (
        <View style={[styles.homeMenu, { marginLeft: -15, zIndex: 9 }]}>
          {/* <PBTouchable> */}
          <PBTouchable onPress={CommonService.openCloserMenu}>
            <View
              style={[
                styles.homeMenuInnerMenu,
                { marginLeft: 0 },
                menuIconStyle,
              ]}
            >
              <Image
                style={{ tintColor: leftIconColor }}
                height={menuHeight ? menuHeight : 30}
                source={require("../assets/images/menu.png")}
              />
              {/* <FontAwesome5Icon
                style={{ fontSize: 18, color: leftIconColor }}
                name={"bars"}
              /> */}
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {backIcon ? (
        // <NeomorphBlur
        //   style={{
        //     shadowRadius: 9,
        //     borderRadius: 15,
        //     backgroundColor: colors.primaryColor,
        //     width: 30,
        //     height: 30,
        //     marginBottom: 5,
        //   }}
        // >
        //   <PBTouchable onPress={() => CommonService.goBack(componentId)}>
        //     <View
        //       style={{
        //         height: "100%",
        //         width: "100%",
        //         flexDirection: "row",
        //         alignItems: "center",
        //         justifyContent: "center",
        //       }}
        //     >
        //       <FontAwesome5Icon
        //         style={{ color: "#fff", fontSize: 16 }}
        //         name={"angle-left"}
        //       />
        //     </View>
        //   </PBTouchable>
        // </NeomorphBlur>
        <View style={[styles.homeMenu, { marginLeft: -5, zIndex: 9 }]}>
          <PBTouchable onPress={() => CommonService.goBack(componentId)}>
            <View style={[styles.homeMenuInner, styles.backIconInner]}>
              <Image
                height={18}
                source={require("../assets/images/left_icon.png")}
                style={{ tintColor: backIconColor || "#fff" }}
              />
            </View>
          </PBTouchable>
        </View>
      ) : // <View style={[styles.homeMenu, {marginLeft: -5, zIndex: 9}]}>
      //   <PBTouchable onPress={() => CommonService.goBack(componentId)}>
      //     <View style={[styles.homeMenuInner, styles.backIconInner]}>
      //       <Image
      //         height={20}
      //         source={require('../assets/icons/icon_back_arrow.png')}
      //         style={{tintColor: backIconColor}}
      //       />
      //     </View>
      //   </PBTouchable>
      // </View>
      null}
      {leftIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={onLefIconPress}>
            <View style={styles.homeMenuInner}>
              <Image
                style={{ tintColor: leftIconColor }}
                height={leftIconHeight ? leftIconHeight : 25}
                source={leftIcon}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {middleIcon ? (
        <PBTouchable onPress={middleIconPress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "60%",
              flex: 1,
              position: "absolute",
              top: 0,
              left: 20,
              marginLeft: "16%",
            }}
          >
            <Image
              // style={{marginLeft:dimensions.vw*4}}
              height={25}
              source={middleIconImage}
            />
          </View>
        </PBTouchable>
      ) : null}

      {labelAndMiddleIcon ? (
        <PBTouchable onPress={middleIconPress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "45%",
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              alignItems: "center",
              // backgroundColor: '#f00',
              marginLeft: dimensions.vw * 30,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 0 }}>
                <Image
                  // style={{ tintColor: labelAndMiddleIconTextColor }}
                  height={25}
                  source={labelAndMiddleIconImage}
                />
              </View>
              <PBText
                style={{ color: labelAndMiddleIconTextColor, fontSize: 12 }}
              >
                {labelAndMiddleIconText}
              </PBText>
            </View>
          </View>
        </PBTouchable>
      ) : null}
      {rightIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={onRightIconPress}>
            <View style={[styles.homeMenuInner, rightIconStyle]}>
              {/* <Image
                style={{tintColor: rightIconColor}}
                height={rightIconHeight ? rightIconHeight : 25}
                source={rightIcon}
              /> */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {rightIconLabel ? (
                  <PBText style={rightIconLabelStyle}>{rightIconLabel}</PBText>
                ) : null}
                {/* <FontAwesome5Icon style={rightIconStyle} name={rightIcon} /> */}
                <Image
                  style={{ tintColor: rightIconColor }}
                  height={rightIconHeight ? rightIconHeight : 25}
                  source={rightIcon}
                />
              </View>

              {notificationDot ? (
                <View
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 0,
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: colors.secondaryBG,
                  }}
                />
              ) : null}
            </View>
          </PBTouchable>
        </View>
      ) : null}

      {showHomeIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={() => CommonService.goToHome(componentId)}>
            <View style={[styles.homeMenuInner, rightIconStyle]}>
              <Image
                style={{
                  tintColor: homeIconColor ? homeIconColor : "#464647",
                  marginTop: -8,
                }}
                height={rightIconHeight ? rightIconHeight : dimensions.vw * 5.5}
                source={require("../assets/icons/home.png")}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: dimensions.vw * 100,
    height: 50,
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    top: -5,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 50,
    marginTop: Platform.OS === "ios" ? null : 30,
    paddingTop: 5,
    // backgroundColor: '#ffaaee',
    alignItems: "center",
  },
  homeMenu: {
    marginTop: -4,
  },
  homeMenuInnerMenu: {
    padding: 5,
    paddingLeft: 6,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: -6,
  },
  backIconInner: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: -1,
    paddingVertical: 10,
    marginTop: -5,
  },
  homeMenuInner: {
    padding: 5,
    paddingHorizontal: 9,
    paddingRight: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default CarpoolHeader;
