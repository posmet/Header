import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'

let rows = [
  {id: 0 },
  {id: 1, name: 'Монитор руководителя'},
  {id: 2, name: 'Общие данные'},
  {id: 3, name: 'Данные по аптекам'},
  {id: 4, name: 'Справочная информация'},
]

export default class MenuComponent extends React.Component {

  state = {
    dataSource: rows,
    selectedMenu: 1,
  };

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  onMenuClick = (id) => {
    this.setState({
      selectedMenu: id
    });

    if(id == 1) {
      this.props.navigation.navigate('Main');
    } else if(id == 2) {
      this.props.navigation.navigate('CommonData');
    } else if(id == 3) {
      this.props.navigation.navigate('AptekaData');
    } else if(id == 4) {
      this.props.navigation.navigate('Info');
    }
  }

  renderRow = ({item}) => {

    if(item.id == 0) {
      return (<View style={{
        height: Dimensions.get('window').width*250/375,
        width: Dimensions.get('window').width*300/375,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontFamily: 'sfUiDisplayRegular',
          fontSize: Dimensions.get('window').width*48/750,
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'transparent',
          marginTop: Dimensions.get('window').width*20/750,
        }}>
          Меню
        </Text>
      </View>);
    } else {

      return (
      <TouchableOpacity activeOpacity={1} onPress={() => {this.onMenuClick(item.id)}}>
        <View style={{
          height: Dimensions.get('window').width*50/375,
          width: Dimensions.get('window').width*300/375,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: (this.state.selectedMenu == item.id ? '#738D99' : 'transparent')
        }}>
          <Text style={{
            fontFamily: 'sfUiDisplayRegular',
            fontSize: Dimensions.get('window').width*48/750,
            color: 'white',
            textAlign: 'left',
            backgroundColor: 'transparent',
            marginLeft: Dimensions.get('window').width*15/375,
          }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>);
    }
  }

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.navBarColor,
      }}>
        <FlatList
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
          enableEmptySections={true}
          data={this.state.dataSource}
          renderItem={this.renderRow}
          removeClippedSubviews={false}
          bounces={true}
        />
      </View>
    );
  }
}
