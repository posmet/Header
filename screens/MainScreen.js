import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import Network, { getMonitor } from './../Utilites/Network'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import SignoutButton from './../components/SignoutButton'

@observer
export default class MainScreen extends React.Component {

  state = {
    refreshing: false,
  };

  componentWillMount() {
    getMonitor()
    .then(() => {

    })
    .catch((err) => {

    });
  }

  constructor(props) {
    super(props);
  }

  onReportClick = (report) => {
    this.props.navigation.navigate('CommonGraph2', {reportId: report.detailpar, name: report.name});
  }

  _renderItem = (rowData) => {

    return (<TouchableOpacity style={{
      width: Common.getLengthByIPhone7(343),
      height: Common.getLengthByIPhone7(60),
    }}
    onPress={() => this.onReportClick(rowData.item)}>
      <View style={{
        width: Common.getLengthByIPhone7(343),
        height: Common.getLengthByIPhone7(70) - 1,
        flexDirection: 'row',
      }}>
        <View style={{
          height: Common.getLengthByIPhone7(70) - 1,
          width: Common.getLengthByIPhone7(343),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={{
            fontFamily: 'FuturaNewMediumReg',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(18),
            lineHeight: Common.getLengthByIPhone7(28),
            marginTop: Common.getLengthByIPhone7(8),
            width: Common.getLengthByIPhone7(200),
            color: Colors.textColor,
            opacity: 0.5,
          }}
          numberOfLines={2}>
            {rowData.item.name}
          </Text>
          <Text style={{
            fontFamily: 'RodchenkoCondensedBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(20),
            lineHeight: Common.getLengthByIPhone7(28),
            marginTop: Common.getLengthByIPhone7(15),
            marginLeft: 0,
            color: Colors.textColor,
          }}>
            {rowData.item.val}
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

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        <View style={{
          position: 'absolute',
          right: 0,
          top: 20,
        }}>
          <SignoutButton navigation={this.props.navigation}/>
        </View>
        <View style={{
          width: Dimensions.get('window').width,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          top: Common.getLengthByIPhone7(74),
          position: 'absolute',
        }}>
          <Text style={{
            fontFamily: 'RodchenkoCondensedBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(34),
            color: '#20150E',
            marginLeft: Common.getLengthByIPhone7(16),
            lineHeight: Common.getLengthByIPhone7(41),
          }}>
            Монитор Руководителя
          </Text>
        </View>
        <FlatList
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            left: 0,
            right: 0,
            bottom: 0,
            top: Common.getLengthByIPhone7(112),
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          scrollEventThrottle={16}
          data={Network.monitorList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
