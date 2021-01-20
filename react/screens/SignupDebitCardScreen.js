import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Platform,
  TextInput, Image,
  Keyboard, ScrollView, Alert, TouchableWithoutFeedback,
} from "react-native";
import themeStyle from "../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import FontSize from "../resources/ManageFontSize";
import { BusyIndicator } from "../resources/busy-indicator";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import FontStyle from "../resources/FontStyle";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { NavigationActions, StackActions } from "react-navigation";
import Utility from "../utilize/Utility";
import RadioForm from "react-native-simple-radio-button";
import CheckBox from "@react-native-community/checkbox";
import Config from "../config/Config";
import { CommonActions } from "@react-navigation/native";

let title, sign_up_type;
let otp_props = [
  { label: "SMS", value: 0 },
  { label: "Email", value: 1 },
  { label: "Both", value: 2 },
];

class SignupDebitCardScreen extends Component {
  constructor(props) {
    super(props);
    title = props.route.params.title;
    sign_up_type = props.route.params.sign_up_type;
    this.state = {
      currentSelection: "",
      date: new Date(),
      mode: "date",
      show: false,
      debit_card_mm_yy: "",
      pin: "",
      isProgress: false,
      fatherName: "",
      motherName: "",
      date_of_birth: "",
      last_trans_date: "",
      last_trans_amt: "",
      trans_pin: "",
      user_id: "",
      password: "",
      loginpin: "",
      loginPwdVisible: false,
      loginPinVisible: false,
      otp_value: 0,
      isOtpSent: false,
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


  onchangeDebitInfo(text) {
    if (text.length === 2 && text.indexOf("/") === -1) {
      text = text + "/";
    }
    this.setState({ debit_card_mm_yy: text });
  }

  showDatepicker = (id) => {
    this.setState({ currentSelection: id, show: true, mode: "date" });
  };


  onChange = (event, selectedDate) => {
    console.log("selectedDate", selectedDate);
    let currentDate = selectedDate === "" ? new Date() : selectedDate;
    currentDate = moment(currentDate).format("DD-MMM-YYYY");
    if (this.state.currentSelection === 1)
      this.setState({ date: selectedDate, date_of_birth: currentDate, show: false });
    else
      this.setState({ date: selectedDate, last_trans_date: currentDate, show: false });
  };

  onSubmit() {
    if (this.state.debit_card_mm_yy === "") {
      Utility.alert("Please enter Expiry month/year");
    } else if (this.state.pin.length !== 6) {
      Utility.alert("Please enter 6 digits pin");
    } else if (this.state.fatherName === "") {
      Utility.alert("Please enter father name");
    } else if (this.state.motherName === "") {
      Utility.alert("Please enter mother name");
    } else if (this.state.date_of_birth === "") {
      Utility.alert("Please enter date of birth");
    } else if (this.state.last_trans_date === "") {
      Utility.alert("Please select last transaction date");
    } else if (this.state.last_trans_amt === "") {
      Utility.alert("Please enter last transaction amount");
    } else if (this.state.trans_pin.length !== 4) {
      Utility.alert("Please set 4 digits transaction pin");
    } else if (this.state.user_id === "") {
      Utility.alert("Please set user id");
    } else if (this.state.user_id.length < 8) {
      Utility.alert("Length of user id should be 8 to 12 characters");
    } else if (this.state.password === "") {
      Utility.alert("Please set password");
    } else if (this.state.loginpin.length !== 6) {
      Utility.alert("Please set 6 digits login pin");
    } else if (!this.state.isTerm) {
      Utility.alert("Please accept terms & conditions");
    } else if (this.state.otpPin.length !== 4) {
      Utility.alert("Please set 4 digits login pin");
    } else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        })
      );
    }
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
          }}>Card Information</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View style={{
            marginLeft: wp(dimen.dim_w30),
            marginRight: wp(dimen.dim_w30),
          }}>

            <Text style={{
              color: themeStyle.BLACK_43,
              fontSize: FontSize.getSize(14),
              textAlign: "center",
              fontFamily: FontStyle.RobotoMedium,
              marginTop: hp(dimen.dim_h20),
            }}>{sign_up_type === "act_no" ? language.provide_debit_card : sign_up_type === "credit_card" ? language.provide_credit_card : language.provide_prepaid_card}</Text>

            <View style={{
              flexDirection: "column",
              marginTop: hp(dimen.dim_h20),
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
                    color: themeStyle.BLACK_43,
                  }}
                  placeholder={language.mmyy_txt}
                  onChangeText={text => this.onchangeDebitInfo(text)}
                  value={this.state.debit_card_mm_yy}
                  multiline={false}
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
                  onChangeText={text => this.setState({ pin: text })}
                  value={this.state.pin}
                  multiline={false}
                  maxLength={6}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  contextMenuHidden={true}

                />
              </View>

              {sign_up_type === "act_no" ?
                <View><View style={{
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
                    placeholder={language.et_father_name}
                    onChangeText={text => this.setState({ fatherName: text })}
                    value={this.state.fatherName}
                    multiline={false}
                    numberOfLines={1}
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
                      placeholder={language.et_mother_name}
                      onChangeText={text => this.setState({ motherName: text })}
                      value={this.state.motherName}
                      multiline={false}
                      numberOfLines={1}
                      placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                      autoCorrect={false}
                      contextMenuHidden={true}
                    />
                  </View>
                  <TouchableWithoutFeedback onPress={() => this.showDatepicker(1)}>
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
                        placeholder={language.et_dob}
                        value={this.state.date_of_birth}
                        editable={false}
                        multiline={false}
                        numberOfLines={1}
                        contextMenuHidden={true}
                        placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                        autoCorrect={false}
                      />

                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.showDatepicker(2)}>
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
                        placeholder={language.et_last_trans}
                        value={this.state.last_trans_date}
                        multiline={false}
                        editable={false}
                        numberOfLines={1}
                        contextMenuHidden={true}
                        placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                        autoCorrect={false}
                      />
                    </View>
                  </TouchableWithoutFeedback>
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
                      placeholder={language.et_last_trans_amount}
                      onChangeText={text => this.setState({ last_trans_amt: text })}
                      value={this.state.last_trans_amt}
                      multiline={false}
                      keyboardType={"number-pad"}
                      numberOfLines={1}
                      contextMenuHidden={true}
                      placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                      autoCorrect={false}
                      maxLength={12}
                    />
                  </View></View> : null}

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
                  placeholder={language.transactionPin}
                  onChangeText={text => this.setState({ trans_pin: text })}
                  value={this.state.trans_pin}
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
                  placeholder={language.et_set_user_id}
                  onChangeText={text => this.setState({ user_id: text })}
                  value={this.state.user_id}
                  multiline={false}
                  numberOfLines={1}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}
                  maxLength={12}
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
                  placeholder={sign_up_type === "act_no" ? language.er_set_pwd : language.pwd}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.password}
                  multiline={false}
                  numberOfLines={1}
                  contextMenuHidden={true}
                  secureTextEntry={!this.state.loginPwdVisible}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}

                />
                <Icon style={{ marginEnd: 10 }} name={this.state.loginPwdVisible ? "eye" : "eye-slash"} size={20}
                      color="#000000" onPress={() => {
                  this.setState({ loginPwdVisible: !this.state.loginPwdVisible });
                }} />
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
                  placeholder={language.loginPin}
                  onChangeText={text => this.setState({ loginpin: text })}
                  value={this.state.loginpin}
                  multiline={false}
                  numberOfLines={1}
                  keyboardType={"number-pad"}
                  maxLength={6}
                  secureTextEntry={!this.state.loginPinVisible}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}

                />
                <Icon style={{ marginEnd: 10 }} name={this.state.loginPinVisible ? "eye" : "eye-slash"} size={20}
                      color="#000000" onPress={() => {
                  this.setState({ loginPinVisible: !this.state.loginPinVisible });
                }} />
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
                    this.setState({ otp_value: value });
                  }}
                />
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox
                  disabled={false}
                  onValueChange={(newValue) => this.setState({ isTerm: newValue, isOtpSent: newValue, otpPin: "" })}
                  value={this.state.isTerm}
                  style={styles.checkbox}
                  tintColor={themeStyle.THEME_COLOR}
                  tintColors={{ true: themeStyle.THEME_COLOR, false: themeStyle.GRAY_COLOR }}
                />
                <Text>
                  <Text style={styles.label}>{language.read_term}</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("WebScreen",
                    { load_url: Config.termConditionURl, title: language.term_condition_title })}>
                    <Text style={[styles.label, {
                      textDecorationLine: "underline",
                    }]}>{language.term_condition}</Text>
                  </TouchableOpacity>
                </Text>

              </View>

              {this.state.isOtpSent ? <View style={{
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
                  secureTextEntry={!this.state.loginPinVisible}
                  contextMenuHidden={true}
                  placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                  autoCorrect={false}

                />
                <Icon style={{ marginEnd: 10 }} name={this.state.loginPinVisible ? "eye" : "eye-slash"} size={20}
                      color="#000000" onPress={() => {
                  this.setState({ loginPinVisible: !this.state.loginPinVisible });
                }} />
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

          </View>
        </ScrollView>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={false}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>);
  }

}

const styles = {
  checkboxContainer: {
    flexDirection: "row",
    marginTop: hp(dimen.dim_h10),
  },
  checkbox: {
    height: 10,
    marginTop: 7,
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

export default connect(mapStateToProps)(SignupDebitCardScreen);
