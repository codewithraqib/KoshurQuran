import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';
import {colors, dimensions} from '../theme';

const PBText = props => {
  return Platform.OS === 'android' ? (
    <Text
      style={[
        {
          ...styles.textStyle,
          ...(props.primary ? styles.textPrimary : {}),
          ...(props.secondary ? styles.textSecondary : {}),
          ...(props.center ? styles.textCenter : {}),
          ...(props.dark ? styles.textDark : {}),
          ...(props.light ? styles.textLight : {}),
          ...(props.bold ? styles.textBold : {}),
          ...(props.black ? styles.textBlack : {}),
          ...(props.link ? styles.link : {}),
          ...(props.white ? styles.textWhite : {}),
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  ) : (
    <View style={[styles.viewStyle, props.primary ? styles.textPrimary : {}]}>
      <Text
        style={[
          {
            ...styles.textStyle,
            ...(props.primary ? styles.textPrimary : {}),
            ...(props.secondary ? styles.textSecondary : {}),
            ...(props.center ? styles.textCenter : {}),
            ...(props.dark ? styles.textDark : {}),
            ...(props.bold ? styles.textBold : {}),
            ...(props.black ? styles.textBlack : {}),
            ...(props.white ? styles.textWhite : {}),
          },
          props.style,
        ]}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#464647',
    fontSize: dimensions.vw * 100 > 220 ? 14 : 13,
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Regular'
        : 'AvenirNextLTPro-Regular',
  },
  textBold: {
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Demi'
        : 'AvenirNextLTPro-Demi',

    // ? "AvenirNextLTPro-Bold"
    // : "AvenirNextLTPro-Bold",
    // fontWeight: "bold",
  },
  textBlack: {
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Bold'
        : 'AvenirNextLTPro-Bold',
  },
  textPrimary: {
    color: '#151a2e',
  },
  textSecondary: {
    color: '#E46868',
  },
  textDark: {
    color: '#464647',
  },
  textLight: {
    color: '#A4A4A6',
  },
  textWhite: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
  viewStyle: {
    marginTop: 3,
  },
  link: {
    color: colors.secondaryBG,
  },
});

export default PBText;
