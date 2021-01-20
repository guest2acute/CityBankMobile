import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Platform,
  TextInput, Image,
  Keyboard, ScrollView, Alert, Linking, BackHandler,
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
import { actions } from "../redux/actions";
import Utility from "../utilize/Utility";
import fontStyle from "../resources/FontStyle";
import FingerprintScanner from "react-native-fingerprint-scanner";


class SecondTimeLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      passwordTxt: "",
      isProgress: false,
      passwordVisible: false,
      hasFinger: false,
      biometryType: null,
    };
    this.checkFingerTouch();
  }

  checkFingerTouch() {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        this.setState({ biometryType, hasFinger: true },()=>{
          this.showAuthenticationDialog();
        });

      })
      .catch((error) => console.log("isSensorAvailable error => ", error));
  }

  getMessage = () => {
    const { biometryType } = this.state;
   /* if (biometryType === "TouchID") {
      return "Scan your Face on the device to continue";
    } else {*/
      return "Scan your Fingerprint on the mobile scanner to continue";
   // }
  };

  showAuthenticationDialog = () => {
    const {biometryType}=this.state;
    if(biometryType!==null && biometryType!==undefined )
    {
      FingerprintScanner.authenticate({
        description: this.getMessage()
      })
        .then(() => {
          this.props.navigation.replace("Navigator");
        })
        .catch((error) => {
          FingerprintScanner.release();
          this.popupConfirm();
          console.log('Authentication error is => ', error);
        });
    }
    else
    {
      console.log('biometric authentication is not available');
    }
  };

  popupConfirm(){
    Alert.alert(
      Config.appName,
      "Please validate using finger to login",
      [
        {text: "Ok", onPress: () => this.showAuthenticationDialog()},
        {text: "Close app", onPress: () => BackHandler.exitApp()},
      ]
    );
  }
  /**
   * onSubmit button action
   */

  async onSubmit() {
    if (this.state.passwordTxt === "") {
      Utility.alert("Please enter password");
    } else
      await this.redirect();
  }

  async redirect() {
    this.props.navigation.replace("Navigator", { language: this.props.language });
  }

  changeLanguage(langCode) {
    console.log("langCode", langCode);
    this.props.dispatch({
      type: actions.account.CHANGE_LANG,
      payload: {
        langId: langCode,
      },
    });
  }

  render() {
    let language = this.props.language;
    return (
      <View style={{ flex: 1, backgroundColor: themeStyle.BG_COLOR }}>
        <SafeAreaView />
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: hp(dimen.dim_h20),
        }}>
          <Image
            source={require("../resources/images/logo_transparent.png")}
            resizeMode="contain"
            style={{
              height: Config.getDeviceWidth() / 2.3,
              width: Config.getDeviceWidth() / 2.3,
            }}
          />
        </View>
        {this.state.hasFinger ? <View style={{ marginTop: hp(dimen.dim_h100) }}>
            <Image style={{
              width: wp(dimen.dim_w80), height: hp(dimen.dim_h80), marginBottom: 10,
              alignSelf: "center", tintColor: themeStyle.THEME_COLOR,
            }} resizeMode={"contain"}
                   source={require("../resources/images/thumbprint_icon.jpg")} />

            <Text style={{
              fontSize: FontSize.getSize(16), fontFamily: FontStyle.RobotoBold
              , alignSelf: "center", color: themeStyle.BLACK_43
              , marginBottom: 10,
            }}>Login using Fingerprint</Text>
            <Text style={{
              fontSize: FontSize.getSize(13),
              fontFamily: FontStyle.RobotoRegular,
              alignSelf: "center",
              marginBottom: 20,
              color: "#000000",
            }}>Place your finger on fingerprint scanner to login</Text>
          </View> :

          <ScrollView showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handle">

            <View style={{
              marginLeft: wp(dimen.dim_w30),
              marginRight: wp(dimen.dim_w30),
            }}>
              <View style={{
                flexDirection: "column",
                marginTop: hp(dimen.dim_h30),
              }}>
                <View style={{
                  height: hp(dimen.dim_h50),
                  flex: 1,
                  borderRadius: 2,
                  borderWidth: 0.5,
                  marginTop: hp(dimen.dim_h20),
                  overflow: "hidden",
                  borderColor: themeStyle.BLACK,
                  backgroundColor: themeStyle.WHITE,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <TextInput
                    style={{
                      fontSize: FontSize.getSize(14),
                      marginLeft: 10,
                      flex: 1,
                      fontFamily: FontStyle.RobotoRegular,
                    }}
                    placeholder={language.passwordTxt}
                    onChangeText={text => this.setState({ passwordTxt: text })}
                    value={this.state.passwordTxt}
                    multiline={false}
                    numberOfLines={1}
                    contextMenuHidden={true}
                    secureTextEntry={!this.state.passwordVisible}
                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                    autoCorrect={false}
                  />

                  <Icon style={{ marginEnd: 10 }} name={this.state.passwordVisible ? "eye" : "eye-slash"} size={20}
                        color="#000000" onPress={() => {
                    this.setState({ passwordVisible: !this.state.passwordVisible });
                  }} />

                </View>

              </View>

              <View style={{
                marginTop: hp(dimen.dim_h40),
                backgroundColor: themeStyle.THEME_COLOR,
                height: hp(dimen.dim_h48),
                borderRadius: hp(dimen.dim_h48) / 2,
                justifyContent: "center",
                shadowColor: themeStyle.RED_COLOR,
                shadowOpacity: 0.5,
                shadowRadius: 16,
                shadowOffset: {
                  height: 6,
                  width: 2,
                },
              }}>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                                  disabled={this.state.isProgress}
                                  onPress={() =>
                                    this.onSubmit()
                                  }>
                  <Text style={{
                    color: "#fff",
                    fontSize: FontSize.getSize(14),
                    textAlign: "center",
                    fontFamily: FontStyle.RobotoBold,
                  }}>{language.login}</Text>
                </TouchableOpacity>

              </View>

              <TouchableOpacity onPress={() =>
                this.props.navigation.navigate("ForgotPwdScreen", { language: this.props.language })
              }>
                <Text style={{
                  color: themeStyle.THEME_COLOR,
                  fontSize: FontSize.getSize(13),
                  textAlign: "center",
                  marginTop: hp(dimen.dim_h30),
                  fontFamily: FontStyle.RobotoMedium,
                }}>{language.fgt_pwd}</Text></TouchableOpacity>

            </View>
            <BusyIndicator visible={this.state.isProgress} />
          </ScrollView>}
      </View>
    );
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this.focusListener = this.props.navigation.addListener("focus", () => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor(themeStyle.OFF_WHITE_COLOR);
        StatusBar.setBarStyle("dark-content");
      });
    }
  }
}

const styles = {
  label: {
    fontSize: FontSize.getSize(13),
    fontFamily: fontStyle.RobotoRegular,
  },
};


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(SecondTimeLogin);

