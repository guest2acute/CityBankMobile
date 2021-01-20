import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Platform,
  TextInput, Image,
  Keyboard, ScrollView, Alert,
} from "react-native";
import themeStyle from "../../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../../resources/Dimens";
import FontSize from "../../resources/ManageFontSize";
import { BusyIndicator } from "../../resources/busy-indicator";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../../config/Config";
import FontStyle from "../../resources/FontStyle";
import { actions } from "../../redux/actions";
import en from "../../localization/en";
import bangla from "../../localization/bangla";
import Utility from "../../utilize/Utility";
import { createStackNavigator } from "@react-navigation/stack";
import fontStyle from "../../resources/FontStyle";
import RadioForm from "react-native-simple-radio-button";
import {
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import theme from "../../resources/theme.style";
import { CommonActions } from "@react-navigation/native";
import User from "../../utilize/User";
import FingerprintScanner from "react-native-fingerprint-scanner";


let login_props = [
  { label: "Password", value: 0 },
  { label: "Login PIN", value: 1 }
];
let login_props_biometric = [
  { label: "Password", value: 0 },
  { label: "Login PIN", value: 1 },
  { label: "Biometric ", value: 2 },
];

let language_type_prefs = [
  { label: "English", value: "en" },
  { label: "Bangla", value: "bangla" },
];

const Stack = createStackNavigator();
let screenFrom="";
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    screenFrom = props.route.params.screenFrom;
    this.state = {
      alias: "",
      transactionPin: "",
      conf_transPin: "",
      isProgress: false,
      loginPin: "",
      conf_loginPin: "",
      transPinVisible: false,
      loginPinVisible: false,
      login_value: 0,
      language_value: "en",
      imageData: null,
      login_props: login_props
    };

    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        this.setState({ login_props: login_props_biometric });
      })
      .catch((error) => console.log("isSensorAvailable error => ", error));
  }


  /**
   * onSubmit button action
   */

  async onSubmit() {
    if (this.state.transactionPin.length !== 4) {
      Utility.alert("Please set 4 digits transaction pin");
    } else if (this.state.transactionPin !== this.state.conf_transPin) {
      Utility.alert("Confirm transaction pin should be same as transaction pin");
    } else if (this.state.loginPin !== "" && this.state.loginPin.length !== 6) {
      Utility.alert("Please set 6 digits login pin");
    } else if (this.state.loginPin !== this.state.conf_loginPin) {
      Utility.alert("Confirm login pin should be same as login pin");
    } else {
      if (screenFrom === "login") {
        await User.store(Config.UserId, this.props.route.params.userid);
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Navigator" }],
          }),
        );
      } else {
        Utility.alertWithBack("Ok","Successfully updated",this.props.navigation);
      }
    }
  }

  changeLanguage(langCode) {
    console.log("langCode", langCode);
    /* this.props.dispatch({
       type: actions.account.CHANGE_LANG,
       payload: {
         langId: langCode,
       },
     });*/
  }

  openGallery() {
    let options = {
      mediaType: "photo",
      maxWidth: 200,
      base64: true,
      maxHeight: 200,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        return;
      } else if (response.errorCode === "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode === "others") {
        alert(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      this.setState({ imageData: response.uri });
    });
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
          {screenFrom !== "login" ? <TouchableOpacity
            style={{ marginStart: 5, width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
            onPress={() => this.props.navigation.goBack(null)}>
            <Image style={{ width: 15, height: 17, tintColor: theme.WHITE }}
                   source={Platform.OS === "android" ?
                     require("../../resources/images/ic_back_android.png") : require("../../resources/images/ic_back_ios.png")} />
          </TouchableOpacity> : <View style={{ width: 15}}/>}
          <Text style={{
            flex: 1,
            color: theme.WHITE,
            fontFamily: fontStyle.RobotoMedium,
            fontSize: FontSize.getSize(16),
          }}>Profile Settings</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View style={{
            marginLeft: wp(dimen.dim_w20),
            marginRight: wp(dimen.dim_w20),
            marginTop: 10,
          }}>

            <TouchableOpacity onPress={() => this.openGallery()}>
              <View style={{
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: hp(dimen.dim_h10),
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#000000",
              }}>
                <Image
                  source={this.state.imageData === null ? require("../../resources/images/userimg.png") :
                    { uri: this.state.imageData }}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    overflow: "hidden",
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{
              flexDirection: "column",
              marginTop: hp(dimen.dim_h10),
            }}>

              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
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
                  placeholder={language.alias}
                  onChangeText={text => this.setState({ alias: text })}
                  value={this.state.alias}
                  multiline={false}
                  numberOfLines={1}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                  contextMenuHidden={true}
                  minLenght={8}
                  // autoFocus={true}
                />

              </View>

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
                  placeholder={language.transactionPin}
                  onChangeText={text => this.setState({ transactionPin: text })}
                  value={this.state.transactionPin}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  secureTextEntry={!this.state.transPinVisible}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}
                  maxLength={4}
                />

                <Icon style={{ marginEnd: 10 }} name={this.state.transPinVisible ? "eye" : "eye-slash"} size={20}
                      color="#000000" onPress={() => {
                  this.setState({ transPinVisible: !this.state.transPinVisible });
                }} />

              </View>
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
                  placeholder={language.conf_trans_pin}
                  onChangeText={text => this.setState({ conf_transPin: text })}
                  value={this.state.conf_transPin}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}
                  maxLength={4}
                />
              </View>

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
                  placeholder={language.loginPin}
                  onChangeText={text => this.setState({ loginPin: text })}
                  value={this.state.loginPin}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  contextMenuHidden={true}
                  secureTextEntry={!this.state.loginPinVisible}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={6}
                />

                <Icon style={{ marginEnd: 10 }} name={this.state.loginPinVisible ? "eye" : "eye-slash"} size={20}
                      color="#000000" onPress={() => {
                  this.setState({ loginPinVisible: !this.state.loginPinVisible });
                }} />

              </View>

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
                  placeholder={language.conf_loginPin}
                  onChangeText={text => this.setState({ conf_loginPin: text })}
                  value={this.state.conf_loginPin}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}
                  maxLength={6}
                />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={{
                  fontSize: FontSize.getSize(15),
                  fontFamily: fontStyle.RobotoMedium, marginStart: wp(dimen.dim_w5),
                  marginTop: hp(dimen.dim_h20),
                }}>
                  {language.login_type}</Text>

                <RadioForm
                  radio_props={this.state.login_props}
                  initial={0}
                  buttonSize={9}
                  selectedButtonColor={themeStyle.THEME_COLOR}
                  formHorizontal={true}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={themeStyle.GRAY_COLOR}
                  labelColor={themeStyle.BLACK_43}
                  labelStyle={{
                    marginStart: -4,
                    marginEnd: 8,
                    fontFamily: fontStyle.RobotoRegular,
                    fontSize: FontSize.getSize(12),
                  }}
                  style={{ marginStart: wp(dimen.dim_w5), marginTop: hp(dimen.dim_h10) }}
                  animation={true}
                  onPress={(value) => {
                    this.setState({ login_value: value });
                  }}
                />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={{
                  fontSize: FontSize.getSize(15),
                  fontFamily: fontStyle.RobotoMedium, marginStart: wp(dimen.dim_w5),
                  marginTop: hp(dimen.dim_h20),
                }}>
                  {language.language_type}</Text>

                <RadioForm
                  radio_props={language_type_prefs}
                  initial={0}
                  buttonSize={9}
                  selectedButtonColor={themeStyle.THEME_COLOR}
                  formHorizontal={true}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={themeStyle.GRAY_COLOR}
                  labelColor={themeStyle.BLACK_43}
                  labelStyle={{
                    marginStart: -4,
                    marginEnd: 8,
                    fontFamily: fontStyle.RobotoRegular,
                    fontSize: FontSize.getSize(12),
                  }}
                  style={{ marginStart: wp(dimen.dim_w5), marginTop: hp(dimen.dim_h10) }}
                  animation={true}
                  onPress={(value) => {
                    console.log("language_value", value);
                    this.setState({ language_value: value }, () => {
                      this.changeLanguage(value);
                    });

                  }}
                />
              </View>


            </View>

            <View style={{
              marginTop: hp(dimen.dim_h40),
              backgroundColor: themeStyle.THEME_COLOR,
              height: hp(dimen.dim_h48),
              borderRadius: hp(dimen.dim_h48) / 2,
              justifyContent: "center",
              shadowColor: themeStyle.THEME_COLOR,
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
                  color: themeStyle.WHITE,
                  fontSize: FontSize.getSize(14),
                  textAlign: "center",
                  fontFamily: FontStyle.RobotoBold,
                }}>{language.submit_txt}</Text>

              </TouchableOpacity>

            </View>

          </View>
          <BusyIndicator visible={this.state.isProgress} />
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


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(EditProfileScreen);

