import React, { Component } from "react";
import { Text, Platform, StatusBar, View, Animated, Easing, Image, ImageBackground } from "react-native";

import { actions } from "../redux/actions";
import { connect } from "react-redux";
import theme from "../resources/theme.style";
import Config from "../config/Config";

import themeStyle from "../resources/theme.style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import FontSize from "../resources/ManageFontSize";
import { BusyIndicator } from "../resources/busy-indicator";
import { LoginScreen } from "./LoginScreen";
import User from "../utilize/User";


/**
 * splash page
 */

class SplashScreen extends Component {


  constructor(props) {
    super(props);
  }

  /**
   * redirect to landing screen
   */
  async redirectScreen() {

    let isLoggedIn = await User.retrieve(Config.UserId);
    setTimeout(() => {
      if (isLoggedIn !== null && isLoggedIn)
        this.props.navigation.replace("SecondTimeLogin");
      else
        this.props.navigation.replace("LoginScreen");
    }, 3500);
  }


  async componentDidMount() {
    if (Platform.OS === "android") {
      this.list = [
        this.props.navigation.addListener("focus", () => {
          StatusBar.setTranslucent(false);
          StatusBar.setBackgroundColor(theme.OFF_WHITE_COLOR);
          StatusBar.setBarStyle("dark-content");
        }),
      ];
    }
    await this.redirectScreen();
  }


  render() {
    return (
      <View style={styles.viewStyles}>

        <Image
          source={require("../resources/images/logo_transparent.png")}
          resizeMode="contain"
          style={{
            height: Config.getDeviceWidth() - Config.getDeviceWidth() / 2,
            width: Config.getDeviceWidth() - Config.getDeviceWidth() / 2,
          }}
        />
      </View>

    );
  }
}


const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeStyle.BG_COLOR,
  },

};


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.lang,
  };
};

export default connect(mapStateToProps)(SplashScreen);

