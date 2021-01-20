/**
 * class store important keys and data object
 */

import { Dimensions } from "react-native";

export default class Config {


  /**
   * API Base url
   * @type {string}
   */

  static base_url = "https://digix.aiplsolution.in/citybankAPI/";

  /**
   * API Action
   * @type {string}
   */
  static appName = "CityTouch";
  static onBoardURl = "https://uatonboardportal.thecitybank.com/self-onboarding?mn=decrypted&tn=123456789&ln=en";
  static termConditionURl = "https://www.citytouch.com.bd/signup/terms-and-condition#!";
  /**
   * App Version
   */
  static iosAppVersion = "Version 1.0";
  static androidAppVersion = "Version 1.0";

  static UserId = "userid";
  static DeviceId = "userid";


  static getDeviceWidth() {
    return Math.round(Dimensions.get("window").width);
  }

  static getDeviceHeight() {
    return Math.round(Dimensions.get("window").height);
  }



}

