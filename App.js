import React from 'react';
import { Asset, AppLoading, Font } from 'expo';
import { StyleSheet, Text, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { createRootNavigator } from "./router";
import images from "./constants/Images"
import fonts from "./constants/Fonts"
import Colors from './constants/Colors'
import I18n from './Utilites/Localization'
import { login } from './Utilites/Network'

export default class App extends React.Component {

  state = {
    isReady: false,
    isVerified: -1,
  };

  componentDidMount() {

  }

  componentWillMount() {
    I18n.initAsync();
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
    AsyncStorage.getItem('@MySuperStore:login')
    .then((username) => {
      AsyncStorage.getItem('@MySuperStore:password')
      .then((password) => {
        if(username.length && password.length) {
          login(username, password)
          .then(() => {
            this.setState({
              isVerified: 2,
            });
          })
          .catch((err) => {
            console.log('login function err: ' + err);
            this.setState({
              isVerified: 1,
            });
          });
        } else {
          console.log('login or password is null');
          this.setState({
            isVerified: 1,
          });
        }
      })
      .catch((err) => {
        console.log('password error: ' + err);
        this.setState({
          isVerified: 1,
        });
      });
    })
    .catch((err) => {
      console.log('login error: ' + err);
      this.setState({
        isVerified: 1,
      });
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    if(this.state.isVerified == -1) {
      return (<AppLoading />);
    }

    const Layout = createRootNavigator(this.state.isVerified.toString());
    return <Layout />;
  }

  async _cacheResourcesAsync() {
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all([cacheImages, Font.loadAsync(fonts)])

  }
}
