import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BLACK, WHITE} from '../constants/Colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {FONT_SIZE_SMALL} from '../constants/Dimens';
import { colors, dimensions } from 'src/theme';
const STATUS_BAR_HEIGHT = getStatusBarHeight();

const Header = props => {
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  return (
    <View
      style={[
        props.backgroundColor
          ? {backgroundColor: props.backgroundColor}
          : {backgroundColor: BLACK},
        styles.top,
      ]}>

        <StatusBar
          translucent
          backgroundColor={colors.primaryBG}
          barStyle="light-content"
        />
        <View style={{flex: 1, minWidth: dimensions.vw*33, flexDirection:"row", alignItems:"center",}}>
          {props.showLeftIcon ? (
            <Icon
              name={props.leftIcon ? props.leftIcon : 'chevron-left'}
              color={props.iconsColor ? props.iconsColor : WHITE}
              size={
                props.leftIconSize ? props.leftIconSize : STATUS_BAR_HEIGHT * 0.8
              }
              onPress={props.onLeftIconClick}
              style={{ padding: 10}}
            />
          ) : (
            <Text style={{flex: 1}}>{''}</Text>
          )}
        </View>
      

      <View style={{flex: 1, minWidth: dimensions.vw*33, paddingBottom: 10}}>
        <Text
        style={[
          styles.title,
          {color: props.iconsColor, textAlign:"center"},
        ]}>
        {props.screenName || ''}
      </Text>

      </View>
      

      <View style={{flex: 1, minWidth: dimensions.vw*33, flexDirection:"row", justifyContent:"flex-end"}}>
        {props.showRightIcon ? (   
          <Icon
            name={props.rightIcon ? props.rightIcon : 'more-vert'}
            color={props.iconsColor ? props.iconsColor : WHITE}
            size={STATUS_BAR_HEIGHT * 0.7}
            onPress={props.onRightIconClick}
            style={{
              padding: 10,
            }}
          />
          ) : (
            <Text style={{flex: 1}}>{''}</Text>
          )}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  top: {
    // height: STATUS_BAR_HEIGHT,
    height: 52,
    color: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: FONT_SIZE_SMALL,
    marginTop: 14,
    // borderBottomColor: '#111',
    // borderBottomWidth: 1,
  },
  underliine: {
    width: 30,
    height: 2,
    backgroundColor: BLACK,
    marginTop: 5,
  },
});

export default Header;
