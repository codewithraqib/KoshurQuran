import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { colors, dimensions } from "../theme";

const FullQuizBG = (props) => {
  return props.color ? (
    <View style={styles.coloredBG} />
  ) : (
    <View style={styles.coloredBG} />
    // <Image
    //   source={
    //     props.type == 2
    //       ? require('../assets/images/back2.jpg')
    //       : require('../assets/images/back5.jpeg')
    //   }
    //   style={[styles.mainBgImg, props.style]}
    // />
  );
};

const styles = StyleSheet.create({
  // flex:{
  //   flex: 1,
  // },
  mainBgImg: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 100,
    resizeMode: "stretch",
    position: "absolute",
    top: 0,
    left: 0,
  },
  coloredBG: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 150,
    backgroundColor: "rgb(4,4,4)", // "#151a2e", //192038
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
});

export default FullQuizBG;
