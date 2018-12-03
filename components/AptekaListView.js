import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import Network, { searchPharms } from './../Utilites/Network'
import Search from 'react-native-search-box';

@observer
export default class AptekaListView extends React.Component {

  state = {

  };

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  onSearch = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onSearch', text);
        resolve();
    });
  }

  onChangeText = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onChangeText', text);
        searchPharms(text)
        .then(() => {

        })
        .catch(() => {

        });
        resolve();
    });
  }

  onCancel = () => {
    return new Promise((resolve, reject) => {
        console.log('onCancel');
        Network.pharmsList = Network.pharmsList2;
        resolve();
    });
  }

  onAptekaPress = (id, name) => {
    if(this.props.info) {
      this.props.navigation.navigate('Apteka', {id: id, info: true});
    } else {
      this.props.navigation.navigate('AptekaReport', {name: name, id: id});
    }
  }

  _renderItem = (item, index) => {
    // console.log('item: '+index);
    return (
      <TouchableOpacity onPress={() => this.onAptekaPress(item.id, item.name)} style={{
        width: Common.getLengthByIPhone7(343),
        height: Common.getLengthByIPhone7(70),
      }}>
        <View style={{
          height: Common.getLengthByIPhone7(70) - 1,
          maxWidth: Common.getLengthByIPhone7(343),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <Text style={{
            fontFamily: 'FuturaNewMediumReg',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(20),
            color: Colors.textColor,
            lineHeight: Common.getLengthByIPhone7(28),
          }}
          numberOfLines={1}>
            {index+1}
          </Text>
          <Image
            defaultSource={require('./../assets/ic-placeholder-small.jpeg')}
            source={{uri: Config.apiDomain + '/' + item.pic}}
            style={{
              resizeMode: 'cover',
              width: Common.getLengthByIPhone7(50),
              height: Common.getLengthByIPhone7(50),
              marginLeft: Common.getLengthByIPhone7(10),
            }} />
          <View style={{
            marginLeft: Common.getLengthByIPhone7(10),
            marginRight: Common.getLengthByIPhone7(16),
            maxWidth: Common.getLengthByIPhone7(250),
          }}>
            <Text style={{
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(20),
              color: Colors.textColor,
              lineHeight: Common.getLengthByIPhone7(28),
            }}
            numberOfLines={1}>
              {item.id} {item.name}
            </Text>
            <Text style={{
              fontFamily: 'RoadRadio',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              color: Colors.textColor,
              // lineHeight: Common.getLengthByIPhone7(28),
              opacity: 0.5,
            }}
            numberOfLines={2}>
              {item.addr}
            </Text>
          </View>
        </View>
        <View style={{
          width: Common.getLengthByIPhone7(343),
          height: 1,
          backgroundColor: Colors.borderColor,
          opacity: 0.1,
        }}>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FDE9D0',
      }}>
        <View style={{
          position: 'absolute',
          height: Common.getLengthByIPhone7(42),
          width: Common.getLengthByIPhone7(0) - 2*Common.getLengthByIPhone7(16),
          left: Common.getLengthByIPhone7(16),
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
            onDelete={() => this.onCancel()}
            placeholder='поиск...'
            titleCancelColor='black'
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
          <Image source={require('./../assets/ic-search.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
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
            Список Аптек
          </Text>
        </View>
        <FlatList
          style={{
            // position: 'absolute',
            backgroundColor: 'transparent',
            // left: 0,
            // right: 0,
            // bottom: 0,
            flex: 1,
            marginTop: Common.getLengthByIPhone7(112),
            width: Common.getLengthByIPhone7(0),
          }}
          contentContainerStyle={{
            alignItems: 'center',
            // width: Common.getLengthByIPhone7(343),
          }}
          scrollEventThrottle={16}
          data={Network.pharmsList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => this._renderItem(item, index)}
        />
    </View>
    );
  }
}
