import React from 'react';
import { Platform, Text, Image, View, Dimensions } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import Common from './../Utilites/Common'

import { VictoryChart, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryZoomContainer, VictoryContainer, VictoryLabel, VictoryTooltip, VictoryGroup, VictoryStack, VictoryBar } from 'victory-native';
import Svg from 'react-native-svg';

let colors = ['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

export default class ReportHistogramView extends React.Component {

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

    let length = 0;

    for(let i=0;i<this.props.data.length;i++) {
      // if (i <= 1) {
        data.push({data: this.props.data[i].vals, color: colors[i]});
      // }
      let vals = this.props.data[i].vals;
      for(let y=0;y<vals.length;y++) {
        let val = vals[y].toString();
        if(val.length > length) {
          length = val.length;
        }
      }
    }

    console.log('length: ' + length);
    length = length + 3;

    const chartWidth = Dimensions.get('window').width - Common.getLengthByIPhone7(20);
    const chartPaddingLeft = 60;
    const chartPaddingTop = 45;
    const barWidth = 3;

    // for(let i=0;i<this.props.data.length;i++) {
    //   data.push({data: this.props.data[i].vals, color: colors[i]});
    // }

    return (
      <View>
        {/*<BarChart
          data={{
            labels: this.props.datax,
            datasets: data
          }}
          rowx={this.props.rowx}
          rowy={this.props.rowy}
          width={Common.getLengthByIPhone7(360)}
          height={Common.getLengthByIPhone7(221)}
          paddingRight={length/11*100}
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
          <VictoryChart
            width={chartWidth}
            height={Common.getLengthByIPhone7(221)}
            containerComponent={<VictoryContainer
              disableContainerEvents={true}
              onTouchStart={this.props.toggleScrolling}
              onTouchEnd={this.props.toggleScrolling}
            />}
            theme={VictoryTheme.material}
            padding={{left: chartPaddingLeft, bottom: 50, top: chartPaddingTop, right: 15}}
          >
            <VictoryAxis
              crossAxis
              fixLabelOverlap={true}
              label={this.props.rowx}
              tickCount={10}
              tickValues={this.props.datax}
              style={{
                axis: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                axisLabel: {fontSize: 12, padding: 30, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                ticks: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                tickLabels: {fontSize: 8, padding: 5, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5}
              }}
              axisLabelComponent={<VictoryLabel x={0} transform={`translate(${chartWidth - 30})`} textAnchor="start" />}
            />
            <VictoryAxis
              crossAxis
              dependentAxis
              axisLabelComponent={<VictoryLabel y={chartPaddingTop - 15} x={chartPaddingLeft - 20} textAnchor="end" />}
              label={this.props.rowy}
              style={{
                axis: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                axisLabel: {fontSize: 12, padding: 30, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                ticks: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                tickLabels: {fontSize: 8, padding: 5, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5}
              }}
            />
            <VictoryGroup
              offset={5}
              colorScale={colors}
              padding={{left: chartPaddingLeft, bottom: 50, top: chartPaddingTop, right: 15}}
              labelComponent={<VictoryTooltip />}
            >
              {
                data.map((report, index) => {
                  return (
                    <VictoryBar
                      barWidth={barWidth}
                      key={index.toString()}
                      style={{
                        labels: {
                          fontSize: 10
                        }
                      }}
                      data={this.props.datax.map((v, i) => ({x: v, y: report.data[i] || 0, label: report.data[i] || 0}))}
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
                                mutation: () => {
                                  return {barWidth: barWidth*2};
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
                                  return {barWidth: barWidth};
                                }
                              }
                            ];
                          },
                        }
                      }]}
                    />
                  )
                })
              }
            </VictoryGroup>
          </VictoryChart>
      </View>
    );
  }
}
