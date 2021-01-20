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

import DropDownPicker from "react-native-dropdown-picker";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";

let act_type = [
  { label: "Select Account Type", value: -1 },
  { label: "Account Number", value: 0 },
  { label: "Card Number", value: 1 },
];

class ChangePwdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mmyy_txt:"",
      confirm_pwd_txt: "",
      new_pwd_txt: "",
      isProgress: false,
      et_pin: "",
      account_type_val: -1,
      tran_pin:""
    };
  }


  /**
   * onSubmit button action
   */

  async onSubmit() {
    if (this.state.account_type_val === -1) {
      Utility.alert("Please select account type");
    }
    else if (this.state.mmyy_txt === "") {
      Utility.alert("Please enter expiry MM/YY");
    }
    else if (this.state.et_pin === "") {
      Utility.alert("Please enter card  pin");
    }
    else if (this.state.new_pwd_txt === "") {
      Utility.alert("Please enter new password");
    } else if (this.state.confirm_pwd_txt === "") {
      Utility.alert("Confirm password does not match with new password");
    } else
      await this.props.navigation.goBack(null);
  }

  async redirect() {
    Utility.alertWithBack("OK","Successfully changed");
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

  onchangeDebitInfo(text) {
    if (text.length === 2 && text.indexOf("/") === -1) {
      text = text + "/";
    }
    this.setState({ mmyy_txt: text });
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
            style={{ marginStart: 5, width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
            onPress={() => this.props.navigation.goBack(null)}>
            <Image style={{ width: 15, height: 17, tintColor: theme.WHITE }}
                   source={Platform.OS === "android" ?
                     require("../resources/images/ic_back_android.png") : require("../resources/images/ic_back_ios.png")} />
          </TouchableOpacity>
          <Text style={{
            flex: 1,
            color: theme.WHITE,
            fontFamily: fontStyle.RobotoMedium,
            fontSize: FontSize.getSize(16),
          }}>Change Password</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View style={{
            marginLeft: wp(dimen.dim_w20),
            marginRight: wp(dimen.dim_w20),
          }}>

            <View style={{
              flexDirection: "column",
              marginTop: hp(dimen.dim_h40),
            }}>

              <DropDownPicker
                style={{ flex: 1 }}
                labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                items={act_type}
                defaultValue={-1}
                style={{
                  flex: 1,
                  borderColor: themeStyle.BLACK,
                  backgroundColor: themeStyle.WHITE,
                  borderWidth: 0.5,
                  borderRadius: 2,
                  alignItems: "center",
                  marginBottom: hp(dimen.dim_h10),
                }}
                itemStyle={{
                  justifyContent: "flex-start", color: themeStyle.BLACK, fontSize: FontSize.getSize(14),
                  fontFamily: FontStyle.RobotoRegular, paddingLeft: 10,
                }}
                onChangeItem={item => this.setState({ account_type_val: item.value })}
              />

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
                    color: themeStyle.BLACK_43,
                  }}
                  placeholder={language.mmyy_txt}
                  onChangeText={text => this.onchangeDebitInfo(text)}
                  value={this.state.mmyy_txt}
                  multiline={false}mmyy_txt
                  numberOfLines={1}
                  maxLength={5}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}
                  // autoFocus={true}
                />
              </View>

              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
                marginTop: hp(dimen.dim_h10),
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
                    color: themeStyle.BLACK_43,
                  }}
                  placeholder={language.enter_pin}
                  onChangeText={text => this.setState({ et_pin: text })}
                  value={this.state.et_pin}
                  multiline={false}
                  maxLength={6}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}

                />
              </View>
              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
                marginTop: hp(dimen.dim_h10),
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
                    color: themeStyle.BLACK_43,
                  }}
                  placeholder={language.et_transPin}
                  onChangeText={text => this.setState({ tran_pin: text })}
                  value={this.state.tran_pin}
                  multiline={false}
                  maxLength={6}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}

                />
              </View>

              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
                marginTop: hp(dimen.dim_h10),
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
                    color: themeStyle.BLACK_43,
                  }}
                  placeholder={language.er_otpPin}
                  onChangeText={text => this.setState({ otpPin: text })}
                  value={this.state.otpPin}
                  multiline={false}
                  numberOfLines={1}
                  maxLength={4}
                  keyboardType={"number-pad"}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}

                />
              </View>

              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
                overflow: "hidden",
                marginTop: hp(dimen.dim_h10),
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
                  placeholder={language.new_pwd_txt}
                  onChangeText={text => this.setState({ new_pwd_txt: text })}
                  value={this.state.new_pwd_txt}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={4}
                  // autoFocus={true}
                />

              </View>
              <View style={{
                height: hp(dimen.dim_h50),
                flex: 1,
                borderRadius: 2,
                borderWidth: 0.5,
                overflow: "hidden",
                marginTop: hp(dimen.dim_h10),
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
                  placeholder={language.confirm_pwd_txt}
                  onChangeText={text => this.setState({ confirm_pwd_txt: text })}
                  value={this.state.confirm_pwd_txt}
                  multiline={false}
                  numberOfLines={1}

                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                  // autoFocus={true}
                />

              </View>

            </View>

            <View style={{
              marginTop: hp(dimen.dim_h30),
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

export default connect(mapStateToProps)(ChangePwdScreen);

