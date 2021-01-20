import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, SafeAreaView, StatusBar, View,Text } from "react-native";
import themeStyle from "../../resources/theme.style";


class FIxedDepositScreen extends Component {
  constructor() {
    super();
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



  render() {
    let language = this.props.language;
    return (
      <View style={{ flex: 1, backgroundColor: themeStyle.BG_COLOR }}>
        <SafeAreaView />
      <Text>Fix Deposit</Text>
    </View>);
  }
}


const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(FIxedDepositScreen);
