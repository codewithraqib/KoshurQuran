import React from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
// import ModalDropdown from './ModalDropdown';
import Image from 'react-native-scalable-image';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, dimensions} from '../theme';
import PBTouchable from './PBTouchable';
import PBInput from './PBInput';
import PBText from './PBText';
import {Dropdown} from 'react-native-material-dropdown';

const PBSelect = props => {
  const {
    data,
    selectedText,
    icon,
    onChange,
    valKey,
    style,
    textStyle,
    containerStyle,
    short,
  } = props;

  let displayRow = (rowData, rowID, highlighted) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={{
            ...styles.listItemText,
            color: highlighted ? colors.primaryBG : '#444',
          }}>
          {rowData[valKey || 'name']}
        </Text>
      </View>
    );
  };

  let onChangeText = text => {
    let item = data.find(it => it.value == text);
    onChange(item);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {props.label ? (
        <View style={styles.labelTextContainer}>
          <PBText
            bold={true}
            style={props.labelStyle ? props.labelStyle : styles.labelText}>
            {props.label}
          </PBText>
        </View>
      ) : null}
      {/* <ModalDropdown 
            options={data}
            onSelect={(index,value) => {
                onChange(value)
            }
            }
            renderRow={(rowData, rowID, highlighted) => displayRow(rowData, rowID, highlighted)}
            dropdownStyle={props.dropdownStyle}
            short={short}
            >
                <View style={[styles.buttonInnerContainer]}>
                    {icon ? <View style={styles.iconContainer}><Image style={styles.dropDownButtonIcon} width={30} source={icon} /> </View> : null}
                    <View style={styles.selectedItemTextContainer}>
                        <Text style={props.fontStyle? props.fontStyle: styles.dropDownButtonText}>{selectedText}</Text>
                    </View>
                    <IonIcon style={styles.arrow} name={'md-arrow-dropdown'} size={20} color={'#777'} /> 
                </View>
            </ModalDropdown> */}
      <View style={styles.buttonInnerContainer}>
        <Dropdown
          lineWidth={0}
          activeLineWidth={0}
          disabledLineWidth={0}
          containerStyle={{
            marginTop: -dimensions.vw * 4.2,
            marginLeft: 10,
            marginRight: 5,
            flex: 1,
            borderBottomWidth: 0,
            borderWidth: 0,
          }}
          // label={selectedText}
          itemTextStyle={{borderBottomWidth: 0, borderWidth: 0}}
          textColor={props.color || '#464647'}
          data={data}
          onChangeText={onChangeText}
          itemCount={6}
          value={selectedText}
          fontSize={14}
          selectedItemColor={!props.color ? colors.primaryBG : '#464647'}
        />
        {/* <IonIcon style={styles.arrow} name={'md-arrow-dropdown'} size={20} color={'#777'} />  */}
      </View>
      {props.error ? (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{props.errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 5,
  },
  buttonInnerContainer: {
    height: dimensions.vw * 10,
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    overflow: 'hidden',
  },

  selectedItemTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dropDownButtonText: {
    color: '#fafafa',
    fontSize: 14,
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Regular'
        : 'AvenirNextLTPro-Regular',
  },
  iconContainer: {
    height: '100%',
    alignItems: 'center',
    width: 50,
  },
  listItem: {
    width: dimensions.vw * 84,
    flexDirection: 'row',
    padding: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Regular'
        : 'AvenirNextLTPro-Regular',
  },
  arrow: {
    marginRight: 10,
  },
  errorTextContainer: {
    paddingHorizontal: 2,
  },
  errorText: {
    color: '#f00',
    fontSize: 11,
    fontFamily:
      Platform.OS === 'android'
        ? 'AvenirNextLTPro-Regular'
        : 'AvenirNextLTPro-Regular',
  },
  labelTextContainer: {
    paddingHorizontal: 2,
    marginBottom: 3,
  },
  labelText: {
    fontSize: 14,
  },
});

export default PBSelect;
