import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import Modal from "react-native-modal";

import colors from "../theme/colors";
import PBText from "./PBText";

const Loader = (props) => {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.2}
      style={{ margin: 0 }}
      isVisible={props.loading}
    >
      <View style={[styles.container, styles.horizontal]}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primaryBG} />
          <PBText style={{ marginLeft: 10 }}>Loading Surah...</PBText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.77,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 3,
  },
});

export default Loader;
