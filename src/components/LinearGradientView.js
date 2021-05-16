import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors, dimensions} from '../theme';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientView = props => {
  // console.log('Props in linear grad are', props);
  return props.horizontal ? (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      // locations={[0, 0.5, 0.6]}
      colors={props.colors ? props.colors : ['#4c669f', '#3b5998', '#192f6a']}
      style={[
        {
          ...styles.linearGradient,
          padding: props.padding ? props.padding : 15,
        },
        props.style,
      ]}>
      {!props.hideImage ? (
        <Image
          source={
            props.image
              ? props.image
              : require('../assets/bgs/retro-alarm-clock.png')
          }
          style={props.smallIcon ? styles.smallImage : styles.image}
        />
      ) : null}
      {props.children}
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={props.colors ? props.colors : ['#4c669f', '#3b5998', '#192f6a']}
      // locations={[0, 0.5, 0.6]}
      style={[
        {
          ...styles.linearGradient,
          padding: props.padding ? props.padding : 15,
        },
        props.style,
      ]}>
      {!props.hideImage ? (
        <Image
          source={
            props.image
              ? props.image
              : require('../assets/bgs/retro-alarm-clock.png')
          }
          style={props.smallIcon ? styles.smallImage : styles.image}
        />
      ) : null}
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // flex:{
  //   flex: 1,
  // },
  mainBgImg: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 100,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  coloredBG: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 150,
    backgroundColor: '#151a2e', //192038
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },

  linearGradient: {
    // flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: dimensions.vw * 5,
    overflow: 'hidden',
    // elevation: Platform.OS === 'android' ? 6 : 2,
    // shadowColor: '#000',
    // shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.4,
    // shadowOffset:
    //   Platform.OS === 'android' ? {width: 3, height: 3} : {width: 0, height: 0},
  },
  image: {
    flex: 1,
    width: '60%',
    height: '60%',
    // flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    position: 'absolute',
    top: '15%',
    right: '-20%',
    bottom: 0,
    // right: 0,
    opacity: 0.5,
  },

  smallImage: {
    flex: 1,
    width: '80%',
    height: '80%',
    // flex: 1,
    resizeMode: 'contain',
    // justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    right: '-30%',
    bottom: 0,
    // right: 0,
    opacity: 0.9,
  },
});

export default LinearGradientView;
