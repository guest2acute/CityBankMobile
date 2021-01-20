import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Platform,
  TextInput, Image,
  Keyboard, ScrollView, Alert, StyleSheet, Linking,
} from "react-native";
import themeStyle from "../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import FontSize from "../resources/ManageFontSize";
import { BusyIndicator } from "../resources/busy-indicator";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../config/Config";
import FontStyle from "../resources/FontStyle";
import TextTicker from "react-native-text-ticker";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";

let act_type = [
  { label: "Select Account Type", value: -1 },
  { label: "Account Number", value: 0 },
  { label: "Card Number", value: 1 },
];


let width = Config.getDeviceWidth() / 5;
let space = width / 6;
let imgWidth = wp(dimen.dim_w25);


class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {imageData:null};
  }

  makePhoneCall(phoneNumber){
    Linking.openURL(`tel:${phoneNumber}`);
  }
  render() {
    let language = this.props.language;
    return (
      <View style={{ flex: 1, backgroundColor: themeStyle.BG_COLOR }}>
        <SafeAreaView />
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          height: hp(dimen.dim_h60),
          backgroundColor: theme.THEME_COLOR,
          alignItems: "center",

        }}>
          <TouchableOpacity
            style={{ width: 45, height: 35, alignItems: "center", justifyContent: "center" }}
            onPress={() => this.props.navigation.toggleDrawer()}>
            <Image style={{ width: 30, height: 30, tintColor: theme.WHITE }}
                   source={require("../resources/images/menu_icon.png")} />
          </TouchableOpacity>

          <View style={{ flex: 1,}}>
            <Text style={{
              color: theme.WHITE,
              fontFamily: fontStyle.RobotoMedium,
              fontSize: FontSize.getSize(14),
            }}>Welcome Ali Hussain</Text>
            <Text style={{
              color: theme.WHITE,
              fontFamily: fontStyle.RobotoMedium,
              fontSize: FontSize.getSize(8),
            }}>Last login: 16/01/2021 10:00 PM</Text>
          </View>

          <TouchableOpacity style={{alignSelf:"center"}} onPress={() =>this.props.navigation.navigate("NotificationsScreen")}>
            <View style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              marginEnd:10,
              width: 20,
              height: 20
            }}>
              <Image
                source={require("../resources/images/icon_notification.png")}
                resizeMode="cover"
                style={{
                  width: 20,
                  height: 20,
                  tintColor:themeStyle.WHITE
                }}
              />
            </View>
          </TouchableOpacity>

           <TouchableOpacity style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate("ProfileScreen")}>
            <View style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              marginEnd:10,
              width: 40,
              height: 40,

            }}>
              <Image
                source={this.state.imageData === null ? require("../resources/images/userimg.png") :
                  { uri: this.state.imageData }}
                resizeMode="cover"
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor:themeStyle.OFF_WHITE_COLOR,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 0.5,
                  borderColor: "#000000",
                }}
              />
            </View>
          </TouchableOpacity>

        </View>

        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View>
            <TextTicker
              style={styles.slogan}
              duration={20000}
              loop
              bounce={false}
              repeatSpacer={100}
              marqueeDelay={1000}>
              {language.slogan}<Text
              style={{fontFamily: fontStyle.RobotoMedium, textDecorationLine: "underline" }}>16234</Text> (local) / <Text style={{
                fontFamily: fontStyle.RobotoMedium,
                textDecorationLine: "underline",
              }}>+880-2-8331040</Text> (Overseas)

            </TextTicker>
            <View style={styles.wrapper}>
              <View style={styles.mainViewContainer}>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate("AccountsDetailsScreen",{language:language});
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/account_summary.png")} />
                    <Text style={styles.textStyle}>{language.summary_account}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/fd.png")} />
                    <Text style={styles.textStyle}>{language.fd}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/cheque.png")} />
                    <Text style={styles.textStyle}>{language.cheque}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/cards.png")} />
                    <Text style={styles.textStyle}>{language.cards}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.mainViewContainer}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/loan.png")} />
                    <Text style={styles.textStyle}>{language.loan_accounts}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/loan.png")} />
                    <Text style={styles.textStyle}>{language.loan_scheduler}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/loan.png")} />
                    <Text style={styles.textStyle}>{language.loan_against_deposit}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                }}>
                  <View style={styles.viewContainer}>
                    <Image style={styles.imageStyle}
                           source={require("../resources/images/loan.png")} />
                    <Text style={styles.textStyle}>{language.loan_interest_certificate}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this._navListener = this.props.navigation.addListener("focus", () => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor(themeStyle.THEME_COLOR);
        StatusBar.setBarStyle("light-content");
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }
}

const styles = StyleSheet.create({
  slogan: {
    paddingStart: space,
    color: themeStyle.THEME_COLOR,
    paddingEnd: space, marginTop: hp(dimen.dim_h15),
    marginBottom: hp(dimen.dim_h10), fontSize: FontSize.getSize(13), fontFamily: FontStyle.RobotoRegular,
  },
  wrapper: {
    backgroundColor: themeStyle.WHITE, paddingStart: space, paddingEnd: space, marginTop: hp(dimen.dim_h15),
  },
  mainViewContainer: {
    flexDirection: "row", marginBottom: hp(dimen.dim_h20), marginTop: hp(dimen.dim_h20),
  },
  viewContainer: {
    width: width, flexDirection: "column", marginEnd: space, alignItems: "center",
  },
  imageStyle: {
    width: imgWidth,
    height: imgWidth,
    resizeMode: "contain",
    marginBottom: hp(dimen.dim_h10),
  },
  textStyle: {
    color: theme.BLACK_43,
    fontSize: FontSize.getSize(11),
    fontFamily: fontStyle.RobotoRegular,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(DashBoardScreen);

