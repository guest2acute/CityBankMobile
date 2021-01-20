/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./react/screens/SplashScreen";
import { Provider } from "react-redux";

import configureStore from "./react/redux/store/configureStore";
import LoginScreen from "./react/screens/LoginScreen";
import ProfileScreen from "./react/screens/ProfileScreen";
import SignupScreen from "./react/screens/SignupScreen";
import SignupWithScreen from "./react/screens/SignupWithScreen";
import SignupDebitCardScreen from "./react/screens/SignupDebitCardScreen";
import DashBoardScreen from "./react/screens/DashBoardScreen";
import ForgotPwdScreen from "./react/screens/ForgotPwdScreen";
import WebScreen from "./react/screens/WebScreen";
import ChangePwdScreen from "./react/screens/ChangePwdScreen";
import ForgotPinScreen from "./react/screens/ForgotPinScreen";
import ChangeLoginPinScreen from "./react/screens/ChangeLoginPinScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChangeTransactionPinScreen from "./react/screens/ChangeTransactionPinScreen";
import themeStyle from "./react/resources/theme.style";
import CustomSidebarMenu from "./react/utilize/CustomSidebarMenu";
import AccountsDetailsScreen from "./react/screens/sidemenu/AccountsDetailsScreen";
import UpdateAddressScreen from "./react/screens/profile/UpdateAddressScreen";
import UploadDocuments from "./react/screens/profile/UploadDocuments";
import UploadMobile from "./react/screens/profile/UploadMobile";
import UploadEmail from "./react/screens/profile/UploadEmail";
import EditProfileScreen from "./react/screens/profile/EditProfileScreen";
import NotificationsScreen from "./react/screens/sidemenu/NotificationsScreen";
import AboutUsScreen from "./react/screens/sidemenu/AboutUsScreen";
import ContactUsScreen from "./react/screens/sidemenu/ContactUsScreen";
import SecondTimeLogin from "./react/screens/SecondTimeLogin";

const store = configureStore(window.__State__);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Navigator =()=> {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: themeStyle.THEME_COLOR,
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{ drawerLabel: "Home" }}
        component={DashBoardScreen} />
    </Drawer.Navigator>);
};

function Root() {
  return (
    <Stack.Navigator initialRouteName={"SplashScreen"}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SecondTimeLogin" component={SecondTimeLogin} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupWithScreen" component={SignupWithScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupDebitCardScreen" component={SignupDebitCardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPwdScreen" component={ForgotPwdScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WebScreen" component={WebScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePwdScreen" component={ChangePwdScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangeTransactionPinScreen" component={ChangeTransactionPinScreen}
                    options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPinScreen" component={ForgotPinScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangeLoginPinScreen" component={ChangeLoginPinScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AccountsDetailsScreen" component={AccountsDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateAddressScreen" component={UpdateAddressScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} options={{ headerShown: false }} />
      <Stack.Screen name="UploadMobile" component={UploadMobile} options={{ headerShown: false }} />
      <Stack.Screen name="UploadEmail" component={UploadEmail} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Navigator" component={Navigator} options={{ headerShown: false }} />
    </Stack.Navigator>);
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

