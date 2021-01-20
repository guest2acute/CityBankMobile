import React, {Component} from "react";
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

import DropDownPicker from "react-native-dropdown-picker";
import theme from "../resources/theme.style";
import fontStyle from "../resources/FontStyle";

let act_type = [
    {label: "Select Account Type", value: -1},
    {label: "Account Number", value: 0},
    {label: "Credit/Debit Card", value: 1},
];

class ForgotUIDScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acc_no_val: -1,
            card_mm_yy: "",
            isProgress: false,
            et_pin: "",
            account_type_val: -1,
            et_trans_pin: "",
            cards_select: [
                {label: "Select your Card", value: -1},
            ],
            act_no_select: [
                {label: "Select your Account Number", value: -1},
            ],
            card_val: "",
            isOTPSent: false,
            otpPin:""
        };
    }


    /**
     * onSubmit button action
     */

    async onSubmit() {
        if (this.state.account_type_val === -1) {
            Utility.alert("Please select account type");
        } else if (this.state.account_type_val === 0) {
            if (this.state.acc_no_val === -1) {
                Utility.alert("Please select your account number");
            } else if (this.state.et_trans_pin === "") {
                Utility.alert("Please enter transaction pin");
            }else if (this.state.et_trans_pin.length !==4) {
                Utility.alert("invalid transaction pin");
            }
            else if (!this.state.isOTPSent) {
                this.setState({isOTPSent: true});
            } else if(this.state.otpPin ===""){
                Utility.alert("Please enter OTP");
            }
            else{
                Utility.alertWithBack("OK","UserID is sent on registered SMS/Email")
            }
        } else if (this.state.account_type_val === 1) {
            if (this.state.card_val === "") {
                Utility.alert("Please enter your card no");
            } else if (this.state.card_mm_yy === "") {
                Utility.alert("Please enter card expiry");
            } else if (this.state.et_pin === "") {
                Utility.alert("Please enter card pin");
            }
            else{
                Utility.alertWithBack("OK","User id is sent on registered SMS/Email ")
            }
        }
    }

    async redirect() {
        Utility.alertWithBack("OK","Successfully changed");
    }

    onchangeDebitInfo(text) {
        if (text.length === 2 && text.indexOf("/") === -1) {
            text = text + "/";
        }
        this.setState({card_mm_yy: text});
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
            <View style={{flex: 1, backgroundColor: themeStyle.BG_COLOR}}>
                <SafeAreaView/>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    height: hp(dimen.dim_h60),
                    backgroundColor: theme.THEME_COLOR,
                    alignItems: "center",
                }}>
                    <TouchableOpacity
                        style={{marginStart: 10, width: 40, height: 25, alignItems: "center", justifyContent: "center"}}
                        onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={{width: 15, height: 17, tintColor: theme.WHITE}}
                               source={Platform.OS === "android" ?
                                   require("../resources/images/ic_back_android.png") : require("../resources/images/ic_back_ios.png")}/>
                    </TouchableOpacity>
                    <Text style={{
                        flex: 1,
                        color: theme.WHITE,
                        fontFamily: fontStyle.RobotoMedium,
                        fontSize: FontSize.getSize(16),
                    }}>{language.title_fgt_uid}</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handle">

                    <View style={{
                        marginLeft: wp(dimen.dim_w20),
                        marginRight: wp(dimen.dim_w20),
                    }}>

                        <View style={{
                            flexDirection: "column",
                            marginTop: hp(dimen.dim_h40),
                        }}>

                            <DropDownPicker
                                labelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
                                selectedLabelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
                                items={act_type}
                                defaultValue={-1}
                                style={{
                                    borderColor: themeStyle.BLACK,
                                    backgroundColor: themeStyle.WHITE,
                                    borderWidth: 0.5,
                                    borderRadius: 2,
                                    alignItems: "center",
                                    marginBottom: this.state.account_type_val !== -1 ? hp(dimen.dim_h10) : hp(dimen.dim_h350),
                                }}
                                itemStyle={{
                                    justifyContent: "flex-start",
                                    color: themeStyle.BLACK,
                                    fontSize: FontSize.getSize(14),
                                    fontFamily: FontStyle.RobotoRegular,
                                    paddingLeft: 10,
                                }}
                                onChangeItem={item => this.setState({
                                    account_type_val: item.value
                                })}
                            />

                            {this.state.account_type_val !== -1 ? <View>
                                {this.state.account_type_val === 1 ? <View>
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
                                                color: themeStyle.BLACK_43,
                                            }}
                                            placeholder={"Please enter card number"}
                                            onChangeText={text => this.setState({card_val:text})}
                                            value={this.state.card_val}
                                            multiline={false}
                                            numberOfLines={1}
                                            keyboardType={"number-pad"}
                                            placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                                            autoCorrect={false}
                                            contextMenuHidden={true}
                                            // autoFocus={true}
                                        />

                                    </View>
                                    <DropDownPicker
                                        style={{flex: 1}}
                                        labelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
                                        selectedLabelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
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
                                            justifyContent: "flex-start",
                                            color: themeStyle.BLACK,
                                            fontSize: FontSize.getSize(14),
                                            fontFamily: FontStyle.RobotoRegular,
                                            paddingLeft: 10,
                                        }}
                                        onChangeItem={item => this.setState({card_val: item.value})}
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
                                                color: themeStyle.BLACK_43,
                                            }}
                                            placeholder={language.mmyy_txt}
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
                                            placeholder={language.et_card_pin}
                                            onChangeText={text => this.setState({et_pin: text})}
                                            value={this.state.et_pin}
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

                                </View> : <View>

                                    <DropDownPicker
                                        style={{flex: 1}}
                                        labelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
                                        selectedLabelStyle={{color: themeStyle.BLACK, fontSize: FontSize.getSize(14)}}
                                        items={this.state.act_no_select}
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
                                            justifyContent: "flex-start",
                                            color: themeStyle.BLACK,
                                            fontSize: FontSize.getSize(14),
                                            fontFamily: FontStyle.RobotoRegular,
                                            paddingLeft: 10,
                                        }}
                                        onChangeItem={item => this.setState({acc_no_val: item.value,et_trans_pin:"",isOTPSent:false})}
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
                                                color:themeStyle.BLACK_43
                                            }}
                                            placeholder={language.et_transPin}
                                            onChangeText={text => this.setState({et_trans_pin: text})}
                                            value={this.state.et_trans_pin}
                                            multiline={false}
                                            numberOfLines={1}
                                            keyboardType={"number-pad"}
                                            contextMenuHidden={true}
                                            placeholderTextColor={themeStyle.PLACEHOLDER_COLOR}
                                            autoCorrect={false}
                                            maxLength={4}
                                        />
                                    </View>


                                    {this.state.isOTPSent ? <View style={{
                                        height: hp(dimen.dim_h50),
                                        flex: 1,
                                        borderRadius: 2,
                                        borderWidth: 0.5,
                                        marginBottom: hp(dimen.dim_h10),
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
                                            onChangeText={text => this.setState({otpPin: text})}
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
                                        <Icon style={{marginEnd: 10}}
                                              name={this.state.loginPinVisible ? "eye" : "eye-slash"} size={20}
                                              color="#000000" onPress={() => {
                                            this.setState({loginPinVisible: !this.state.loginPinVisible});
                                        }}/>
                                    </View> : null}

                                </View>}

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
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        disabled={this.state.isProgress}
                                        onPress={() =>
                                            this.onSubmit()
                                        }>
                                        <Text style={{
                                            color: "#fff",
                                            fontSize: FontSize.getSize(14),
                                            textAlign: "center",
                                            fontFamily: FontStyle.RobotoBold,
                                        }}>{this.state.account_type_val !== 0 ? language.submit_txt :
                                            this.state.isOTPSent ? language.submit_txt : language.otp_sent_txt}</Text>

                                    </TouchableOpacity>

                                </View>
                            </View> : null}

                        </View>

                    </View>
                    <BusyIndicator visible={this.state.isProgress}/>
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

export default connect(mapStateToProps)(ForgotUIDScreen);

