// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import { connectData } from "src/redux";
import PBInput from "src/components/PBInput";
import { colors, commonStyles, dimensions } from "src/theme";
import PButton from "src/components/PButton";
import PBCard from "src/components/PBCard";
import PBText from "src/components/PBText";
import CommonService from "src/services/commonService";
import CarpoolHeader from "src/components/CarpoolHeader";
import FullQuizBG from "src/components/FullQuizBG";
import SuccessFailureModal from "src/components/SuccessFailureModal";
import AppData from "src/services/appData";
import RazorpayCheckout from "react-native-razorpay";

class DonationScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amountError: null,
      nameError: null,
    };
  }

  componentDidMount() {
    console.log("Porps i  withdraw add screen ", this.props);
  }

  onBlur = () => {
    !this.state.amount
      ? this.setState({ amountError: { message: "Enter valid amount" } })
      : null;

    !this.state.name
      ? this.setState({
          nameError: { message: "Enter valid your name!" },
        })
      : null;
  };

  inputChange = (text, type) => {
    switch (type) {
      case "amount":
        this.setState({
          amount: CommonService.onlyNumbers(text),
          amountError: null,
        });
        break;

      case "name":
        this.setState({
          name: text,
          nameError: null,
        });
        break;
    }
  };

  onButtonPress = () => {
    if (!this.state.amount) {
      this.setState({
        amountError: {
          message: "Please enter an amount!",
        },
      });
      return;
    }

    if (!this.state.name) {
      this.setState({
        nameError: {
          message: "Please enter your name!",
        },
      });
      return;
    }

    if (this.state.amount < 50) {
      this.setState({
        amountError: {
          message: "Please donate at least 50 rupees amount!",
        },
      });
      return;
    }

    let options = {
      description: "Meeqat donation/help",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipM4-l_BLHcQcaC8TfhyTCFrioUvQsI3rBmcesLN=s1280-p-no-v1",
      currency: "INR",
      key: AppData.RAZORPAY_KEY,
      amount: this.state.amount * 100,
      name: this.state.name || "annonymous",
      // order_id: '87687756', //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: "bracecodes@gmail.com",
        contact: "9596263439",
        name: this.state.name || "annonymous",
      },
      theme: { color: colors.primaryColor },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        this.onRazorpayResponse(data);
      })
      .catch((error) => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        this.onRazorpayResponse(error);
      });
  };

  onRazorpayResponse = (result) => {
    console.log("Razorpay response is", result);

    if (result.razorpay_payment_id) {
      this.setState({
        walletSuccess: true,
        walletSuccessStatus: true,
        modalBodyText: `Thank you for donating/contributing to this cause. JazakAllah u Khair!`,
      });
    } else if (result.error) {
      this.setState({
        walletSuccess: true,
        walletSuccessStatus: false,
        modalBodyText: result.error.description,
      });
    }
  };

  render() {
    return (
      <View style={(styles.flex, styles.screenwrapper)}>
        <FullQuizBG color={true} type={1} />
        <CarpoolHeader
          leftIconColor="#fff"
          backIconColor="#fff"
          backIcon={true}
          labelDark={false}
          componentId={this.props.componentId}
          label={"Donate"}
          labelBold="and help!"
        />

        <PBCard whiteBackground={true}>
          <View>
            <PBText
              white={true}
              center={true}
              style={{ lineHeight: 19, marginBottom: 30 }}
            >
              {
                "This is a standalone project maintained by developer on its own and does not have any direct affiliation with the company.\n\n We are collecting donation to get this application live on Apple app store which costs around 20,000 per year fee! "
              }
            </PBText>
            <PBInput
              type={"number"}
              placeholder={"Amount"}
              value={this.state.amount}
              onTextChange={(text) => this.inputChange(text, "amount")}
              onBlur={(text) => this.onBlur(text, "amount")}
              error={this.state.amountError ? true : false}
              errorMessage={
                this.state.amountError ? this.state.amountError.message : ""
              }
              textColor={"#fff"}
            />

            <PBInput
              type={"text"}
              placeholder={"Name"}
              value={this.state.name}
              onTextChange={(text) => this.inputChange(text, "name")}
              onBlur={(text) => this.onBlur(text, "name")}
              error={this.state.nameError ? true : false}
              errorMessage={
                this.state.nameError ? this.state.nameError.message : ""
              }
              textColor={"#fff"}
            />

            <PButton
              onPress={this.onButtonPress}
              style={{ borderRadius: 10, marginTop: 25 }}
              noGradient={true}
              title={"Donate"}
              primaryButton={true}
            />
          </View>
        </PBCard>

        <SuccessFailureModal
          showModal={this.state.walletSuccess}
          success={this.state.walletSuccessStatus}
          smallIcon={true}
          bodyText={this.state.modalBodyText}
          buttonText={"OK"}
          onButtonPress={() => {
            this.setState({ walletSuccess: false });
            this.state.walletSuccessStatus
              ? CommonService.goBack(this.props.componentId)
              : null;
          }}
          onBackButtonPress={() => {
            this.setState({ walletSuccess: false });
          }}
        />
      </View>
    );
  }
}

// LoginScreen.propTypes = {
//   getFacebookUserData: PropTypes.func.isRequired,
//   screenType: PropTypes.oneOf(['Single', 'Tab']).isRequired
// };

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  button: {
    backgroundColor: "#039893",
  },
  screenwrapper: {
    width: dimensions.vw * 100,

    // marginHorizontal: dimensions.vw*5,
    // paddingTop: dimensions.vh * 10,
  },
  registerLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    width: dimensions.vw * 100,
    paddingHorizontal: dimensions.vw * 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: dimensions.vh * 5,
  },
});

export default connectData()(DonationScreen);
