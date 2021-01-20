import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, SafeAreaView, StatusBar, View, Text, TouchableOpacity, Image } from "react-native";
import themeStyle from "../../resources/theme.style";
import { SceneView } from "react-navigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import dimen from "../../resources/Dimens";
import theme from "../../resources/theme.style";
import fontStyle from "../../resources/FontStyle";
import FontSize from "../../resources/ManageFontSize";
import { ExpandableListView } from "react-native-expandable-listview";

let listDataSource = "";

class AccountsDetailsScreen extends Component {
  constructor(props) {
    super(props);
    let language = props.route.params.language;
    let itemVal = [{
      accountNo: 300200500200855,
      balance: "20000",
      isShown:false
    }, {
      accountNo: 300200500200856,
      balance: "50000",
      isShown:false
    }];
    this.state = {
      listDataSource: [
        {
          id: "1",
          categoryName: "",
          customItem: (
            this.parentView(language.current_saving)
          ),
          subCategory: [{
            customInnerItem: (
              this.subView(itemVal[0],language)
            ),
            id: "11",
            name: "",
          },
            {
              customInnerItem: (
                this.subView(itemVal[1],language)
              ),
              id: "12",
              name: "",
            },
          ],
        },
        {
          id: "2",
          categoryName: "",
          customItem: (
            this.parentView(language.term_deposit)
          ),
          subCategory: [{
            customInnerItem: (
              this.subView(itemVal[0],language)
            ),
            id: "21",
            name: "",
          },
            {
              customInnerItem: (
                this.subView(itemVal[1],language)
              ),
              id: "22",
              name: "",
            },
          ],
        },
        {
          id: "3",
          categoryName: "",
          customItem: (
            this.parentView(language.credit_account)
          ),
          subCategory: [{
            customInnerItem: (
              this.subView(itemVal[0],language)
            ),
            id: "31",
            name: "",
          },
            {
              customInnerItem: (
                this.subView(itemVal[1],language)
              ),
              id: "32",
              name: "",
            },
          ],
        },
        {
          id: "4",
          categoryName: "",
          customItem: (
            this.parentView(language.loan_accounts)
          ),
          subCategory: [{
            customInnerItem: (
              this.subView(itemVal[0],language)
            ),
            id: "41",
            name: "",
          },
            {
              customInnerItem: (
                this.subView(itemVal[1],language)
              ),
              id: "42",
              name: "",
            },
          ],
        },
      ],

    };

  }

  parentView(name) {
    return (<View style={{ paddingStart: 5, flexDirection: "row", alignItems: "center" }}>
      <Text style={{
        flex: 1, color: themeStyle.THEME_COLOR, fontSize: FontSize.getSize(14),
        fontFamily: fontStyle.RobotoRegular,
      }}>{name}</Text>
      <Image resizeMode={"contain"} source={require("../../resources/images/arrow_right_ios.png")}
             style={{
               width: 12,
               height: 12,
               tintColor: themeStyle.THEME_COLOR,/*transform: [{ rotate: '90deg'}] */
             }} />
    </View>);
  }

  subView(item,lang) {
    return (
      <View style={{ margin: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 85, fontFamily: fontStyle.RobotoMedium, fontSize: FontSize.getSize(12) }}>Account
                No.:</Text>
              <Text style={{ fontFamily: fontStyle.RobotoRegular, fontSize: FontSize.getSize(12) }}>
                {item.accountNo}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{
                width: 85,
                fontFamily: fontStyle.RobotoMedium,
                fontSize: FontSize.getSize(12),
              }}>Balance:</Text>
              <Text style={{color:themeStyle.THEME_COLOR, fontFamily: fontStyle.RobotoRegular, fontSize: FontSize.getSize(12) }}>
                {item.isShown?item.balance:lang.view_balance}</Text>
            </View>
          </View>
          <Image resizeMode={"contain"} source={require("../../resources/images/arrow_right_ios.png")}
                 style={{ width: 12, height: 12 }} />
        </View>
      </View>);

  };

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
            style={{ marginStart: 10, width: 30, height: 25, alignItems: "center", justifyContent: "center" }}
            onPress={() => this.props.navigation.goBack(null)}>
            <Image style={{ width: 15, height: 17, tintColor: theme.WHITE }}
                   source={Platform.OS === "android" ?
                     require("../../resources/images/ic_back_android.png") : require("../../resources/images/ic_back_ios.png")} />
          </TouchableOpacity>
          <Text style={{
            flex: 1,
            color: theme.WHITE,
            fontFamily: fontStyle.RobotoMedium,
            fontSize: FontSize.getSize(16),
          }}>Account summary</Text>
        </View>
        <ExpandableListView
          ExpandableListViewStyles={{
            borderWidth: 0.5,
            margin: 10,
            borderColor: themeStyle.BLACK_43,
            borderRadius: 2,
            overflow: "hidden",
          }} // styles to expandable listview
          renderInnerItemSeparator={true} // true or false, render separator between inner items
          renderItemSeparator={true} // true or false, render separator between Items
          itemContainerStyle={{ backgroundColor: "#FDFDFD" }} // add your styles to all item text of your list
          // customChevron={{}} // your custom image to the indicator
          // chevronColor={themeStyle.THEME_COLOR} // color of the default indicator
          innerItemContainerStyle={{ backgroundColor: "#F9F9F9" }} // add your styles to all inner item containers of your list
          // itemLabelStyle={{}} // add your styles to all inner item text of your list
          // itemImageIndicatorStyle={{}} // add your styles to the image indicator of your list
          animated={true} // sets all animations on/off, default on
          //defaultLoaderStyles={{alignSelf:'center'}}  // Set your styles to default loader (only for animated={true})
          // customLoader?: JSX.Element; Pass your custom loader, while your content is measured and rendered (only for animated={true})
          data={this.state.listDataSource}
          onInnerItemClick={handleInnerItemClick}
          onItemClick={handleItemClick}
        />

      </View>);
  }
}


function handleItemClick({ index }) {
  console.log(index);
};

function handleInnerItemClick({ innerIndex, item, itemIndex }) {
  console.log(innerIndex);
};

const mapStateToProps = (state) => {
  return {
    langId: state.accountReducer.langId,
    language: state.accountReducer.language,
  };
};

export default connect(mapStateToProps)(AccountsDetailsScreen);
