import React from "react";
import { View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { NavigationActions } from "react-navigation";
import Common from './../Utilites/Common'

export default class BackButton extends React.Component {
    goToSettings = () => {
        this.props.navigation.goBack(null);
    };

    render() {
        return (
            <View style={{
              backgroundColor: 'transparent',
              flex: 0,
            }}>
                <TouchableWithoutFeedback onPress={this.goToSettings}>
                  <View style={{
                    width: Common.getLengthByIPhone7(45),
                    height: Common.getLengthByIPhone7(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Image source={require('./../assets/ic-arrow-back.png')} style={{
                      resizeMode: 'contain',
                      width: Common.getLengthByIPhone7(25),
                      height: Common.getLengthByIPhone7(25),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} />
                  </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
