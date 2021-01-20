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
import en from "../localization/en";
import bangla from "../localization/bangla";
import Utility from "../utilize/Utility";

import DropDownPicker from "react-native-dropdown-picker";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";

let type_pref = [
  { label: "Select Type", value: -1 },
  { label: "Forgot User ID", value: 0 },
  { label: "Forgot Password", value: 1 },
  { label: "Forgot Both User ID & Password", value: 2 },
];

let act_type = [
  { label: "Select Account Type", value: -1 },
  { label: "Account Number", value: 0 },
  { label: "Credit Card Number", value: 1 },
];

class ForgotPwdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acc_no: "",
      card_no: "",
      isProgress: false,
      et_pin: "",
      userid: "",
      type_val: -1,
      account_type_val: -1,
      cards_select : [
        { label: "Select Your Card", value: -1 },
      ],
      card_val:-1
    };
  }


  /**
   * onSubmit button action
   */

  async onSubmit() {
    if (this.state.type_val === -1) {
      Utility.alert("Please select type");
    } else if (this.state.account_type_val === -1) {
      Utility.alert("Please select account type");
    }else if (this.state.acc_no === "") {
      Utility.alert("Please enter account number");
    }
    else if (this.state.card_no === "") {
      Utility.alert("Please enter card number");
    }

   /* else if (this.state.card_val === -1) {
      Utility.alert("Please select your card");
    }*/

    else if (this.state.et_pin === "") {
      Utility.alert("Please enter pin");
    }
    else if (this.state.userid === "") {
      Utility.alert("Please enter user id");
    } else if (this.state.userid.length < 8) {
      Utility.alert("Invalid user id");
    } else
      await this.props.navigation.goBack(null);
  }

  async redirect() {
    this.props.navigation.replace("UploadUserDetails", { language: this.props.language });
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
          flexDirection: "row",
          justifyContent: "center",
          height: hp(dimen.dim_h60),
          backgroundColor: theme.THEME_COLOR,
          alignItems: "center",
        }}>
          <TouchableOpacity
            style={{ marginStart: 10, width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
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
          }}>Forgot Password</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View style={{
            marginLeft: wp(dimen.dim_w30),
            marginRight: wp(dimen.dim_w30),
          }}>

            <View style={{
              flexDirection: "column",
              marginTop: hp(dimen.dim_h40),
            }}>

              <DropDownPicker
                style={{ flex: 1 }}
                labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                items={type_pref}
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
                onChangeItem={item => this.setState({ type_val: item.value })}
              />

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
                marginBottom: hp(dimen.dim_h10),
              }}>

                <TextInput
                  style={{
                    fontSize: FontSize.getSize(14),
                    marginLeft: 10,
                    flex: 1,
                    fontFamily: FontStyle.RobotoRegular,
                  }}
                  placeholder={language.acc_no}
                  onChangeText={text => this.setState({ acc_no: text })}
                  value={this.state.acc_no}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                  // autoFocus={true}
                />

              </View>

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
                marginBottom: hp(dimen.dim_h10),
              }}>

                <TextInput
                  style={{
                    fontSize: FontSize.getSize(14),
                    marginLeft: 10,
                    flex: 1,
                    fontFamily: FontStyle.RobotoRegular,
                  }}
                  placeholder={language.card_no}
                  onChangeText={text => this.setState({ card_no: text })}
                  value={this.state.card_no}
                  multiline={false}
                  numberOfLines={1}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                  // autoFocus={true}
                />

              </View>

              <DropDownPicker
                style={{ flex: 1 }}
                labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
                items={this.state.cards_select}
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
                onChangeItem={item => this.setState({ card_val: item.value })}
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
                marginBottom: hp(dimen.dim_h10),
              }}>

                <TextInput
                  style={{
                    fontSize: FontSize.getSize(14),
                    marginLeft: 10,
                    flex: 1,
                    fontFamily: FontStyle.RobotoRegular,
                  }}
                  placeholder={language.et_pin}
                  onChangeText={text => this.setState({ et_pin: text })}
                  value={this.state.et_pin}
                  multiline={false}
                  numberOfLines={1}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                  // autoFocus={true}
                />

              </View>

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
                marginBottom: hp(dimen.dim_h10),
              }}>
                <TextInput
                  style={{
                    fontSize: FontSize.getSize(14),
                    marginLeft: 10,
                    flex: 1,
                    fontFamily: FontStyle.RobotoRegular,
                  }}
                  placeholder={language.user_ID}
                  onChangeText={text => this.setState({ userid: text })}
                  value={this.state.userid}
                  multiline={false}
                  numberOfLines={1}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
                />

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

export default connect(mapStateToProps)(ForgotPwdScreen);

