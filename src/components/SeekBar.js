import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";

// var Slider = require("react-native-slider");

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

class SeekBar extends Component {
  constructor(props) {
    super(props);
  }

  pad = (n, width, z = 0) => {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  minutesAndSeconds = (position) => [
    this.pad(Math.floor(position / 60), 2),
    this.pad(position % 60, 2),
  ];

  render() {
    const elapsed = this.minutesAndSeconds(this.props.currentPosition);
    const remaining = this.minutesAndSeconds(
      this.props.trackLength - this.props.currentPosition
    );
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
          <View style={{ flex: 1 }} />
          <Text style={[styles.text, { width: 40 }]}>
            {this.props.trackLength > 1 &&
              "-" + remaining[0] + ":" + remaining[1]}
          </Text>
        </View>
        <Slider
          maximumValue={Math.max(
            this.props.trackLength,
            1,
            this.props.currentPosition + 1
          )}
          onSlidingStart={this.props.onSlidingStart}
          onSlidingComplete={this.props.onSeek}
          value={this.props.currentPosition}
          style={styles.slider}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
      </View>
    );
  }
}

// const SeekBar = ({ trackLength, currentPosition, onSeek, onSlidingStart }) => {
//   const elapsed = minutesAndSeconds(currentPosition);
//   const remaining = minutesAndSeconds(trackLength - currentPosition);
//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: "row" }}>
//         <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
//         <View style={{ flex: 1 }} />
//         <Text style={[styles.text, { width: 40 }]}>
//           {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
//         </Text>
//       </View>
//       <Slider
//         maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
//         onSlidingStart={onSlidingStart}
//         onSlidingComplete={onSeek}
//         value={currentPosition}
//         style={styles.slider}
//         minimumTrackTintColor="#fff"
//         maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
//         thumbStyle={styles.thumb}
//         trackStyle={styles.track}
//       />
//     </View>
//   );
// };

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  text: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    textAlign: "center",
  },
});
