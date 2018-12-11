import React from 'react';
import { Platform, Text, Image, View, Dimensions } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config';
import Common from './../Utilites/Common';
import { VictoryChart, VictoryPie, VictoryTheme, VictoryVoronoiContainer, VictoryAxis, VictoryZoomContainer, VictoryContainer, VictoryScatter, VictoryLabel, VictoryTooltip, VictoryGroup } from 'victory-native';
import {G} from 'react-native-svg';

let colors = ['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

class CustomLabel extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    const { datum, y, style } = this.props;
    const tooltipStyle = Object.assign({}, style);
    tooltipStyle.fill = 'black';
    return (
      <G>
        <VictoryLabel
          {...this.props}
          text={`${Math.round(datum.y/datum.total*100)}%`}
        />
        <VictoryTooltip
          {...this.props}
          style={tooltipStyle}
          text={`${datum.name}\n${datum.y}`}
          orientation="top"
          pointerLength={5}
          height={40}
        />
      </G>
    )
  }
}


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
    let total = 0;

    for(let i=0;i<this.props.data.length;i++) {
      let value = this.props.data[i].vals[this.props.data[i].vals.length - 1];
      total += value;
      data.push({name: this.props.data[i].name, value: value, color: colors[i], y: value, label: value, radius: 50});
    }

    const chartWidth = Dimensions.get('window').width - Common.getLengthByIPhone7(20);

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Common.getLengthByIPhone7(0),
        height: Common.getLengthByIPhone7(221),
      }}>
        {/*<PieChart
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
        />*/}
          <VictoryPie
            containerComponent={<VictoryContainer
              disableContainerEvents={true}
              onTouchStart={this.props.toggleScrolling}
              onTouchEnd={this.props.toggleScrolling}
            />}
            labelComponent={<CustomLabel />}
            width={chartWidth}
            height={Common.getLengthByIPhone7(221)}
            innerRadius={100}
            labelRadius={75}
            padAngle={3}
            style={{ labels: { fill: "white", fontSize: 10, fontWeight: "bold" } }}
            labels={(d) => d.y}
            radius={d => d.radius}
            colorScale={colors}
            data={data.map(item => {
              item.total = total;
              item.count = data.length;
              return item;
            })}
            events={[{
              target: "data",
              eventHandlers: {
                onPressIn: (targetProps) => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        return {active: true};
                      }
                    },
                    {
                      target: "data",
                      mutation: (props) => {
                        return {
                          radius: 40,
                        };
                      }
                    }
                  ];
                },
                onPressOut: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        return {active: false};
                      }
                    },
                    {
                      target: "data",
                      mutation: () => {
                        return {radius: 50};
                      }
                    }
                  ];
                },
              }
            }]}
          />
      </View>
    );
  }
}
