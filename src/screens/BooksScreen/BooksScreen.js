// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Alert, Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { get } from "lodash";

import { pushTutorialScreen } from "src/navigation";
import { connectData } from "src/redux";

import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import { dimensions } from "src/theme";
import Pdf from "react-native-pdf";

class BooksScreen extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.state = {};
  }

  fileToBase64 = (filename, filepath) => {
    return new Promise((resolve) => {
      var file = new File([filename], filepath);
      var reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function(event) {
        resolve(event.target.result);
      };

      // Convert data to base64
      reader.readAsDataURL(file);
    });
  };

  render() {
    const resourceType = "url";
    const source = {
      uri: this.props.pdfLink,
      cache: true,
    };

    // this.fileToBase64("SalatSalam.pdf", salat).then((result) => {
    //   console.log(
    //     "Converted pdf to base 64 is----------",
    //     result.split(",")[1]
    //   );
    //   this.setState({ pdfFile: result.split(",")[1] });
    // });
    return (
      <View style={styles.flex}>
        <FullQuizBG color={true} type={1} />

        <CarpoolHeader
          menuIcon={false}
          backIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          label="Islamic"
          labelBold="books "
        />
        <View style={styles.container}>
          {/* Some Controls to change PDF resource */}
          {/* <PDFView
            fadeInDuration={250.0}
            style={{
              // maxHeight: 100,
              height: dimensions.vh * 88,
              width: dimensions.vw * 90,
            }}
            // resource={
            //   "https://www.cerstvyboby.cz/user/related_files/rao-barista.pdf"
            // }
            resource={this.props.pdfLink && this.props.pdfLink}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={(error) => console.log("Cannot render PDF", error)}
          /> */}

          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link presse: ${uri}`);
            }}
            style={styles.pdf}
            maxScale={2.0}
            // horizontal={true}
            enablePaging={true}
            enableAntialiasing={true}
          />
        </View>
      </View>
    );
  }
}

BooksScreen.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: dimensions.vw * 100,
    height: dimensions.vh * 88,
  },
});

export default connectData()(BooksScreen);
