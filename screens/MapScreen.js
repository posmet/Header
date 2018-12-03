import React from 'react';
import { Platform, Text, Image, View, Animated, Easing } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import Common from './../Utilites/Common'
import BackButton from './../components/BackButton'
import { MapView, LinearGradient, Constants, Location, Permissions } from 'expo';
import { getRoute } from './../Utilites/Network'

export default class MapScreen extends React.Component {

  infoOpacity = new Animated.Value(0);
  maxHeight = new Animated.Value(0);

  state = {
    location: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        location: null,
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        location: null,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('location: ' + JSON.stringify(location));
    this.setState({ location }, () => {
      getRoute()
      .then(() => {

      })
      .catch((err) => {

      });
    });
  };

  constructor(props) {
    super(props);
  }

  measureView(event) {
    this.setState({
        x: event.nativeEvent.layout.x,
        y: event.nativeEvent.layout.y,
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height
    })
  }

  onRegionChangeComplete = () => {
    console.log('onRegionChangeComplete');
    Animated.sequence([
      Animated.timing(this.infoOpacity, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(this.maxHeight, {
        toValue: 0,
        duration: 0,
      }),
    ]).start();
  }

  onMarkerPress = (data) => {
    console.log('data: ' + JSON.stringify(data.nativeEvent) + ' d: ' + data.data);
    Animated.sequence([
      Animated.timing(this.maxHeight, {
        toValue: 300,
        duration: 0,
      }),
      Animated.timing(this.infoOpacity, {
        toValue: 1,
        duration: 300,
      }),
    ]).start();
  }

  render() {

    console.log('params: ' + JSON.stringify(this.props.navigation.state.params));
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        <Image source={require('./../assets/ic-search.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(24),
          height: Common.getLengthByIPhone7(24),
          top: Common.getLengthByIPhone7(30),
          marginLeft: Common.getLengthByIPhone7(335),
          justifyContent: 'center',
          alignItems: 'center',
        }} />
        <View onLayout={(event) => this.measureView(event)} style={{
          width: Common.getLengthByIPhone7(0),
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: Common.getLengthByIPhone7(36),
        }}>
          <Text style={{
            fontFamily: 'FuturaNewMediumReg',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(34),
            color: Colors.textColor,
            marginLeft: Common.getLengthByIPhone7(16),
            lineHeight: Common.getLengthByIPhone7(42),
          }}>
            {this.props.navigation.state.params.name}
          </Text>
        </View>
        <MapView
          style={{
            flex: 1,
            width: Common.getLengthByIPhone7(0),
          }}
          mapType="none"
          onRegionChange={() => this.onRegionChangeComplete()}
          onMarkerPress={(data) => this.onMarkerPress(data)}
          initialRegion={{
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.long,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}>
          <MapView.UrlTile
            urlTemplate={Config.urlTile}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.props.navigation.state.params.lat,
              longitude: this.props.navigation.state.params.long,
            }}>
              <Image source={require('./../assets/ic-geotag2.png')} style={{
                resizeMode: 'contain',
                width: Common.getLengthByIPhone7(48),
                height: Common.getLengthByIPhone7(66),
              }} />
          </MapView.Marker>
        </MapView>
        <LinearGradient style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(40),
          position: 'absolute',
          left: 0,
          top: this.state.y + this.state.height - Common.getLengthByIPhone7(15) + 10,
        }}
        colors={[Colors.backgroundColor, Colors.backgroundColor, 'rgba(253, 233, 208, 0.1)']} />
        <Animated.View style={{
          position: 'absolute',
          top: this.state.y + this.state.height - Common.getLengthByIPhone7(15) + Common.getLengthByIPhone7(24),
          width: Common.getLengthByIPhone7(336),
          backgroundColor: Colors.mainColor,
          borderRadius: Common.getLengthByIPhone7(6),
          opacity: this.infoOpacity,
          maxHeight: this.maxHeight,
          overflow: 'hidden',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: Common.getLengthByIPhone7(16),
          }}>
            <Image source={require('./../assets/ic-from-to.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(11),
              height: Common.getLengthByIPhone7(41),
              marginLeft: Common.getLengthByIPhone7(17),
            }} />
            <View style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(14),
                lineHeight: Common.getLengthByIPhone7(18),
                marginLeft: Common.getLengthByIPhone7(10),
                marginRight: Common.getLengthByIPhone7(16),
                color: Colors.backgroundColor,
              }}>
                НЕБОЛЬШОЕ ОПИСАНИЕ КАК ДОБРАТЬСЯ
              </Text>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(14),
                lineHeight: Common.getLengthByIPhone7(18),
                marginLeft: Common.getLengthByIPhone7(10),
                marginRight: Common.getLengthByIPhone7(16),
                marginBottom: Common.getLengthByIPhone7(16),
                color: Colors.backgroundColor,
              }}>
                {this.props.navigation.state.params.addr}
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: Common.getLengthByIPhone7(16),
          }}>
            <Image source={require('./../assets/ic-clock.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(13),
              height: Common.getLengthByIPhone7(13),
              marginLeft: Common.getLengthByIPhone7(17),
            }} />
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(14),
              lineHeight: Common.getLengthByIPhone7(15),
              marginLeft: Common.getLengthByIPhone7(8),
              marginRight: Common.getLengthByIPhone7(16),
              marginTop: Common.getLengthByIPhone7(7),
              color: Colors.backgroundColor,
              opacity: 0.5,
            }}>
              СЕГОДНЯ РАБОТАЕТ ДО 15:00
            </Text>
          </View>
        </Animated.View>
        <View style={{
          position: 'absolute',
          left: 0,
          top: 20,
        }}>
          <BackButton navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
