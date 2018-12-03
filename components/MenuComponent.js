import React from 'react';
import { Platform, Text, Image, View, Dimensions, ListView, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'

let rows = [
  {id: 0 },
  {id: 1, name: 'Монитор руководителя'},
  {id: 2, name: 'Общие данные'},
  {id: 3, name: 'Данные по аптекам'},
  {id: 4, name: 'Справочная информация'},
]

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})

export default class MenuComponent extends React.Component {

  state = {
    dataSource: ds.cloneWithRows(rows),
    selectedMenu: 1,
  };

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  onMenuClick = (id) => {
    this.setState({
      selectedMenu: id,
      dataSource: ds.cloneWithRows(rows),
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

  renderRow = (rowData) => {

    if(rowData.id == 0) {
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
      <TouchableOpacity activeOpacity={1} onPress={() => {this.onMenuClick(rowData.id)}}>
        <View style={{
          height: Dimensions.get('window').width*50/375,
          width: Dimensions.get('window').width*300/375,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: (this.state.selectedMenu == rowData.id ? '#738D99' : 'transparent')
        }}>
          <Text style={{
            fontFamily: 'sfUiDisplayRegular',
            fontSize: Dimensions.get('window').width*48/750,
            color: 'white',
            textAlign: 'left',
            backgroundColor: 'transparent',
            marginLeft: Dimensions.get('window').width*15/375,
          }}>
            {rowData.name}
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
        <ListView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
          bounces={true}
        />
      </View>
    );
  }
}
