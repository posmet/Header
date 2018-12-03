import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import Network, { getCommonReports, favorCommonReport, unfavorCommonReport } from './../Utilites/Network'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import BackButton from './../components/BackButton'
import Spinner from 'react-native-loading-spinner-overlay';
import SignoutButton from './../components/SignoutButton'

@observer
export default class CommonDataScreen extends React.Component {

  state = {
    visible: true,
  };

  componentWillMount() {
    getCommonReports()
    .then(() => {
      this.setState({
        visible: false,
      });
    })
    .catch((err) => {
      this.setState({
        visible: false,
      });
    });
  }

  constructor(props) {
    super(props);
  }

  onFavorClick = (id) => {
    console.log('onFavorClick: ' + id);
    favorCommonReport(id)
    .then(() => {

    })
    .catch((err) => {

    });
  }

  onUnfavorClick = (id) => {
    console.log('onUnfavorClick: ' + id);
    unfavorCommonReport(id)
    .then(() => {

    })
    .catch((err) => {

    });
  }

  reportClick = (reportId, name) => {
    // console.log('name: ' + name);
    this.props.navigation.navigate('CommonGraph', {reportId: reportId, name: name});
  }

  _renderItem = (rowData) => {

    // console.log('rowData: ' + JSON.stringify(rowData));
    let star = (
    <TouchableOpacity onPress={() => this.onFavorClick(rowData.item._id)} style={{
      width: Common.getLengthByIPhone7(16),
      height: Common.getLengthByIPhone7(51),
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image source={require('./../assets/ic-unfavorites.png')} style={{
        resizeMode: 'contain',
        width: Common.getLengthByIPhone7(16),
        height: Common.getLengthByIPhone7(15),
      }} />
  </TouchableOpacity>);

    if(rowData.item.favor) {
      star = (
      <TouchableOpacity onPress={() => this.onUnfavorClick(rowData.item._id)} style={{
        width: Common.getLengthByIPhone7(16),
        height: Common.getLengthByIPhone7(51),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image source={require('./../assets/ic-favorites.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(16),
          height: Common.getLengthByIPhone7(15),
        }} />
    </TouchableOpacity>);
    }

    return (<TouchableOpacity onPress={() => this.reportClick(rowData.item.id, rowData.item.name)} style={{
      width: Common.getLengthByIPhone7(343),
      height: Common.getLengthByIPhone7(70),
    }}>
      <View style={{
        width: Common.getLengthByIPhone7(343),
        height: Common.getLengthByIPhone7(70) - 1,
        flexDirection: 'row',
      }}>
        {star}
        <View style={{
          height: Common.getLengthByIPhone7(70) - 1,
          width: Common.getLengthByIPhone7(318),
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <Text style={{
            fontFamily: 'FuturaNewMediumReg',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(18),
            lineHeight: Common.getLengthByIPhone7(28),
            width: Common.getLengthByIPhone7(318),
            marginLeft: Common.getLengthByIPhone7(10),
            marginTop: Common.getLengthByIPhone7(1),
            color: Colors.textColor,
          }}>
            {rowData.item.name}
          </Text>
          <Text style={{
            fontFamily: 'FuturaNewBook',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(15),
            marginLeft: Common.getLengthByIPhone7(10),
            color: Colors.textColor,
            opacity: 0.5,
          }}>
            {rowData.item.group}
          </Text>
        </View>
      </View>
      <View style={{
        width: Common.getLengthByIPhone7(343),
        height: 1,
        backgroundColor: '#B08F72',
        opacity: 0.1,
      }}>
      </View>
    </TouchableOpacity>);
  }

  render() {

    /*
    <View style={{
      position: 'absolute',
      right: 0,
      top: 20,
    }}>
      <SignoutButton navigation={this.props.navigation}/>
    </View>
    */
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        <View style={{
          width: Dimensions.get('window').width,
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
            Общие отчеты
          </Text>
        </View>
        <FlatList
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            width: Common.getLengthByIPhone7(0),
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          scrollEventThrottle={16}
          data={Network.commonReportsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
        <Spinner
          visible={this.state.visible}
          textContent={"Загрузка..."}
          overlayColor={'rgba(32, 42, 91, 0.3)'}
          textStyle={{color: '#FFF'}}
        />
      </View>
    );
  }
}
