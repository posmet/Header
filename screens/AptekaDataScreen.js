import React from 'react';
import { Platform, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import AptekaListView from './../components/AptekaListView'
import AptekaMapView from './../components/AptekaMapView'
import Network, { getPharms } from './../Utilites/Network'

@observer
export default class AptekaDataScreen extends React.Component {

  state = {
    page: 1,
  };

  componentWillMount() {
    getPharms()
    .then(() => {

    })
    .catch((err) => {

    });
  }

  constructor(props) {
    super(props);
  }

  onMapClick = () => {
    this.setState({
      page: 0,
    });
  }

  onListClick = () => {
    this.setState({
      page: 1,
    });
  }

  render() {

    let mapBackroundColor = 'white';
    let mapTextColor = Colors.mainColor;
    let listBackroundColor = Colors.mainColor;
    let listTextColor = 'white';

    let view = (<AptekaListView navigation={this.props.navigation}/>);

    if(this.state.page == 0) {
      listBackroundColor = 'white';
      listTextColor = Colors.mainColor;
      mapBackroundColor = Colors.mainColor;
      mapTextColor = 'white';

      view = (<AptekaMapView navigation={this.props.navigation}/>);
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        {view}
        <LinearGradient style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: Common.getLengthByIPhone7(70),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        colors={['rgba(255, 255, 255, 0.1)', 'white', 'white', 'white', 'white', 'white']}>
          <TouchableOpacity style={{
            backgroundColor: mapBackroundColor,
            width: Common.getLengthByIPhone7(98),
            height: Common.getLengthByIPhone7(38),
            borderRadius: Common.getLengthByIPhone7(6),
            marginRight: Common.getLengthByIPhone7(21),
            marginTop: Common.getLengthByIPhone7(10),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: Colors.mainColor,
          }}
          onPress={() => this.onMapClick()}>
            <Text style={{
              fontFamily: 'RodchenkoCondRegular',
              textAlign: 'center',
              fontSize: Common.getLengthByIPhone7(18),
              color: mapTextColor,
              lineHeight: Common.getLengthByIPhone7(19),
            }}>
              КАРТА АПТЕК
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: listBackroundColor,
            width: Common.getLengthByIPhone7(98),
            height: Common.getLengthByIPhone7(38),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(21),
            marginTop: Common.getLengthByIPhone7(10),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: Colors.mainColor,
          }}
          onPress={() => this.onListClick()}>
            <Text style={{
              fontFamily: 'RodchenkoCondRegular',
              textAlign: 'center',
              fontSize: Common.getLengthByIPhone7(18),
              color: listTextColor,
              lineHeight: Common.getLengthByIPhone7(19),
            }}>
              СПИСОК АПТЕК
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}
