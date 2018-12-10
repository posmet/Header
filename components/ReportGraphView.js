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
} from 'react-native-chart-kit';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryAxis, VictoryZoomContainer, VictoryContainer, VictoryScatter, VictoryLabel, VictoryTooltip, VictoryGroup } from 'victory-native';
import Svg from 'react-native-svg';

let colors = ['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

export default class ReportGraphScreen extends React.Component {

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

    for (let i = 0; i < this.props.data.length; i++) {
      // if (i <= 2) {
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

    const chartWidth = Dimensions.get('window').width - Common.getLengthByIPhone7(20);
    const chartPaddingLeft = 60;
    const chartPaddingTop = 45;

    console.log('length: ' + length, data);
    length = length + 3;
    // console.log('props: ' + JSON.stringify(this.props));
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width,
        height: Common.getLengthByIPhone7(221),
      }}>
      {/*<LineChart
        data={{
          labels: this.props.datax,
          datasets: data
        }}
        rowx={this.props.rowx}
        rowy={this.props.rowy}
        width={Dimensions.get('window').width - Common.getLengthByIPhone7(20)}
        height={Common.getLengthByIPhone7(221)}
        chartConfig={{
          backgroundColor: Colors.backgroundColor,
          backgroundGradientFrom: Colors.backgroundColor,
          backgroundGradientTo: Colors.backgroundColor,
          color: (opacity = 1) => Colors.mainColor,
          linesColor: (opacity = 1) => 'rgba(112, 112, 112, 0.1)',
          style: {

          }
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />*/}
        <Svg width={chartWidth} height={Common.getLengthByIPhone7(221)} viewBox={`0 0 ${chartWidth} ${Common.getLengthByIPhone7(221)}`} style={{ width: "100%", height: "auto" }}>
          <VictoryChart
            standalone={false}
            width={chartWidth}
            height={Common.getLengthByIPhone7(221)}
            containerComponent={<VictoryContainer
              disableContainerEvents={true}
              onTouchStart={this.props.toggleScrolling}
              onTouchEnd={this.props.toggleScrolling}
            />}
            theme={VictoryTheme.material}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
            padding={{left: chartPaddingLeft, bottom: 50, top: chartPaddingTop, right: 15}}
          >
            <VictoryAxis
              crossAxis
              fixLabelOverlap
              label={this.props.rowx}
              tickCount={10}
              tickValues={this.props.datax}
              style={{
                axis: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                axisLabel: {fontSize: 12, padding: 30, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                ticks: {stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5},
                tickLabels: {fontSize: 8, padding: 5, stroke: Colors.mainColor, strokeWidth: 0, opacity: 0.5}
              }}
              axisLabelComponent={<VictoryLabel x={0} transform={`translate(${chartWidth - 30})`} textAnchor="end" />}
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
            {
              data.map((report, index) => {
                return (
                  <VictoryGroup
                    standalone={false}
                    key={index.toString()}
                    data={this.props.datax.map((v, i) => ({x: v, y: report.data[i] || 0, label: report.data[i] || 0}))}
                    labelComponent={<VictoryTooltip renderInPortal={false} />}
                  >
                    <VictoryLine
                      interpolation="monotoneX"
                      style={{ data: { stroke: report.color, opacity: 0.5 }}}
                    />
                    <VictoryScatter
                      size={6}
                      style={{ data: { fill: report.color }}}
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
                              }, {
                                target: "data",
                                mutation: () => {
                                  return { size: 8 };
                                }
                              }
                            ];
                          },
                        }
                      }]}
                    />
                  </VictoryGroup>
                )
              })
            }
          </VictoryChart>
        </Svg>
      </View>
    );
  }
}
