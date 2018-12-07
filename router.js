
import React from "react";
import { isIphoneX } from 'react-native-iphone-x-helper'
import { Platform, StatusBar, Image, Dimensions } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, NavigationActions, TabView, TabBarBottom } from "react-navigation";

import Colors from './constants/Colors';
import Config from './constants/Config'
import Common from './Utilites/Common'

import EnterScreen from "./screens/EnterScreen";

import MainScreen from './screens/MainScreen'
import CommonDataScreen from './screens/CommonDataScreen'
import CommonGraphScreen from './screens/CommonGraphScreen'
import AptekaDataScreen from './screens/AptekaDataScreen'
import AptekaReportScreen from './screens/AptekaReportScreen'
import AptekaGraphScreen from './screens/AptekaGraphScreen'
import AptekaScreen from './screens/AptekaScreen'
import MapScreen from './screens/MapScreen'
import InfoScreen from './screens/InfoScreen'

import MenuButton from './components/MenuButton'
import BackButton from './components/BackButton'
import SignoutButton from './components/SignoutButton'
import Menu from './components/MenuComponent'

export const EnterScreens = {
  Enter: {
    screen: EnterScreen,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      header: null,
      animationEnabled: false,
    }
  }
};

export const SignedIn = createBottomTabNavigator(
  {
    Main: {
      screen: createStackNavigator({
        Main: {
          screen: MainScreen,
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            headerRight: <SignoutButton />,
            headerForceInset: {
              left: 0,
              right: 0,
              top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
              bottom: 0,
            },
            headerTitleStyle: {
                color: 'white',
            },
            headerStyle: {
                backgroundColor: Colors.navBarColor,
                // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            },
            headerTintColor: {
                color: 'red'
            },
          }
        },
        CommonGraph2: {
          screen: CommonGraphScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
      }, {
        headerMode: 'none',
      }),
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({ tintColor }) =>
            (<Image
              source={require('./assets/ic-tabbar-monitor-act.png')}
              style={{
                resizeMode: 'contain',
                tintColor: tintColor,
                width: 25,
                height: 25,
              }}
            />),
            title: 'Монитор',
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              let parentNavigation = navigation.dangerouslyGetParent();
              let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
              let nextRoute = navigation.state;
              // console.log({ prevRoute, nextRoute });
              defaultHandler();
            }
        }
      }
    },
    CommonData: {
      screen: createStackNavigator({
        CommonData: {
          screen: CommonDataScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: false,
              title: 'Данные',
              headerLeft: null,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerTitleStyle: {
                  color: 'white',
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        CommonGraph: {
          screen: CommonGraphScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
      }, {
        headerMode: 'none',
      }),
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({ tintColor }) =>
          (<Image
            source={require('./assets/ic-tabbar-data-act.png')}
            style={{
              resizeMode: 'contain',
              tintColor: tintColor,
              width: 25,
              height: 25,
            }}
          />),
          title: 'Данные',
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            let parentNavigation = navigation.dangerouslyGetParent();
            let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
            let nextRoute = navigation.state;
            // console.log({ prevRoute, nextRoute });
            defaultHandler();
          }
        }
      }
    },
    AptekaData: {
      screen: createStackNavigator({
        AptekaData: {
          screen: AptekaDataScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: false,
              title: 'Аптеки',
              headerLeft: null,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerTitleStyle: {
                  color: 'white',
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        AptekaReport: {
          screen: AptekaReportScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        AptekaGraph: {
          screen: AptekaGraphScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
      }, {
        headerMode: 'none',
      }),
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({ tintColor }) =>
          (<Image
              source={require('./assets/ic-tabbar-apteki-act.png')}
              style={{
                resizeMode: 'contain',
                tintColor: tintColor,
                width: 25,
                height: 25,
              }}
            />),
            title: 'Аптеки',
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              let parentNavigation = navigation.dangerouslyGetParent();
              let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
              let nextRoute = navigation.state;
              // console.log({ prevRoute, nextRoute });
              defaultHandler();
            }
        }
      }
    },
    Info: {
      screen: createStackNavigator({
        Info: {
          screen: InfoScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: false,
              title: 'Информация',
              headerLeft: null,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerTitleStyle: {
                  color: 'white',
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        Apteka: {
          screen: AptekaScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        AptekaReport2: {
          screen: AptekaReportScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        AptekaGraph2: {
          screen: AptekaGraphScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
        Map: {
          screen: MapScreen,
          navigationOptions: ({navigation}) => {
            return {
              gesturesEnabled: true,
              headerLeft: <BackButton navigation={navigation} />,
              headerForceInset: {
                left: 0,
                right: 0,
                top: Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0,
                bottom: 0,
              },
              headerStyle: {
                  backgroundColor: Colors.navBarColor,
                  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
              headerTintColor: {
                  color: 'white'
              },
            }
          }
        },
      }, {
        headerMode: 'none',
      }),
      navigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({ tintColor }) =>
            (<Image
              source={require('./assets/ic-tabbar-info-act.png')}
              style={{
                resizeMode: 'contain',
                tintColor: tintColor,
                width: 25,
                height: 25,
              }}
            />),
            title: 'Информация',
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              let parentNavigation = navigation.dangerouslyGetParent();
              let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
              let nextRoute = navigation.state;
              // console.log({ prevRoute, nextRoute });
              defaultHandler();
            }
        }
      }
    },
  },
  {
    lazy: false,
    initialRouteName: 'Main',
    tabBarOptions: {
      activeBackgroundColor: Colors.activeTabBarColor,
      inactiveBackgroundColor: Colors.tabBarColor,
      activeTintColor: Colors.activeTabBarTintColor,
      inactiveTintColor: Colors.inactiveTabBarTintColor,
      showLabel: true,
      showIcon: true,
      indicatorStyle: {
        opacity: 0
      },
      style: {
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.tabBarColor,
        // height: 100,
      },
      tabStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelStyle: {
        marginBottom: Platform.OS === "android" ? 5 : 5,
        fontSize: Common.getLengthByIPhone7(12),
        fontFamily: 'ArctikaScript',
      },
    },
    navigationOptions: {
      scrollEnabled: false,
      headerMode: "none",
      // header: {
      //   visible: true,
      // },
      configureTransition: (currentTransitionProps,nextTransitionProps) => ({
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
     })
    },
  }
);

export const SignedOut = createStackNavigator(EnterScreens);

export const createRootNavigator = (variant) => {

  let route = '';

  switch (variant) {
    case '1':
      route = 'SignedOut';
      break;

    case '2':
      route = 'SignedIn';
      break;

    default:
    route = 'SignedOut';
  }

  return createAppContainer(createStackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: route
    }
  ));
};
