import React, { Component } from "react";
import { Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import theme from "../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import fontStyle from "../resources/FontStyle";
import FontSize from "../resources/ManageFontSize";
import { connect } from "react-redux";


class SignupWithScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this._navListener = this.props.navigation.addListener("focus", () => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor(theme.THEME_COLOR);
        StatusBar.setBarStyle("light-content");
      });
    }
  }



  render() {
    let language = this.props.language;
    return (<View style={{ flex: 1, style: theme.WHITE }}>
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
        }}>{language.signup}</Text>
      </View>

      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate("SignupScreen", { sign_up_type: "act_no", title: language.with_act_no });
      }}>
        <View style={{
          flexDirection: "row",
          paddingStart: 20,
          paddingEnd: 20,
          height: 50,
          backgroundColor: theme.OFF_WHITE_COLOR,
          alignItems: "center",
        }}>
          <Text style={styles.text_prop}>{language.using_act_no}</Text>
          <Image style={{ width: 15, height: 15, tintColor: theme.BLACK }}
                 source={require("../resources/images/arrow_right_ios.png")} />
        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: theme.SEPARATOR, height: 1, width: "100%" }} />
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate("SignupScreen", {
          sign_up_type: "credit_card",
          title: language.with_credit_card,
        });
      }}>
        <View style={{
          flexDirection: "row",
          paddingStart: 20,
          paddingEnd: 20,
          height: 50,
          backgroundColor: theme.OFF_WHITE_COLOR,
          alignItems: "center",
        }}>
          <Text style={styles.text_prop}>{language.credit_card}</Text>
          <Image style={{ width: 15, height: 15, tintColor: theme.BLACK }}
                 source={require("../resources/images/arrow_right_ios.png")} />
        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: theme.SEPARATOR, height: 1, width: "100%" }} />
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate("SignupScreen", {
          sign_up_type: "prepaid_card",
          title: language.with_prepaid_card,
        });
      }}>
        <View style={{
          flexDirection: "row",
          paddingStart: 20,
          paddingEnd: 20,
          backgroundColor: theme.OFF_WHITE_COLOR,
          height: 50,
          alignItems: "center",
        }}>
          <Text style={styles.text_prop}>{language.prepaid_card}</Text>
          <Image style={{ width: 15, height: 15, tintColor: theme.BLACK }}
                 source={require("../resources/images/arrow_right_ios.png")} />
        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: theme.SEPARATOR, height: 1, width: "100%" }} />
      <View style={{
        backgroundColor: theme.WHITE,
        flex: 1,
      }} />
    </View>);
  }
}

const styles = {
  text_prop: {
    flex: 1,
    alignItems: "center",
    color: theme.BLACK_43,
    fontFamily: fontStyle.RobotoMedium,
    fontSize: FontSize.getSize(14),
  },

};


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(SignupWithScreen);
