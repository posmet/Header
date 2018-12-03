import React from 'react';
import { Platform, Text, Image, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import { MapView } from 'expo';
import { AnimatedRegion } from 'react-native-maps';
import Network, { searchPharms } from './../Utilites/Network'
import Search from 'react-native-search-box';

@observer
export default class AptekaMapView extends React.Component {

  state = {
    name: 'Аптека №1',
    address: 'ул. Ленина, д. 100',
    pic:  '',
    showInfo: false,

    latitude: Config.latitude,
    longitude: Config.longitude,
    routeCoordinates: [],
    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: Config.latitude,
      longitude: Config.longitude
    }),
    mapIsReady: false
  };

  componentWillMount() {
    console.log('will');
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log('position', position);
        const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        this.navigateMap(newCoordinate);
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
    console.log('init');
  }

  constructor(props) {
    super(props);
  }

  navigateMap = (newCoordinate) => {
    console.log(Platform.OS , newCoordinate);
    const { coordinate } = this.state;
    if (Platform.OS === "android") {
      if (this.refs.map) {
        console.log(this.refs.map, this.refs.map._component);
        this.refs.map._component.animateMarkerToCoordinate(
          newCoordinate,
          500
        );
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  onMapReady = () => {
    const { latitude, longitude } = this.state;
    if (!this.state.mapIsReady) {
      this.setState({ mapIsReady: true }, () => {
        const newCoordinate = {
          latitude,
          longitude
        };
        this.navigateMap(newCoordinate);
      });
    }
  };

  onSearch = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onSearch', text);
        resolve();
    });
  };

  onChangeText = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onChangeText', text);
        searchPharms(text)
        .then(() => {
          this.refs.map.fitToElements(true);
        })
        .catch(() => {

        });
        resolve();
    });
  };

  onCancel = () => {
    return new Promise((resolve, reject) => {
        console.log('onCancel');
        Network.pharmsList = Network.pharmsList2;
        this.refs.map.fitToElements(true);
        resolve();
    });
  };

  onAptekaPress = (id, name) => {
    if(this.props.info) {
      this.props.navigation.navigate('Apteka', {id: id, info: true});
    } else {
      this.props.navigation.navigate('AptekaReport', {name: name, id: id});
    }
  };

  onMarkerPress = (data) => {
    console.log('data: ' + JSON.stringify(data.nativeEvent) + ' d: ' + data.data);
    if(Network.pharmsList.length > data.nativeEvent.id) {
      this.setState({
        name: Network.pharmsList[data.nativeEvent.id].name,
        address: Network.pharmsList[data.nativeEvent.id].addr,
        pic: Network.pharmsList[data.nativeEvent.id].pic,
        id: Network.pharmsList[data.nativeEvent.id].id,
        showInfo: true,
      });
    }
  };

  onMPress = (data) => {
    console.log('onMPress data: ' + JSON.stringify(data.nativeEvent) + ' d: ' + data.data);
  };

  onMarkerClick = (id, data) => {
    console.log('pharm click: ' + id);
    // if(Network.pharmsList.length > id) {
    //   this.setState({
    //     name: Network.pharmsList[id].name,
    //     address: Network.pharmsList[id].addr,
    //     pic: Network.pharmsList[id].pic,
    //     showInfo: true,
    //   });
    // }
    //
    // this.setState({
    //   showInfo: true,
    // });
  };

  onMapClick = () => {

    this.setState({
      showInfo: false,
    });
  };

  render() {

    let markers = [];
    let latitude = Config.latitude;
    let longitude = Config.longitude;
    let image = null;
    let icon = null;

    for(var i = 0; i < Network.pharmsList.length; i++) {

      if(Platform.OS === "android") {
        markers.push(<MapView.Marker
          key={i}
          id={i}
          identifier={i.toString()}
          data={Network.pharmsList[i]}
          image={require('./../assets/ic-geotag.png')}
          coordinate={{
            latitude: Network.pharmsList[i].wpos,
            longitude: Network.pharmsList[i].hpos,
        }}
        onPress={(data) => this.onMPress(data)}>

        </MapView.Marker>);
      } else {
        markers.push(<MapView.Marker
          key={i}
          id={i}
          identifier={i.toString()}
          data={Network.pharmsList[i]}
          coordinate={{
            latitude: Network.pharmsList[i].wpos,
            longitude: Network.pharmsList[i].hpos,
        }}
        onPress={(data) => this.onMPress(data)}>
          <TouchableWithoutFeedback onPress={(data) => this.onMarkerClick(i, data)}>
            <Image
              source={require('./../assets/ic-geotag.png')}
              style={{
                resizeMode: 'contain',
                width: Common.getLengthByIPhone7(48),
                height: Common.getLengthByIPhone7(66),
              }} />
          </TouchableWithoutFeedback>
        </MapView.Marker>);
      }

      latitude = Network.pharmsList[i].wpos;
      longitude = Network.pharmsList[i].hpos;
    }

    let info = null;
    if(this.state.showInfo) {
      info = (<TouchableOpacity style={{
        // height: Common.getLengthByIPhone7(72),
        backgroundColor: Colors.mainColor,
        position: 'absolute',
        bottom: Common.getLengthByIPhone7(80),
        left: Common.getLengthByIPhone7(16),
        right: Common.getLengthByIPhone7(16),
        borderRadius: Common.getLengthByIPhone7(6),
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.16,
        shadowRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => this.onAptekaPress(this.state.id, this.state.name)}>
        <View style={{
          // height: Common.getLengthByIPhone7(50),
          width: Common.getLengthByIPhone7(250),
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
          <Image
            defaultSource={require('./../assets/ic-placeholder-small.jpeg')}
            source={{uri: Config.apiDomain + '/' + this.state.pic}}
            style={{
              resizeMode: 'cover',
              width: Common.getLengthByIPhone7(50),
              height: Common.getLengthByIPhone7(50),
              marginLeft: Common.getLengthByIPhone7(12),
              marginTop: Common.getLengthByIPhone7(12),
              marginBottom: Common.getLengthByIPhone7(12),
            }} />
          <View style={{
            marginTop: Common.getLengthByIPhone7(8),
            marginBottom: Common.getLengthByIPhone7(12),
          }}>
            <Text style={{
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(20),
              color: '#FDE9D0',
              marginLeft: Common.getLengthByIPhone7(16),
              lineHeight: Common.getLengthByIPhone7(25),
            }}>
              {this.state.name}
            </Text>
            <Text style={{
              fontFamily: 'RoadRadio',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              color: '#FDE9D0',
              opacity: 0.5,
              marginLeft: Common.getLengthByIPhone7(16),
              lineHeight: Common.getLengthByIPhone7(13),
            }}>
              {this.state.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>);
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FDE9D0',
        width: Common.getLengthByIPhone7(0),
      }}>
        <MapView
          ref="map"
          mapType="none"
          style={{
            flex: 1,
            width: Common.getLengthByIPhone7(0),
          }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
          // onMapReady={this.onMapReady}
          onPress={() => this.onMapClick()}
          onRegionChangeComplete={this.reloadEntities}
          onMarkerPress={(data) => this.onMarkerPress(data)}>
            <MapView.UrlTile
              urlTemplate={Config.urlTile}
            />
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
            >
              <View style={{width:20, height:20, borderRadius:10, backgroundColor:'white', justifyContent:'center',alignItems:'center'}}>
                <View style={{width:14, height:14, borderRadius:7, backgroundColor:'blue'}} />
              </View>
            </MapView.Marker>
          {markers}
        </MapView>
        <View style={{
          position: 'absolute',
          height: Common.getLengthByIPhone7(42),
          left: Common.getLengthByIPhone7(16),
          right: Common.getLengthByIPhone7(16),
          top: Common.getLengthByIPhone7(34),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{
            width: Common.getLengthByIPhone7(302),
            height: Common.getLengthByIPhone7(42),
          }}>
          <Search
            style={{
              width: Common.getLengthByIPhone7(302),
              height: Common.getLengthByIPhone7(42),
            }}
            ref="search_box"
            cancelTitle='Отмена'
            placeholder='поиск...'
            titleCancelColor='black'
            onDelete={() => this.onCancel()}
            onSearch={(text) => this.onSearch(text)}
            onCancel={() => this.onCancel()}
            onChangeText={(text) => this.onChangeText(text)}
            backgroundColor='transparent'
            placeholderTextColor='#20150E'
            inputStyle={{
              fontFamily: 'RoadRadioLight',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(14),
              lineHeight: Common.getLengthByIPhone7(18),
              color: '#20150E',
            }}
            /**
            * There many props that can customizable
            * Please scroll down to Props section
            */
          />
          </View>
          <Image source={require('./../assets/ic-add.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </View>
        {info}
    </View>
    );
  }
}
