import React from 'react';
import { Platform, Text, Image, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
// import { MapView } from 'expo';
import MapView, { AnimatedRegion, Marker, UrlTile } from 'react-native-maps';
import Network, { searchPharms } from './../Utilites/Network'
import Search from 'react-native-search-box';

@observer
export default class AptekaMapView extends React.Component {

  state = {
    name: 'Аптека №1',
    address: 'ул. Ленина, д. 100',
    pic:  '',
    showInfo: false,

    curAng: 45,
    tracker: false,
    prevPos: null,
    curPos: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        this.changePosition(newCoordinate);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  changePosition = (newCoordinate) => {
    let state = { prevPos: this.state.curPos, curPos: newCoordinate };
    if (!this.state.tracker) {
      state.tracker = true;
    }
    const tracker = this.state.tracker;
    this.setState(state, () => {
      if (!tracker) {
        this.navigateMap(newCoordinate, 1);
      }
    });
    // this.updateMap();
  };

  navigateMap = (newCoordinate) => {
    console.log('navigate');
    this.refs.map._component.animateToCoordinate(newCoordinate || this.state.curPos, 1);
  };

  getRotation = (prevPos, curPos) => {
    if (!prevPos) return 0;
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff)) / Math.PI;
  };

  updateMap = () => {
    console.log('update');
    const { curPos, prevPos, curAng } = this.state;
    const curRot = this.getRotation(prevPos, curPos);
    this.refs.map.animateToNavigation(curPos, curRot, curAng);
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
        markers.push(<Marker
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

        </Marker>);
      } else {
        markers.push(<Marker
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
        </Marker>);
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
        <MapView.Animated
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
          onPress={() => this.onMapClick()}
          onRegionChangeComplete={this.reloadEntities}
          onMarkerPress={(data) => this.onMarkerPress(data)}>
            <UrlTile
              urlTemplate={Config.urlTile}
            />
            {
              this.state.curPos ?
                <Marker.Animated
                  coordinate={this.state.curPos}
                  ref={el => this.marker = el}
                >
                  <View style={{width:20, height:20, borderRadius:10, backgroundColor:'white', justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:14, height:14, borderRadius:7, backgroundColor:'blue'}} />
                  </View>
                </Marker.Animated>
              : null
            }
          {markers}
        </MapView.Animated>
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
        {
          this.state.curPos ?
            <TouchableOpacity style={{
              position: 'absolute',
              height: Common.getLengthByIPhone7(42),
              right: Common.getLengthByIPhone7(16),
              top: Common.getLengthByIPhone7(93),
            }} onPress={() => this.navigateMap()}>
              <Image source={require('./../assets/ic-location.png')} style={{
                resizeMode: 'contain',
                width: Common.getLengthByIPhone7(40),
                height: Common.getLengthByIPhone7(40),
              }} />
            </TouchableOpacity>
          : null
        }
        {info}
    </View>
    );
  }
}
