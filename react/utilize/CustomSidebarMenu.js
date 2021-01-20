import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking, TouchableOpacity, Platform,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import FontStyle from "../resources/FontStyle";
import FontSize from "../resources/ManageFontSize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import dimen from "../resources/Dimens";
import themeStyle from "../resources/theme.style";
import { CommonActions } from "@react-navigation/native";
import Config from "../config/Config";
import User from "./User";


const CustomSidebarMenu = (props) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeStyle.THEME_COLOR }}>

      <View style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: hp(dimen.dim_h30),
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: themeStyle.WHITE,
      }}>
        <Image
          source={require("../resources/images/userimg.png")}
          resizeMode="cover"
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden",
          }}
        />
      </View>
      <Text style={{
        marginTop: 10, alignSelf: "center", fontFamily: FontStyle.RobotoMedium, color: themeStyle.WHITE,
        fontSize: FontSize.getSize(16),
      }}>Ali Hussain</Text>
      <View style={{ marginTop: 20, marginBottom: 10 }} />
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} />//enable it add Drawer.Screen Item*/}
        <View style={styles.customItem}>
          <Text style={styles.textStyle}
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("ProfileScreen");
                }}>
            Personalise Profile
          </Text>
          <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                 style={{
                   width: 12,
                   height: 12,
                   tintColor: themeStyle.WHITE,/*transform: [{ rotate: '90deg'}] */
                 }} />
        </View>
        <View style={{ backgroundColor: themeStyle.WHITE, height: 0.5 }} />
        <TouchableOpacity onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate("NotificationsScreen");
        }}>
          <View style={styles.customItem}>
            <Text style={styles.textStyle}>
              Notifications
            </Text>

            <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                   style={{
                     width: 12,
                     height: 12,
                     tintColor: themeStyle.WHITE,/*transform: [{ rotate: '90deg'}] */
                   }} />
          </View>
        </TouchableOpacity>

        <View style={{ backgroundColor: themeStyle.WHITE, height: 0.5 }} />
        <TouchableOpacity onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate("ContactUsScreen");
        }}>
          <View style={styles.customItem}>
            <Text style={styles.textStyle}>
              Contact Us
            </Text>

            <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                   style={{
                     width: 12,
                     height: 12,
                     tintColor: themeStyle.WHITE,/*transform: [{ rotate: '90deg'}] */
                   }} />
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: themeStyle.WHITE, height: 0.5 }} />
        <TouchableOpacity onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate("AboutUsScreen");
        }}>
          <View style={styles.customItem}>
            <Text style={styles.textStyle}
                  onPress={() => {
                    //Linking.openURL("https://aboutreact.com/");
                  }}>
              About Us
            </Text>
            <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                   style={{
                     width: 12,
                     height: 12,
                     tintColor: themeStyle.WHITE,/*transform: [{ rotate: '90deg'}] */
                   }} />

          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: themeStyle.WHITE, height: 0.5 }} />

        <TouchableOpacity onPress={async () => {
          await User.clear(Config.UserId);
          props.navigation.closeDrawer();
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            }),
          );
        }}>
          <View style={styles.customItem}>
            <Text style={styles.textStyle}>
              Logout
            </Text>
            <Image resizeMode={"contain"} source={require("../resources/images/arrow_right_ios.png")}
                   style={{
                     width: 12,
                     height: 12,
                     tintColor: themeStyle.WHITE,/*transform: [{ rotate: '90deg'}] */
                   }} />
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: themeStyle.WHITE, height: 0.5 }} />

      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: FontSize.getSize(14),
          textAlign: "center",
          marginBottom: 10,
          fontFamily: FontStyle.RobotoMedium,
          color: themeStyle.WHITE,
        }}>
        {Platform.OS === "ios" ? Config.iosAppVersion : Config.androidAppVersion}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 20,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    flex: 1,
    fontFamily: FontStyle.RobotoMedium,
    color: themeStyle.WHITE,
    fontSize: FontSize.getSize(13),
  },

});

export default CustomSidebarMenu;
