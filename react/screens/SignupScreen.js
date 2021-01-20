import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Platform,
  TextInput, Image,
  Keyboard, ScrollView, Alert, ToastAndroid,
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
import CheckBox from "@react-native-community/checkbox";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";
import RadioForm from "react-native-simple-radio-button";
import Utility from "../utilize/Utility";

let title = "", sign_up_type = "";
let userId_props = [
  { label: "User ID", value: 0 },
  { label: "Preferred User ID", value: 1 },
];

let otp_props = [
  { label: "SMS", value: 0 },
  { label: "Email", value: 1 },
  { label: "Both", value: 2 },
];

class SignupScreen extends Component {

  constructor(props) {
    super(props);
    title = props.route.params.title;
    sign_up_type = props.route.params.sign_up_type;
    this.state = {
      acc_no: "",
      acc_name: "",
      isProgress: false,
      mobile: "987XXX321",
      conf_mobile: "",
      email: "abc.XXX@gmail.com",
      conf_email: "",
      user_id: "",
      isTerm: false,
      user_id_value: 0,
      otp_value: 0,
      showOtherDetails: false,
      isShowingAccountName: false,
    };
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


  processNext() {
    if (!this.state.isShowingAccountName) {
      if (sign_up_type === "act_no" && this.state.acc_no.length !== 13) {
        Utility.alert("Please enter 13 digits Account Number");
      } else if (sign_up_type === "credit_card" && this.state.acc_no.length !== 15) {
        Utility.alert("Please enter 15 digits credit card Number");
      } else if (sign_up_type === "prepaid_card" && this.state.acc_no.length !== 16) {
        Utility.alert("Please enter 16 digits card Number");
      } else {
        this.setState({ isShowingAccountName: true });
      }
    }/* else if (!this.state.showOtherDetails) {
      this.setState({ showOtherDetails: true });
    }*/ else if (this.state.conf_mobile.length !== 10) {
      Utility.alert("Please enter 10 digits confirm mobile number");
    } else if (this.state.conf_email === "") {
      Utility.alert("Please enter confirm email address");
    } else if (!Utility.validateEmail(this.state.conf_email)) {
      Utility.alert("Invalid confirm email address");
    }

    /* else if (this.state.user_id_value === 1 && this.state.user_id === "") {
      Utility.alert("Please enter userid");
    } else if (this.state.user_id_value === 1 && this.state.user_id.length < 8) {
      Utility.alert("Userid length should be minimum 8");
    }
    else if (!this.state.isTerm) {
      Utility.alert("Please accept terms & conditions");
    }*/ else {
      this.props.navigation.replace("SignupDebitCardScreen", {
        sign_up_type: sign_up_type,
        title: title,
      });
    }
  }

  reset() {
    this.setState({
      acc_no: "",
      acc_name: "",
      conf_mobile: "",
      conf_email: "",
      user_id: "",
      isTerm: false,
      user_id_value: 0,
      otp_value: 0,
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
          }}>{title}</Text>
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
              {!this.state.showOtherDetails ? <View>
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
                    placeholder={sign_up_type === "act_no" ? language.acc_no : language.card_no}
                    onChangeText={text => this.setState({ acc_no: text, isShowingAccountName: false })}
                    value={this.state.acc_no}
                    multiline={false}
                    numberOfLines={1}
                    keyboardType={"number-pad"}
                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                    autoCorrect={false}
                    maxLength={sign_up_type === "act_no" ? 13 : sign_up_type === "credit_card" ? 15 : 16}
                    contextMenuHidden={true}
                    // autoFocus={true}
                  />

                </View>
                {this.state.isShowingAccountName ? <View style={{
                  height: hp(dimen.dim_h50),
                  flex: 1,
                  borderRadius: 2,
                  borderWidth: 0.5,
                  marginTop: hp(dimen.dim_h20),
                  overflow: "hidden",
                  borderColor: themeStyle.BLACK,
                  backgroundColor: themeStyle.DISABLE_TEXT,
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
                    placeholder={sign_up_type === "act_no" ? language.acc_name : sign_up_type === "credit_card" ? language.creditcard_name : language.prepaidcard_name}
                    onChangeText={text => this.setState({ acc_name: text })}
                    value={this.state.acc_name}
                    editable={false}
                    multiline={false}
                    numberOfLines={1}
                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                    autoCorrect={false}
                    contextMenuHidden={true}
                  />
                </View> : null}

              </View> : null}

              {this.state.isShowingAccountName ?
                <View><View style={{
                  height: hp(dimen.dim_h50),
                  flex: 1,
                  borderRadius: 2,
                  borderWidth: 0.5,
                  marginTop: hp(dimen.dim_h20),
                  overflow: "hidden",
                  borderColor: themeStyle.BLACK,
                  backgroundColor: themeStyle.DISABLE_TEXT,
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
                    placeholder={language.mobile}
                    onChangeText={text => this.setState({ mobile: text })}
                    value={this.state.mobile}
                    multiline={false}
                    editable={false}
                    numberOfLines={1}
                    keyboardType={"phone-pad"}
                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                    autoCorrect={false}
                    contextMenuHidden={true}
                    maxLength={10}
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
                      placeholder={language.conf_mobile}
                      onChangeText={text => this.setState({ conf_mobile: text })}
                      value={this.state.conf_mobile}
                      multiline={false}
                      numberOfLines={1}
                      keyboardType={"phone-pad"}
                      placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                      autoCorrect={false}
                      contextMenuHidden={true}
                      maxLength={10}
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
                    backgroundColor: themeStyle.DISABLE_TEXT,
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
                      placeholder={language.email}
                      onChangeText={text => this.setState({ email: text })}
                      value={this.state.email}
                      multiline={false}
                      editable={false}
                      numberOfLines={1}
                      keyboardType={"email-address"}
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
                    marginTop: hp(dimen.dim_h20),
                    marginBottom: hp(dimen.dim_h20),
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
                      placeholder={language.conf_email}
                      onChangeText={text => this.setState({ conf_email: text })}
                      value={this.state.conf_email}
                      multiline={false}
                      numberOfLines={1}
                      keyboardType={"email-address"}
                      placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                      autoCorrect={false}
                      contextMenuHidden={true}
                    />
                  </View>

                  {/*<RadioForm
                    radio_props={userId_props}
                    initial={0}
                    buttonSize={9}
                    selectedButtonColor={themeStyle.THEME_COLOR}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={themeStyle.GRAY_COLOR}
                    labelColor={themeStyle.BLACK_43}
                    labelStyle={{
                      marginStart: -4,
                      marginEnd: 8,
                      fontFamily: fontStyle.RobotoRegular,
                      fontSize: FontSize.getSize(12),
                    }}
                    style={{ marginStart: wp(dimen.dim_w10) }}
                    borderWidth={1}
                    animation={true}
                    onPress={(value) => {
                      this.setState({ user_id_value: value, user_id: "" });
                    }}
                  />

                  <View style={{
                    height: hp(dimen.dim_h50),
                    flex: 1,
                    borderRadius: 2,
                    borderWidth: 0.5,
                    marginTop: hp(dimen.dim_h10),
                    overflow: "hidden",
                    borderColor: themeStyle.BLACK,
                    backgroundColor: this.state.user_id_value === 1 ? themeStyle.WHITE : themeStyle.DISABLE_TEXT,
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
                      placeholder={language.user_id_enter}
                      onChangeText={text => this.setState({ user_id: text })}
                      value={this.state.user_id}
                      editable={this.state.user_id_value === 1}
                      multiline={false}
                      numberOfLines={1}
                      contextMenuHidden={true}
                      placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                      autoCorrect={false}
                      maxLength={12}
                    />
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <Text style={{
                      fontSize: FontSize.getSize(15),
                      fontFamily: fontStyle.RobotoMedium, marginStart: wp(dimen.dim_w10),
                      marginTop: hp(dimen.dim_h20),
                    }}>
                      {language.otp_type}</Text>

                    <RadioForm
                      radio_props={otp_props}
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
                      style={{ marginStart: wp(dimen.dim_w10), marginTop: hp(dimen.dim_h10) }}
                      animation={true}
                      onPress={(value) => {
                        this.setState({ otp_props: value });
                      }}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      disabled={false}
                      onValueChange={(newValue) => this.setState({ isTerm: newValue })}
                      value={this.state.isTerm}
                      style={styles.checkbox}
                      tintColor={themeStyle.THEME_COLOR}
                      tintColors={{ true: themeStyle.THEME_COLOR, false: themeStyle.GRAY_COLOR }}
                    />
                    <Text>
                      <Text style={styles.label}>{language.read_term}</Text>
                      <Text style={[styles.label, {
                        textDecorationLine: "underline",
                        marginStart: 35,
                      }]}>{language.term_condition}</Text>
                    </Text>

                  </View>*/}
                </View> : null}
              <View style={{
                marginTop: hp(dimen.dim_h40),
                marginBottom: hp(dimen.dim_h20),
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
                                  onPress={() => this.processNext()
                                  }>
                  <Text style={{
                    color: themeStyle.WHITE,
                    fontSize: FontSize.getSize(14),
                    textAlign: "center",
                    fontFamily: FontStyle.RobotoBold,
                  }}>{!this.state.isShowingAccountName ? language.submit_txt : language.next}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>);
  }

}

const styles = {
  checkboxContainer: {
    flexDirection: "row",
    marginTop: hp(dimen.dim_h10),
    alignItems: "center",
  },
  checkbox: {
    height: 15,
  },
  label: {
    fontSize: FontSize.getSize(14),
    fontFamily: fontStyle.RobotoRegular,
  },
};


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(SignupScreen);
