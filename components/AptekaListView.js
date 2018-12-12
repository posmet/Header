import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import Network, { searchPharms } from './../Utilites/Network'
import Search from 'react-native-search-box';
import Spinner from 'react-native-loading-spinner-overlay';

class MyListItem extends React.PureComponent {
  render() {
    const { item, index, onAptekaPress } = this.props;
    return (
      <TouchableOpacity onPress={onAptekaPress.bind(onAptekaPress, item.id, item.name)} style={{
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
            source={{uri: `${Config.apiDomain}/${item.pic}`}}
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
    )
  }
}


@observer
export default class AptekaListView extends React.Component {

  state = {

  };

  componentWillMount() {

  }

  componentWillUnmount() {
    Network.pharmsPage = 1;
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

  _renderItem = ({item, index}) => {
    return <MyListItem
      item={item}
      index={index}
      onAptekaPress={this.onAptekaPress}
    />
  };

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
          alignItems: 'center',
          justifyContent: 'space-between',
          top: Common.getLengthByIPhone7(74),
          position: 'absolute',
          flexDirection: 'row',
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
          <View style={{
            justifyContent: 'flex-end',
            marginRight: Common.getLengthByIPhone7(16),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={() => Network.setSort('id')} style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: Common.getLengthByIPhone7(7),
              borderWidth: 2,
              borderColor: Colors.mainColor,
              borderRadius: Common.getLengthByIPhone7(4),
              borderStyle: 'solid',
              backgroundColor: Network.pharmsSort === 'id' ? Colors.mainColor : 'transparent',
            }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  width: Common.getLengthByIPhone7(26),
                  height: Common.getLengthByIPhone7(26),
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontFamily: 'RodchenkoCondRegular',
                  color: Network.pharmsSort === 'id' ? '#fff' : Colors.mainColor,
                }}
              >
                ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Network.setSort('name')} style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: Colors.mainColor,
              borderRadius: Common.getLengthByIPhone7(4),
              borderStyle: 'solid',
              backgroundColor: Network.pharmsSort === 'name' ? Colors.mainColor : 'transparent',
            }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  width: Common.getLengthByIPhone7(26),
                  height: Common.getLengthByIPhone7(26),
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontFamily: 'RodchenkoCondRegular',
                  color: Network.pharmsSort === 'name' ? '#fff' : Colors.mainColor,
                }}
              >
                A
              </Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => Network.pharmsSort = 'number'} style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: Colors.mainColor,
              borderRadius: Common.getLengthByIPhone7(4),
              borderStyle: 'solid',
            }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  width: Common.getLengthByIPhone7(26),
                  height: Common.getLengthByIPhone7(26),
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontFamily: 'RodchenkoCondRegular',
                  color: Network.pharmsSort === 'id' ? '#fff' : Colors.mainColor,
                }}
              >
                #
              </Text>
            </TouchableOpacity>*/}
          </View>
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
          onEndReached={() => Network.pharmsPage = Network.pharmsPage + 1}
          onEndReachedThreshold={50}
          initialNumToRender={7}
          scrollEventThrottle={16}
          data={Network.pharmsListSorted}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={this._renderItem}
          getItemLayout={(data, index) => (
            {length: Common.getLengthByIPhone7(70), offset: Common.getLengthByIPhone7(70) * index, index}
          )}
        />
        <Spinner
          visible={Network.loading}
          textContent={"Загрузка..."}
          overlayColor={'rgba(32, 42, 91, 0.3)'}
          textStyle={{color: '#FFF'}}
        />
    </View>
    );
  }
}
