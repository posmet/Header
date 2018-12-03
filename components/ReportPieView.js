import React from 'react';
import { Platform, Text, Image, View, Dimensions } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import Common from './../Utilites/Common'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

let colors = ['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

export default class ReportPieView extends React.Component {

  state = {
    type: 0,
  };

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {

    let data = [];

    for(let i=0;i<this.props.data.length;i++) {
      let value = this.props.data[i].vals[this.props.data[i].vals.length - 1];
      data.push({name: this.props.data[i].name, value: value, color: colors[i]});
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Common.getLengthByIPhone7(0),
        height: Common.getLengthByIPhone7(221),
      }}>
        <PieChart
          data={data}
          width={Common.getLengthByIPhone7(0)}
          height={Common.getLengthByIPhone7(221)}
          accessor="value"
          chartConfig={{
            backgroundColor: Colors.backgroundColor,
            backgroundGradientFrom: Colors.backgroundColor,
            backgroundGradientTo: Colors.backgroundColor,
            color: (opacity = 1) => Colors.mainColor,
            linesColor: (opacity = 1) => 'rgba(112, 112, 112, 0.1)',
            style: {

            }
          }}
        />
      </View>
    );
  }
}
