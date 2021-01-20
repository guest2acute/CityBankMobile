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
import { createStackNavigator } from "@react-navigation/stack";
import fontStyle from "../resources/FontStyle";
import RadioForm from "react-native-simple-radio-button";
import {
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import theme from "../resources/theme.style";


let login_props = [
  { label: "Password", value: 0 },
  { label: "Transaction PIN", value: 1 },
  { label: "Login PIN", value: 2 },
];

let language_type_prefs = [
  { label: "English", value: "en" },
  { label: "Bangla", value: "bangla" },
];

const Stack = createStackNavigator();

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
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
    };
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
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Navigator" }],
      });
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
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
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
      <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
        <SafeAreaView />
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          height: hp(dimen.dim_h60),
          backgroundColor: theme.THEME_COLOR,
          alignItems: "center",
        }}>
          <TouchableOpacity
            style={{width: 40, height: 25, alignItems: "center", justifyContent: "center" }}
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
          }}>Personalise Profile</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handle">

          <View style={{
            marginTop: 20,
            backgroundColor: "#FFFFFF",
            borderWidth: 0.5,
            marginLeft: 15,
            marginBottom:15,
            marginRight:20,
            borderColor: themeStyle.BLACK_43,
            borderRadius: 2,
            overflow: "hidden",
          }}>
            {this.listView("Edit Profile", "EditProfileScreen")}
            {this.listView("Update Address", "UpdateAddressScreen")}
            {this.listView("Upload Documents", "UploadDocuments")}
            {this.listView("Update Mobile Number", "UploadMobile")}
            {this.listView("Update Email Address", "UploadEmail")}
            {this.listView("Change Password", "ChangePwdScreen")}
            {this.listView("Change Login PIN", "ChangeLoginPinScreen")}
            {this.listView("Change Transaction PIN", "ChangeTransactionPinScreen")}
          </View>
          <BusyIndicator visible={this.state.isProgress} />
        </ScrollView>
      </View>


    );
  }

  listView(name, redirect) {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate(redirect, { screenFrom: "profile" });
        }}>
          <View style={{
            backgroundColor: "#FDFDFD",
            paddingLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            height: hp(dimen.dim_h60),
          }}>
            <Text style={{
              flex: 1, color: themeStyle.THEME_COLOR, fontSize: FontSize.getSize(14),
              fontFamily: fontStyle.RobotoRegular,
            }}>{name}</Text>
            <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                   style={{
                     width: 12,
                     height: 12,
                     marginRight: 20,
                     tintColor: themeStyle.THEME_COLOR,/*transform: [{ rotate: '90deg'}] */
                   }} />
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: "#cccccc", height: 0.5 }} /></View>
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

export default connect(mapStateToProps)(ProfileScreen);

