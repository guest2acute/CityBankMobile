import React, {Component} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity, Platform,
    TextInput, Image,
    Keyboard, ScrollView, Alert, Linking,
} from "react-native";
import themeStyle from "../resources/theme.style";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import FontSize from "../resources/ManageFontSize";
import {BusyIndicator} from "../resources/busy-indicator";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../config/Config";
import FontStyle from "../resources/FontStyle";
import {actions} from "../redux/actions";
import en from "../localization/en";
import bangla from "../localization/bangla";
import Utility from "../utilize/Utility";
import fontStyle from "../resources/FontStyle";


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            passwordTxt: "",
            isProgress: false,
            passwordVisible: false,
            hasFinger: false,
        };
    }

    /**
     * onSubmit button action
     */

    async onSubmit() {
        if (this.state.userid === "") {
            Utility.alert("Please enter user id");
        } else if (this.state.userid.length < 8) {
            Utility.alert("Invalid user id");
        } else if (this.state.passwordTxt === "") {
            Utility.alert("Please enter password");
        } else
            await this.redirect();
    }

    async redirect() {
        this.props.navigation.replace("EditProfileScreen", {
            language: this.props.language,
            screenFrom: "login",
            userid: this.state.userid
        });
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

    userInput(text) {
        if (text.indexOf(" ") !== -1)
            text = text.replace(/\s/g, '');
        this.setState({userid: text})
    }

    render() {
        let language = this.props.language;
        return (
            <View style={{flex: 1, backgroundColor: themeStyle.BG_COLOR}}>
                <SafeAreaView/>

                <ScrollView showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handle">

                    <View style={{
                        marginLeft: wp(dimen.dim_w30),
                        marginRight: wp(dimen.dim_w30),
                    }}>

                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: hp(dimen.dim_h10),
                        }}>
                            <Image
                                source={require("../resources/images/logo_transparent.png")}
                                resizeMode="contain"
                                style={{
                                    height: Config.getDeviceWidth() / 2.5,
                                    width: Config.getDeviceWidth() / 2.5,
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: "column",
                            marginTop: 20,
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
                                    }}
                                    placeholder={language.user_ID}
                                    onChangeText={text => this.userInput(text)}
                                    value={this.state.userid}
                                    multiline={false}
                                    numberOfLines={1}
                                    contextMenuHidden={true}
                                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                                    autoCorrect={false}
                                    maxLength={12}
                                    // autoFocus={true}
                                />

                            </View>
                            <View style={{alignItems: "flex-end", marginTop: hp(dimen.dim_h5)}}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.navigate("ForgotUIDScreen", {language: this.props.language})}>
                                    <Text style={{
                                        color: themeStyle.THEME_COLOR,
                                        fontSize: FontSize.getSize(12),
                                        fontFamily: FontStyle.RobotoRegular, textDecorationLine: "underline"
                                    }}>{language.fgt_uid}</Text></TouchableOpacity>
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
                                    placeholder={language.passwordTxt}
                                    onChangeText={text => this.setState({passwordTxt: text})}
                                    value={this.state.passwordTxt}
                                    multiline={false}
                                    numberOfLines={1}
                                    contextMenuHidden={true}
                                    secureTextEntry={!this.state.passwordVisible}
                                    placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                                    autoCorrect={false}
                                />

                                <Icon style={{marginEnd: 10}}
                                      name={this.state.passwordVisible ? "eye" : "eye-slash"}
                                      size={20}
                                      color="#000000" onPress={() => {
                                    this.setState({passwordVisible: !this.state.passwordVisible});
                                }}/>

                            </View>
                            <View style={{alignItems: "flex-end", marginTop: hp(dimen.dim_h5)}}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.navigate("ForgotPwdScreen", {language: this.props.language})}>
                                    <Text style={{
                                        color: themeStyle.THEME_COLOR,
                                        fontSize: FontSize.getSize(12),
                                        fontFamily: FontStyle.RobotoRegular, textDecorationLine: "underline"
                                    }}>{language.fgt_pwd}</Text></TouchableOpacity>
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
                            <TouchableOpacity
                                style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                                disabled={this.state.isProgress}
                                onPress={() =>
                                    this.onSubmit()
                                }>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: FontSize.getSize(14),
                                    textAlign: "center",
                                    fontFamily: FontStyle.RobotoBold,
                                }}>{language.login}</Text>


                            </TouchableOpacity>

                        </View>

                        <View style={{
                            marginTop: hp(dimen.dim_h25),
                            backgroundColor: themeStyle.WHITE,
                            borderColor: themeStyle.THEME_COLOR,
                            borderWidth: 1,
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
                            <TouchableOpacity
                                style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                                disabled={this.state.isProgress}
                                onPress={() =>
                                    this.props.navigation.navigate("SignupWithScreen", {language: this.props.language})
                                }>
                                <Text style={{
                                    color: themeStyle.THEME_COLOR,
                                    fontSize: FontSize.getSize(14),
                                    textAlign: "center",
                                    fontFamily: FontStyle.RobotoMedium,
                                }}>{language.signup}</Text>

                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate("ForgotPwdScreen", {language: this.props.language})
                        }>
                            <Text style={{
                                color: themeStyle.THEME_COLOR,
                                fontSize: FontSize.getSize(13),
                                textAlign: "center",
                                marginTop: hp(dimen.dim_h30),
                                fontFamily: FontStyle.RobotoMedium,
                            }}>{language.fgt_pwd_uid}</Text></TouchableOpacity>*/}

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: hp(dimen.dim_h20),
                        }}>
                            <Text style={styles.label}>{language.donot_have_act}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(Config.onBoardURl)}>
                                <Text style={{
                                    marginStart: 3,
                                    fontSize: FontSize.getSize(12),
                                    fontFamily: fontStyle.RobotoMedium,
                                    textDecorationLine: "underline",
                                    color: themeStyle.THEME_COLOR,
                                }
                                }>{language.open_account}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <BusyIndicator visible={this.state.isProgress}/>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        if (Platform.OS === "android") {
            this.focusListener = this.props.navigation.addListener("focus", () => {
                StatusBar.setTranslucent(false);
                StatusBar.setBackgroundColor(themeStyle.OFF_WHITE_COLOR);
                StatusBar.setBarStyle("dark-content");
            });
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}

const
    styles = {
        label: {
            fontSize: FontSize.getSize(13),
            fontFamily: fontStyle.RobotoRegular,
        },
    };


const
    mapStateToProps = (state) => {
        return {
            langId: state.accountReducer.langId,
            language: state.accountReducer.language,
        };
    };

export default connect(mapStateToProps)

(
    LoginScreen
)
;

