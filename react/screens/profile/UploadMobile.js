import React, { Component } from "react";
import { Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import themeStyle from "../../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../../resources/Dimens";
import theme from "../../resources/theme.style";
import fontStyle from "../../resources/FontStyle";
import FontSize from "../../resources/ManageFontSize";
import DropDownPicker from "react-native-dropdown-picker";
import FontStyle from "../../resources/FontStyle";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import Utility from "../../utilize/Utility";

let account_type = [
  { label: "Select Account Type", value: -1 },
  { label: "Account Number", value: 0 },
  { label: "Credit Card Number", value: 1 },
];

let card_type = [
  { label: "Select Card", value: -1 },
];

let accountNo_list = [
  { label: "Select Account Number", value: -1 },
];


class UploadMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_val: -1,
      card_val: -1,
      accountNo_val:-1,
      card_mm_yy: "",
      trans_pin:"",
      current_mobile_no:"02 8331040",
      new_mobile_no:"",
    };
  };

  onchangeDebitInfo(text) {
    if (text.length === 2 && text.indexOf("/") === -1) {
      text = text + "/";
    }
    this.setState({ card_mm_yy: text });
  }


  render() {
    let language = this.props.language;
    return (<View style={{ flex: 1, backgroundColor: themeStyle.BG_COLOR }}>
      <SafeAreaView />
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        height: hp(dimen.dim_h60),
        backgroundColor: theme.THEME_COLOR,
        alignItems: "center",
      }}>
        <TouchableOpacity
          style={{marginLeft:5,  width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
          onPress={() => this.props.navigation.goBack(null)}>
          <Image style={{ width: 15, height: 17, tintColor: theme.WHITE }}
                 source={Platform.OS === "android" ?
                   require("../../resources/images/ic_back_android.png") : require("../../resources/images/ic_back_ios.png")} />
        </TouchableOpacity>
        <Text style={{
          flex: 1,
          color: theme.WHITE,
          fontFamily: fontStyle.RobotoMedium,
          fontSize: FontSize.getSize(16),
        }}>Update Mobile Number</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handle">
        <View style={{
          marginLeft: wp(dimen.dim_w20),
          marginRight: wp(dimen.dim_w20),
        }}>

          <Text style={[styles.labelStyle, { marginTop: hp(dimen.dim_h20) }]}>Select Account Type</Text>
          <DropDownPicker
            style={{ flex: 1 }}
            labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            items={account_type}
            defaultValue={-1}
            style={{
              flex: 1,
              borderColor: themeStyle.BLACK,
              backgroundColor: themeStyle.WHITE,
              borderWidth: 0.5,
              borderRadius: 2,
              alignItems: "center",
            }}
            itemStyle={{
              justifyContent: "flex-start", color: themeStyle.BLACK, fontSize: FontSize.getSize(14),
              fontFamily: FontStyle.RobotoRegular, paddingLeft: 10,
            }}
            onChangeItem={item => this.setState({ account_val: item.value })}
          />

          <Text style={styles.labelStyle}>Card</Text>
          <DropDownPicker
            style={{ flex: 1 }}
            labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            items={card_type}
            defaultValue={-1}
            style={{
              flex: 1,
              borderColor: themeStyle.BLACK,
              backgroundColor: themeStyle.WHITE,
              borderWidth: 0.5,
              borderRadius: 2,
              alignItems: "center",
            }}
            itemStyle={{
              justifyContent: "flex-start", color: themeStyle.BLACK, fontSize: FontSize.getSize(14),
              fontFamily: FontStyle.RobotoRegular, paddingLeft: 10,
            }}
            onChangeItem={item => this.setState({ card_val: item.value })}
          />

          <Text style={styles.labelStyle}>Expiry Date</Text>
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
              placeholder={language.mmyy}
              onChangeText={text => this.onchangeDebitInfo(text)}
              value={this.state.card_mm_yy}
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

          <Text style={styles.labelStyle}>PIN</Text>
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

          <Text style={styles.labelStyle}>Account Number</Text>
          <DropDownPicker
            style={{ flex: 1 }}
            labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            items={accountNo_list}
            defaultValue={-1}
            style={{
              flex: 1,
              borderColor: themeStyle.BLACK,
              backgroundColor: themeStyle.WHITE,
              borderWidth: 0.5,
              borderRadius: 2,
              alignItems: "center",
            }}
            itemStyle={{
              justifyContent: "flex-start", color: themeStyle.BLACK, fontSize: FontSize.getSize(14),
              fontFamily: FontStyle.RobotoRegular, paddingLeft: 10,
            }}
            onChangeItem={item => this.setState({ accountNo_val: item.value })}
          />

          <Text style={styles.labelStyle}>Transaction PIN</Text>
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

          <Text style={styles.labelStyle}>{language.current_mobile_no}</Text>
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
                color:themeStyle.BLACK_43,
                fontFamily: FontStyle.RobotoRegular,
              }}
              placeholder={language.current_mobile_no}
              onChangeText={text => this.setState({ current_mobile_no: text })}
              value={this.state.current_mobile_no}
              editable={false}
              multiline={false}
              numberOfLines={1}
              keyboardType={"phone-pad"}
              placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              autoCorrect={false}
              contextMenuHidden={true}
              maxLength={10}
            />
          </View>

          <Text style={styles.labelStyle}>{language.new_mobile_no}</Text>
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
              placeholder={language.mobile_no}
              onChangeText={text => this.setState({ new_mobile_no: text })}
              value={this.state.new_mobile_no}
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
            marginTop: hp(dimen.dim_h20),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(dimen.dim_h30),
          }}>
            <View style={{
              backgroundColor: themeStyle.THEME_COLOR,
              height: hp(dimen.dim_h48),
              borderRadius: 5,
              flex: 1,
              justifyContent: "center",
            }}>
              <TouchableOpacity style={{
                flexDirection: "row", justifyContent: "center", alignItems: "center", marginStart: 10,
                marginEnd: 10,
              }}
                                disabled={this.state.isProgress}
                                onPress={() => {
                                  Utility.alertWithBack("Ok", "Mobile updated successfully", this.props.navigation);
                                }
                                }>
                <Text style={{
                  color: "#fff",
                  fontSize: FontSize.getSize(14),
                  textAlign: "center",
                  fontFamily: FontStyle.RobotoBold,
                }}>{language.update}</Text>
              </TouchableOpacity>

            </View>
            <View style={{
              backgroundColor: themeStyle.TRANSPARENT,
              height: hp(dimen.dim_h48),
              borderRadius: 5,
              borderWidth: 1,
              flex: 1,
              marginStart: 20,
              borderColor: themeStyle.THEME_COLOR,
              justifyContent: "center",
            }}>
              <TouchableOpacity style={{
                flexDirection: "row", justifyContent: "center", alignItems: "center", marginStart: 10,
                marginEnd: 10,
              }}
                                disabled={this.state.isProgress}
                                onPress={() => {
                                  this.props.navigation.goBack(null);
                                }
                                }>
                <Text style={{
                  color: themeStyle.THEME_COLOR,
                  fontSize: FontSize.getSize(14),
                  textAlign: "center",
                  fontFamily: FontStyle.RobotoBold,
                }}>{language.cancel}</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </ScrollView>
    </View>);
  }
}

const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

let styles = {
  labelStyle: {
    marginTop: 12,
    marginBottom: 5,
    fontFamily: FontStyle.RobotoMedium,
    fontSize: FontSize.getSize(14),
  },
};

export default connect(mapStateToProps)(UploadMobile);
