import React, { PureComponent } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import SeekBar from "src/components/SeekBar";
import { connectData } from "src/redux";
import Video from "react-native-video";
import Player from "src/components/Player";
import { ScrollView } from "react-native-gesture-handler";
import PBText from "src/components/PBText";
import Header from "src/components/Header";
import PBTouchable from "src/components/PBTouchable";
import { dimensions } from "src/theme";
import CommonService from "src/services/commonService";
import { SURAH_PLAY_SCREEN } from "src/navigation";

var moment = require("moment-hijri");

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nextPrayerName: "Fajr",
      thisMonthNumber: new Date().getMonth(),
      monthTableTitles: [
        "Day",
        "Fajr",
        "Taluh",
        "Zuhr",
        "Asr",
        "Magrb",
        "Isha",
      ],
      timeDrift: 0,
      selectedLocation: "Srinagar",
      selectedRegion: "Kashmir",

      fullIslamicDate: moment().format("iD/iM/iYYYY"),
      tracks: [
        {
          id: 0,
          title: "Introduction",
          artist: "Mufti Nazir Ahmad Qasmi",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/intro.mpeg",
        },
        {
          id: 78,
          title: "Surat ul Naba'",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/78surah_nabbah.mpeg",
        },
        {
          id: 79,
          title: "Surat ul Naziyat",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/79surah_naziyat.mpeg",
        },
        {
          id: 80,
          title: "Surat ul Abasa",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/80surah_abasa.mpeg",
        },
        {
          id: 81,
          title: "Surat ul Takwir",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/81surah_takweer.mpeg",
        },
        {
          id: 82,
          title: "Surat ul Infitar",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/82surah_infitaar.mpeg",
        },
        {
          id: 83,
          title: "Surat ul Mutaffifin",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/83surah_mutafifeen.mpeg",
        },
        {
          id: 84,
          title: "Surat ul Inshiqaq",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/84surah_inshiqaq.mpeg",
        },
        {
          id: 85,
          title: "Surat ul Buruj",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/85surah_burooj.mpeg",
        },
        {
          id: 86,
          title: "Surat ul Tariq",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/86surah_tariq.mpeg",
        },
        {
          id: 87,
          title: "Surat ul A'la",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/87surah_aala.mpeg",
        },
        {
          id: 88,
          title: "Surat ul Ghashiyah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/88surah_gashiyah.mpeg",
        },
        {
          id: 89,
          title: "Surat ul Fajr",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/89surah_fajr.mpeg",
        },
        {
          id: 90,
          title: "Surat ul Bayinah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/90surah_balad.mpeg",
        },
        {
          id: 91,
          title: "Surat ul Shams",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/91surah_shams.mpeg",
        },
        {
          id: 92,
          title: "Surat ul Lail",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/92surah_lail.mpeg",
        },
        {
          id: 93,
          title: "Surat ul Duha",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/93surah_duha.mpeg",
        },
        {
          id: 94,
          title: "Surat ul Inshirah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/94surah_inshira.mpeg",
        },
        {
          id: 95,
          title: "Surat ul Tin",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/95surah_tin.mpeg",
        },
        {
          id: 96,
          title: "Surat ul Alaq",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/96surah_alaq.mpeg",
        },
        {
          id: 97,
          title: "Surat ul Qadr",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/97surah_qadr.mpeg",
        },
        {
          id: 98,
          title: "Surat ul Bayinah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/98surah_bayinah.mpeg",
        },
        {
          id: 99,
          title: "Surat ul Zalzalah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/99surah_zilzal.mpeg",
        },
        {
          id: 100,
          title: "Surat ul Bayinah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/100surah_aadiyat.mpeg",
        },
        {
          id: 101,
          title: "Surat ul Qari'ah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/101surah_qariah.mpeg",
        },
        {
          id: 102,
          title: "Surat ul Takathur",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/102surah_takathur.mpeg",
        },
        {
          id: 103,
          title: "Surat ul Asr",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/103surah_asr.mpeg",
        },
        {
          id: 104,
          title: "Surat ul Humazah",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/104surah_humazah.mpeg",
        },
        {
          id: 105,
          title: "Surat ul Fil",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/105surah_fil.mpeg",
        },
        {
          id: 106,
          title: "Surat ul Quraish",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/106surah_quraish.mpeg",
        },
        {
          id: 107,
          title: "Surat ul Ma'un",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/107surah_maun.mpeg",
        },
        {
          id: 108,
          title: "Surat ul Kauthar",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/108surah_qauthar.mpeg",
        },
        {
          id: 109,
          title: "Surat ul Kafirun",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/109surah_kafiroon.mpeg",
        },
        {
          id: 110,
          title: "Surat ul Nasr",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/110surah_nasr.mpeg",
        },
        {
          id: 111,
          title: "Surat ul Lahab",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/111surah_lahab.mpeg",
        },
        {
          id: 112,
          title: "Surat ul Ikhlas",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl:
            "https://bracecodes.in/quran_app/quran/112surah_ikhlas.mpeg",
        },
        {
          id: 113,
          title: "Surat ul Falaq",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/113surah_falaq.mpeg",
        },
        {
          id: 114,
          title: "Surat ul Nas",
          artist: "Moulana Shafiq sb shopian",
          albumArtUrl:
            "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          audioUrl: "https://bracecodes.in/quran_app/quran/114surah_nas.mpeg",
        },
      ],
    };
  }

  goToScreen = (surah) => {
    console.log("this.props------", this.props);

    this.props.setCurrentSurah(surah);
    CommonService.goToScreenHideTopBar(
      this.props.componentId,
      SURAH_PLAY_SCREEN
    );
  };

  renderListItem = (surah, key) => {
    return (
      <TouchableOpacity onPress={() => this.goToScreen(surah)}>
        <View key={key} style={styles.listItem}>
          <PBText white={true} style={{ marginRight: 10 }}>
            {surah.id}
          </PBText>
          <PBText white={true}>{surah.title}</PBText>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.flex}>
        {/* <Player tracks={this.state.TRACKS} /> */}
        <StatusBar
          translucent
          backgroundColor="#444"
          barStyle="light-content"
        />
        <Header
          headerBackgroundColor={{ backgroundColor: "#444" }}
          message={`Aasan Quran Tarjama`}
          style={{ height: 62, paddingTop: 20 }}
        />

        <ScrollView>
          {this.state.tracks.map((val, key) => {
            return this.renderListItem(val, key);
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    // position: "relative",
  },
  heroImageContainer: {
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: "100%",
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 36 },
  text: { textAlign: "center", fontSize: 10 },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: "#f00",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    minHeight: dimensions.vh * 6,
    marginHorizontal: dimensions.vw * 3,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

export default connectData()(HomeScreen);
