// @flow

import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CommonService from "src/services/commonService";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.headerBackgroundColor,
          this.props.style,
        ]}
      >
        <TouchableOpacity onPress={CommonService.openCloserMenu}>
          <Image
            style={styles.button}
            source={require("../assets/icons/ios-menu.png")}
          />
        </TouchableOpacity>
        <Text onPress={this.props.onMessagePress} style={styles.message}>
          {this.props.message.toUpperCase()}
        </Text>
        <TouchableOpacity onPress={this.props.onRightIconPress}>
          <Image
            style={styles.button}
            source={require("../assets/icons/book.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 35,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    backgroundColor: "#000",
  },
  message: {
    flex: 1,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.72)",
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 3,
  },
  button: {
    opacity: 0.72,
    height: 24,
    width: 24,
    tintColor: "#fff",
  },
});
