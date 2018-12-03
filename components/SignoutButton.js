import React from "react";
import { View, Image, Dimensions, TouchableWithoutFeedback, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import { signout } from './../Utilites/Network'
import Spinner from 'react-native-loading-spinner-overlay';
import Config from './../constants/Config'

export default class SignoutButton extends React.Component {
    goToSettings = () => {
      Alert.alert(
        Config.appName,
        'Вы хотите выйти?',
        [
          {text: 'Да', onPress: () => {
            signout()
            .then(() => {
              this.props.navigation.navigate('SignedOut');
            })
            .catch((err) => {
              Alert.alert('Госаптека', err);
            });
          }},
          {text: 'Нет', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
    };

    render() {
        return (
            <View style={{
              backgroundColor: 'transparent',
              flex: 0,
            }}>
                <TouchableWithoutFeedback onPress={this.goToSettings}>
                  <View style={{
                    width: Dimensions.get('window').width*45/375,
                    height: Dimensions.get('window').width*45/375,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Image source={require('./../assets/ic-exit.png')} style={{
                      resizeMode: 'contain',
                      width: Dimensions.get('window').width*25/375,
                      height: Dimensions.get('window').width*25/375,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} />
                  </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
