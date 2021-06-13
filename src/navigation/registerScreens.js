// @flow

import React from "react";
import { Navigation } from "react-native-navigation";

import {
  BooksScreen,
  HomeScreen,
  YoutubeScreen,
  ScholarScreen,
  BookListScreen,
  QiblaScreen,
  AlarmScreen,
  InfoScreen,
  DonationScreen,
  OurComapnyScreen,
  SurahPlayScreen,
  OtherAudiosScreen,
  BookmarksScreen,
} from "src/screens";
import { Provider } from "src/redux";
import SideMenu from "src/components/SideMenu";

import {
  HOME_SCREEN,
  SIDE_MENU,
  YOUTUBE_SCREEN,
  SCHOLAR_SCREEN,
  BOOKS_SCREEN,
  BOOK_LIST_SCREEN,
  QIBLA_SCREEN,
  ALARM_SCREEN,
  INFO_SCREEN,
  DONATION_SCREEN,
  OUR_COMPANY_SCREEN,
  SURAH_PLAY_SCREEN,
  OTHER_AUDIO_SCREEN,
  BOOKMARKS_SCREEN,
} from "./Screens";

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <Component {...props} />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function() {
  Navigation.registerComponent(HOME_SCREEN, () => WrappedComponent(HomeScreen));
  Navigation.registerComponent(BOOKS_SCREEN, () =>
    WrappedComponent(BooksScreen)
  );
  Navigation.registerComponent(OTHER_AUDIO_SCREEN, () =>
    WrappedComponent(OtherAudiosScreen)
  );
  Navigation.registerComponent(YOUTUBE_SCREEN, () =>
    WrappedComponent(YoutubeScreen)
  );
  Navigation.registerComponent(SCHOLAR_SCREEN, () =>
    WrappedComponent(ScholarScreen)
  );
  Navigation.registerComponent(BOOK_LIST_SCREEN, () =>
    WrappedComponent(BookListScreen)
  );
  Navigation.registerComponent(QIBLA_SCREEN, () =>
    WrappedComponent(QiblaScreen)
  );
  Navigation.registerComponent(ALARM_SCREEN, () =>
    WrappedComponent(AlarmScreen)
  );
  Navigation.registerComponent(SIDE_MENU, () => WrappedComponent(SideMenu));
  Navigation.registerComponent(SURAH_PLAY_SCREEN, () =>
    WrappedComponent(SurahPlayScreen)
  );
  Navigation.registerComponent(INFO_SCREEN, () => WrappedComponent(InfoScreen));
  Navigation.registerComponent(DONATION_SCREEN, () =>
    WrappedComponent(DonationScreen)
  );
  Navigation.registerComponent(OUR_COMPANY_SCREEN, () =>
    WrappedComponent(OurComapnyScreen)
  );

  Navigation.registerComponent(BOOKMARKS_SCREEN, () =>
    WrappedComponent(BookmarksScreen)
  );

  console.info("All screens have been registered...");
}
