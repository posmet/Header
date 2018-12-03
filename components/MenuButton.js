import React from "react";
import { View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";

export default class MenuButton extends React.Component {
    goToSettings = () => {
      console.log('DrawerOpen');
      this.props.navigation.navigate('DrawerOpen');
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
                    <Image source={require('./../assets/ic-menu.png')} style={{
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
