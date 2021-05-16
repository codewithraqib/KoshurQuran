import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TrackDetails = ({
  title,
  artist,
  audioUrl,
  onLeftButtonPress,
  onRightButtonPress,
  onTitlePress,
  onArtistPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onLeftButtonPress(audioUrl)}>
      <Image
        style={styles.button}
        source={require("../assets/icons/download.png")}
      />
    </TouchableOpacity>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>
        {title}
      </Text>
      <Text style={styles.artist} onPress={onArtistPress}>
        {artist}
      </Text>
    </View>
    <TouchableOpacity onPress={onRightButtonPress}>
      <View style={styles.moreButton}>
        <Image
          style={styles.button}
          source={require("../assets/icons/more-circle.png")}
        />
      </View>
    </TouchableOpacity>
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artist: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  moreButton: {
    // borderColor: "rgb(255, 255, 255)",
    // borderWidth: 2,
    opacity: 0.72,
    // borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    tintColor: "#fff",
  },
  moreButtonIcon: {
    opacity: 0.72,
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
});
