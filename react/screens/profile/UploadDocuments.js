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

let request_type = [
  { label: "Change", value: -1 },
  { label: "Change Mobile Number", value: 0 },
  { label: "Change Email Address", value: 1 },
  { label: "Change Present Address", value: 2 },
  { label: "Change Communication Address", value: 3 },
];


let document_type = [
  { label: "Select the supporting document", value: -1 },
  { label: "NID", value: 0 },
  { label: "Rental Deed", value: 1 },
  { label: "Utility Bill Copy", value: 2 },
  { label: "Property Purchase Document", value: 3 },
  { label: "Business Card", value: 4 },
  { label: "Passport", value: 5 },
  { label: "Driving Licence", value: 6 },
];

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_val: -1,
      document_val: -1,
      present_address: "",
      communication_address: "",
      numberVal: "",
      select_file: "",
    };
  };

  async uploadPdf() {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    this.setState({ select_file: res });
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
          style={{marginLeft:5, width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
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
        }}>Upload Supporting Documents</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handle">
        <View style={{
          marginLeft: wp(dimen.dim_w20),
          marginRight: wp(dimen.dim_w20),
        }}>

          <Text style={[styles.labelStyle, { marginTop: hp(dimen.dim_h20) }]}>Select Request</Text>
          <DropDownPicker
            style={{ flex: 1 }}
            labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            items={request_type}
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
            onChangeItem={item => this.setState({ request_val: item.value })}
          />

          <Text style={styles.labelStyle}>Supporting Document</Text>
          <DropDownPicker
            style={{ flex: 1 }}
            labelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            selectedLabelStyle={{ color: themeStyle.BLACK, fontSize: FontSize.getSize(14) }}
            items={document_type}
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
            onChangeItem={item => this.setState({ document_val: item.value })}
          />

          <Text style={styles.labelStyle}>Number</Text>
          <View style={{
            height: hp(dimen.dim_h50),
            flex: 1,
            borderRadius: 2,
            borderWidth: 0.5,
            overflow: "hidden",
            borderColor: themeStyle.BLACK,
            backgroundColor: themeStyle.WHITE,
            flexDirection: "row",
            alignItems: "flex-start",
          }}>
            <TextInput
              style={{
                fontSize: FontSize.getSize(14),
                marginLeft: 10,
                flex: 1,
                fontFamily: FontStyle.RobotoRegular,
                color: themeStyle.BLACK_43,
              }}
              placeholder={language.numberVal}
              onChangeText={text => {
                this.setState({numberVal:text})
              }}
              value={this.state.numberVal}
              keyboardType={"number-pad"}
              multiline={false}
              placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
              autoCorrect={false}
              contextMenuHidden={true}
            />
          </View>

          <Text style={styles.labelStyle}>Upload Document (Pdf format)</Text>
          <TouchableOpacity onPress={() => this.uploadPdf()}>

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
                placeholder={language.select_file}
                editable={false}
                value={this.state.select_file}
                multiline={false}
                placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                autoCorrect={false}
                contextMenuHidden={true}
              />
            </View>
          </TouchableOpacity>
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
                                  Utility.alertWithBack("Ok", "Updated Successfully", this.props.navigation);
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

export default connect(mapStateToProps)(UploadDocuments);
