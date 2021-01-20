import { Alert, Dimensions, Platform, ToastAndroid } from "react-native";
import Config from "../config/Config";
import axios from "axios";

export default class Utility {
  static alert(msg) {
    Alert.alert(Config.appName, msg);
  }

  static alertWithBack(btn_txt,msg,navigation) {
    Alert.alert(
      Config.appName,
      msg,
      [
        {text: btn_txt, onPress: () => navigation.goBack(null)},
      ]
    );
  }

  static alertConfirm(positive_txt,negative_txt,msg,navigation) {
    Alert.alert(
      Config.appName,
      msg,
      [
        {text: positive_txt, onPress: () => navigation.goBack(null)},
        {text: negative_txt, onPress: () => navigation.goBack(null)},
      ]
    );
  }


  static validateEmail(text) {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
  }

/*  static async makePostApiCall(url,postRequest) {
    const response = await axios.post(Config.base_url+url, {
      email : "redjames@gmail.com",
      password: '12346'
    });
  } */

  static async makePostApiCall(url,postRequest) {
    const response = await axios.post(Config.base_url+url, postRequest);
  }

  static async makeGetApiCall(url) {
    const response = await axios.get(
      Config.base_url+url,
    );
  }

}
