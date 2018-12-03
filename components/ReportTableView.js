import React from 'react';
import { Platform, Text, Image, View, Dimensions } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import Common from './../Utilites/Common'

export default class ReportTableView extends React.Component {

  state = {
    type: 0,
  };

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  render() {

    let nameWidth = Common.getLengthByIPhone7(50);
    let columnWidth = (Common.getLengthByIPhone7(0) - nameWidth)/this.props.data.length;

    let table = [];
    let header = [];

    if(this.isPortrait()) {
      columnWidth = (Common.getLengthByIPhone7(0) - nameWidth)/this.props.data.length;
      for(let i=0;i<this.props.data.length;i++) {
        header.push(<View style={{
          height: Common.getLengthByIPhone7(33),
          width: columnWidth,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
          <Text style={{
            fontFamily: 'RoadRadioBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(10),
            lineHeight: Common.getLengthByIPhone7(13),
            color: Colors.mainColor,
          }}>
            {this.props.data[i].name}
          </Text>
        </View>);
      }

      table.push(<View style={{
        height: Common.getLengthByIPhone7(33),
        width: Common.getLengthByIPhone7(0),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(176, 143, 114, 0.1)',
      }}
      key={Math.random()}>
        <View style={{
          height: Common.getLengthByIPhone7(33),
          width: nameWidth,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
        </View>
        {header}
      </View>);

      for(let i=0;i<this.props.datax.length;i++) {
        let header = [];

        for(let y=0;y<this.props.data.length;y++) {

          let text = null;
          if(this.props.data[y].vals.length > i) {
            text = this.props.data[y].vals[i];
          }
          header.push(<View style={{
            height: Common.getLengthByIPhone7(33),
            width: columnWidth,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: 'rgba(176, 143, 114, 0.1)',
          }}
          key={Math.random()}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(14),
              lineHeight: Common.getLengthByIPhone7(15),
              color: Colors.textColor,
            }}>
              {text}
            </Text>
          </View>);
        }

        table.push(<View style={{
          height: Common.getLengthByIPhone7(33),
          width: Common.getLengthByIPhone7(0),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
          <View style={{
            height: Common.getLengthByIPhone7(33),
            width: nameWidth,
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: 'rgba(176, 143, 114, 0.1)',
          }}
          key={Math.random()}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(13),
              marginRight: Common.getLengthByIPhone7(7),
              color: Colors.mainColor,
            }}>
              {this.props.datax[i]}
            </Text>
          </View>
          {header}
        </View>);
      }
    } else {
      columnWidth = (Dimensions.get('window').width - nameWidth)/this.props.datax.length;
      for(let i=0;i<this.props.datax.length;i++) {
        header.push(<View style={{
          height: Common.getLengthByIPhone7(33),
          width: columnWidth,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
          <Text style={{
            fontFamily: 'RoadRadioBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(10),
            lineHeight: Common.getLengthByIPhone7(13),
            color: Colors.mainColor,
          }}>
            {this.props.datax[i]}
          </Text>
        </View>);
      }

      table.push(<View style={{
        height: Common.getLengthByIPhone7(33),
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(176, 143, 114, 0.1)',
      }}
      key={Math.random()}>
        <View style={{
          height: Common.getLengthByIPhone7(33),
          width: nameWidth,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
        </View>
        {header}
      </View>);

      for(let i=0;i<this.props.data.length;i++) {
        let header = [];

        for(let y=0;y<this.props.datax.length;y++) {

          let text = null;
          if(this.props.data[i].vals.length > y) {
            text = this.props.data[i].vals[y];
          }
          header.push(<View style={{
            height: Common.getLengthByIPhone7(33),
            width: columnWidth,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: 'rgba(176, 143, 114, 0.1)',
          }}
          key={Math.random()}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(15),
              color: Colors.textColor,
            }}>
              {text}
            </Text>
          </View>);
        }

        table.push(<View style={{
          height: Common.getLengthByIPhone7(33),
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(176, 143, 114, 0.1)',
        }}
        key={Math.random()}>
          <View style={{
            height: Common.getLengthByIPhone7(33),
            width: nameWidth,
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: 'rgba(176, 143, 114, 0.1)',
          }}
          key={Math.random()}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(13),
              marginRight: Common.getLengthByIPhone7(7),
              color: Colors.mainColor,
            }}>
              {this.props.data[i].name}
            </Text>
          </View>
          {header}
        </View>);
      }
    }

    return (
      <View style={{
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width,
      }}>
        {table}
      </View>
    );
  }
}
