import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PBTouchable from "./PBTouchable";

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      paused,
      shuffleOn,
      repeatOn,
      onPressPlay,
      onPressPause,
      onBack,
      onForward,
      onPressShuffle,
      onPressRepeat,
      forwardDisabled,
    } = this.props;
    return (
      <View style={styles.container}>
        <PBTouchable activeOpacity={0.0} onPress={onPressShuffle}>
          <Image
            style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
            source={require("../assets/icons/shuffle.png")}
          />
        </PBTouchable>
        <View style={{ width: 40 }} />
        <PBTouchable onPress={onBack}>
          <Image
            style={{ height: 42, width: 42, tintColor: "#fff" }}
            source={require("../assets/icons/prev.png")}
          />
        </PBTouchable>
        <View style={{ width: 20 }} />
        {!paused ? (
          <PBTouchable onPress={onPressPause}>
            <View style={styles.playButton}>
              <Image
                style={{ height: 64, width: 64, tintColor: "#fff" }}
                source={require("../assets/icons/pause.png")}
              />
            </View>
          </PBTouchable>
        ) : (
          <PBTouchable onPress={onPressPlay}>
            <View style={styles.playButton}>
              <Image
                style={{ height: 64, width: 64, tintColor: "#fff" }}
                source={require("../assets/icons/play.png")}
              />
            </View>
          </PBTouchable>
        )}
        <View style={{ width: 20 }} />
        <PBTouchable onPress={onForward} disabled={forwardDisabled}>
          <Image
            style={[
              forwardDisabled && {
                opacity: 0.3,
              },
              { height: 42, width: 42, tintColor: "#fff" },
            ]}
            source={require("../assets/icons/next.png")}
          />
        </PBTouchable>
        <View style={{ width: 40 }} />
        <PBTouchable activeOpacity={0.0} onPress={onPressRepeat}>
          <Image
            style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
            source={require("../assets/icons/repeat.png")}
          />
        </PBTouchable>
      </View>
    );
  }
}

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryControl: {
    height: 24,
    width: 24,
    tintColor: "#fff",
  },
  off: {
    opacity: 0.3,
  },
});
