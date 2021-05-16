// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Switch, Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import { get } from "lodash";

import { pushTutorialScreen } from "src/navigation";
import { connectData } from "src/redux";
import ReactNativeAN from "react-native-alarm-notification";
import PBText from "src/components/PBText";
import PButton from "src/components/PButton";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, dimensions } from "src/theme";
import { retry } from "@redux-saga/core/effects";
import DateService from "src/services/dateService";
import PBModal from "src/components/PBModal";
import PBInput from "src/components/PBInput";
import CommonService from "src/services/commonService";
import SuccessFailureModal from "src/components/SuccessFailureModal";
import { ScrollView } from "react-native-gesture-handler";

class AlarmScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      setForEveryday: false,
      alarmNotifData: {
        // title: this.state.nextPrayerName,
        message: "Swipe to dismiss the alarm!",
        channel: "my_channel_id",
        small_icon: "ic_launcher",
        data: { foo: "bar" },
        auto_cancel: true,
      },
    };
  }

  componentDidMount() {
    this.getAlreadySetAlarms();
  }

  componentDidUpdate() {
    // this.getAlreadySetAlarms();
  }

  getAlreadySetAlarms = async () => {
    try {
      await ReactNativeAN.getScheduledAlarms().then((alarms) => {
        console.log("Alarams ischeduled ------", alarms);

        this.setState({ scheduledAlarms: alarms });
        // this.forceUpdate();
        // return data;
      });
    } catch (e) {}
  };

  createAlarm = async (details) => {
    try {
      let alarm;
      if (details) {
        alarm = await ReactNativeAN.scheduleAlarm({
          ...details,
          fire_date: this.state.fireDate,
        });
      } else {
        alarm = await ReactNativeAN.scheduleAlarm({
          ...this.state.alarmNotifData,
          fire_date: this.state.fireDate,
        });
      }

      console.log("Alarm created is-----", alarm);

      this.setState({
        showAlarmDetailsModal: false,
        // showAlarmDeleteModal: true,
        // showAlarmDeleteModalStatus: true,
      });

      this.setState({
        showAlarmDeleteModal: true,
        showAlarmDeleteModalStatus: true,
        modalBodyText: "Alarm created successfully!",
        modalButtonText: "Okay",
      });

      this.getAlreadySetAlarms();

      // setTimeout(() => {
      //   ReactNativeAN.removeFiredNotification(alarm.id);
      //   ReactNativeAN.stopAlarmSound();
      // }, 1000 * 60);
    } catch (e) {}
  };

  setDateTime = (date) => {
    this.setState({
      fireDate: ReactNativeAN.parseDate(date),
      showAlarmDetailsModal: true,
    });
  };

  changeAlarmStatus = (alarm) => {
    console.log("Alarm is about to be stopped ----", alarm);

    ReactNativeAN.deleteAlarm(alarm.id);

    this.setState({
      showAlarmDeleteModal: true,
      showAlarmDeleteModalStatus: true,
      modalBodyText: "Alarm " + alarm.title + " successfully stopped!",
      modalButtonText: "Okay",
    });

    this.getAlreadySetAlarms();
  };

  renderAlarmItem = (alarm, key) => {
    console.log("Alarm to render is ----", alarm);
    return (
      <View
        style={{
          // height: dimensions.vh * 12,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 10,
          paddingBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: 5,
            }}
          >
            {/* <PBText white={true} style={{ fontSize: 26 }}>
              {alarm.hour
                ? alarm.hour
                : "00" + ":" + alarm.minute
                ? alarm.minute
                : "00"}
            </PBText> */}

            <PBText white={true} style={{ fontSize: 22 }}>
              {alarm.c + ":" + alarm.b}
            </PBText>

            <PBText
              white={true}
              style={{ fontSize: 12, paddingBottom: 3, marginLeft: 2 }}
            >
              {DateService.ampmOnly(alarm.hour + ":" + alarm.minute)}
            </PBText>
          </View>

          <PBText style={{ fontSize: 12 }} white={true}>
            {alarm.i}{" "}
          </PBText>
        </View>

        {/* <PBText style={{ width: dimensions.vw * 60 }} white={true}>
          {JSON.stringify(alarm)}
        </PBText> */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 10 }}>
            <PBText style={{ fontSize: 10, color: "#ccc" }}>
              {alarm.v === "repeat" ? "Everyday alarm" : "One time alarm"}
            </PBText>
          </View>
          <Switch
            value={true}
            trackColor={{
              false: "rgba(204, 204, 204, 0.6)",
              true: "rgba(255, 92, 96, 0.6)",
            }}
            onValueChange={() => this.changeAlarmStatus(alarm)}
            thumbColor={this.state.toggle ? "#FF5C60" : "#ccc"}
          />
        </View>
      </View>
    );
  };

  onBlur = () => {};

  onAlarmNameChange = (val) => {
    this.setState({ alarmName: val });
  };

  onAlarmDetailsSet = () => {
    let details = CommonService.copyObject(this.state.alarmNotifData);

    details = {
      ...details,
      title: this.state.alarmName,
      schedule_type: this.state.setForEveryday ? "repeat" : "once",
    };

    this.setState({ alarmNotifData: details });
    this.createAlarm(details);

    console.log("Alalrm details are----", details);
    // this.setState({});
  };

  changeAlarmRepeatSchedule = (val) => {
    console.log("changeAlarmRepeatSchedule---", val);

    this.setState({ setForEveryday: val });
  };

  render() {
    // console.log("scheduled alarms--------", this.state.scheduledAlarms);
    return (
      <View style={styles.flex}>
        <FullQuizBG color={true} type={1} />
        <CarpoolHeader
          menuIcon={false}
          backIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          label="Alarms"
          labelBold=" "
        />

        <View
          style={{
            flex: 1,
            width: dimensions.vw * 90,
            marginHorizontal: dimensions.vw * 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          <ScrollView style={{ maxHeight: dimensions.vh * 75 }}>
            <View>
              {this.state.scheduledAlarms &&
                this.state.scheduledAlarms.map((alarm, index) => {
                  return this.renderAlarmItem(alarm, index);
                })}
            </View>
          </ScrollView>

          {!this.state.scheduledAlarms ||
          (this.state.scheduledAlarms &&
            this.state.scheduledAlarms.length === 0) ? (
            <View
              style={{
                position: "absolute",
                top: dimensions.vh * 35,
                width: dimensions.vw * 90,
              }}
            >
              <PBText
                style={{ color: "#fff", fontSize: 15 }}
                bold={true}
                center={true}
              >
                {"No alarms set\n\nSet an alarm may be for next prayer!"}
              </PBText>
            </View>
          ) : null}
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: dimensions.vw * 8,
          }}
        >
          <PButton
            onPress={() => this.setState({ showModal: true })}
            primaryButtonColor={false}
            style={{ borderRadius: 10, marginTop: 25 }}
            noGradient={false}
            title={"Set new alarm"}
            primaryButton={true}
          />
        </View>

        <DateTimePickerModal
          isVisible={this.state.showModal}
          mode="datetime"
          onConfirm={this.setDateTime}
          onCancel={() => this.setState({ showModal: false })}
        />

        <PBModal
          // showModal={true}
          showModal={this.state.showAlarmDetailsModal}
          modalHeight={dimensions.vh * 50}
          titleText="Set alarm details"
          showButton1={true}
          button1Text="Set alarm"
          button1Press={this.onAlarmDetailsSet}
          showButton2={true}
          button2Text="Cancel alarm"
          button2Press={() => {
            this.setState({ showAlarmDetailsModal: false });
          }}
          onBackButtonPress={() => {
            this.setState({ showAlarmDetailsModal: false });
          }}
        >
          <PBInput
            type="text"
            placeholder="Alarm name"
            textColor={"#464647"}
            onBlur={this.onBlur}
            onChange={this.onAlarmNameChange}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <PBText>Repeat everyday</PBText>
            <Switch
              value={this.state.setForEveryday}
              trackColor={{
                false: "rgba(204, 204, 204, 0.6)",
                true: colors.thirdColor,
              }}
              onValueChange={this.changeAlarmRepeatSchedule}
              thumbColor={this.state.setForEveryday ? "#FF5C60" : "#ccc"}
            />
          </View>
        </PBModal>

        <SuccessFailureModal
          showModal={this.state.showAlarmDeleteModal}
          success={this.state.showAlarmDeleteModalStatus || true}
          smallIcon={true}
          bodyText={this.state.modalBodyText}
          buttonText={this.state.modalButtonText}
          onButtonPress={() => this.setState({ showAlarmDeleteModal: false })}
          onBackButtonPress={() =>
            this.setState({ showAlarmDeleteModal: false })
          }
        />
      </View>
    );
  }
}

AlarmScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default connectData()(AlarmScreen);
