import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import Network, { getCommonReportById } from './../Utilites/Network'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import BackButton from './../components/BackButton'
import ReportGraphView from './../components/ReportGraphView'
import ReportPieView from './../components/ReportPieView'
import ReportHistogramView from './../components/ReportHistogramView'
import ReportTableView from './../components/ReportTableView'
import Spinner from 'react-native-loading-spinner-overlay';

let rows = [
  {id: 1},
  {id: 2},
  {id: 3},
];

let colors = ['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

@observer
export default class CommonGraphScreen extends React.Component {

  state = {
    visible: true,
    report: null,
    dataSource: rows,
    type: 0,
    isPortrait: true,
    scrollEnabled: true
  };

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    Dimensions.removeEventListener("change", this.orientationChange);
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  componentWillMount() {

    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
    Dimensions.addEventListener("change", this.orientationChange);

    this.setState({
      isPortrait: this.isPortrait(),
    });

    getCommonReportById(this.props.navigation.state.params.reportId)
    .then((report) => {
      let type = 0;

      if(report.type == 'graph') {
        type = 0;
      } else if(report.type == 'gyst') {
        type = 1;
      } else if(report.type == 'struct') {
        type = 2;
      }
      
      this.setState({
        visible: false,
        report: report,
        type: type,
        dataSource: rows,
      });
    })
    .catch((err) => {
      this.setState({
        visible: false,
        report: null,
        dataSource: rows,
      });
    });
  }

  constructor(props) {
    super(props);
  }

  orientationChange = () => {
    console.log('orientationChange');
    this.setState({
      isPortrait: this.isPortrait(),
      dataSource: rows,
    });
  };

  onGraphClick = () => {
    this.setState({
      type: 0,
      dataSource: rows,
    });
  };

  onHistoClick = () => {
    this.setState({
      type: 1,
      dataSource: rows,
    });
  };

  onPieClick = () => {
    this.setState({
      type: 2,
      dataSource: rows,
    });
  };

  onTableClick = () => {
    this.setState({
      type: 3,
      dataSource: rows,
    });
  };

  renderRow = (row) => {
    let rowData = row.item;
    if (this.state.report == null) {
      return null;
    } else {
      if (rowData.id == 1) {

        let view = null;
        if(this.state.type == 0) {
          view = (<ReportGraphView toggleScrolling={this.toggleScrolling} rowx={this.state.report.rowx} rowy={this.state.report.rowy} data={this.state.report.data} datax={this.state.report.datax}/>);
        } else if(this.state.type == 1) {
          view = (<ReportHistogramView rowx={this.state.report.rowx} rowy={this.state.report.rowy} data={this.state.report.data} datax={this.state.report.datax}/>);
        } else if(this.state.type == 2) {
          view = (<ReportPieView data={this.state.report.data} />);
        } else {
          return null;
        }
        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          minHeight: Common.getLengthByIPhone7(250),
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          {view}
        </View>);
      } else if(rowData.id == 2) {

        let graph = (<TouchableOpacity onPress={() => this.onGraphClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-graph-inact.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);

        let histo = (<TouchableOpacity onPress={() => this.onHistoClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-histogram-inact.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);

        let pie = (<TouchableOpacity onPress={() => this.onPieClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-pie-inact.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);

        let table = (<TouchableOpacity onPress={() => this.onTableClick()} style={{
          marginRight: Common.getLengthByIPhone7(16),
        }}>
          <Image source={require('./../assets/ic-button-table-inact.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);

        if(this.state.type == 0) {
          graph = (<TouchableOpacity onPress={() => this.onGraphClick()} style={{
            marginRight: Common.getLengthByIPhone7(24),
          }}>
            <Image source={require('./../assets/ic-button-graph-act.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(26),
              height: Common.getLengthByIPhone7(26),
            }} />
          </TouchableOpacity>);
        } else if(this.state.type == 1) {
          histo = (<TouchableOpacity onPress={() => this.onHistoClick()} style={{
            marginRight: Common.getLengthByIPhone7(24),
          }}>
            <Image source={require('./../assets/ic-button-histogram-act.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(26),
              height: Common.getLengthByIPhone7(26),
            }} />
          </TouchableOpacity>);
        } else if(this.state.type == 2) {
          pie = (<TouchableOpacity onPress={() => this.onPieClick()} style={{
            marginRight: Common.getLengthByIPhone7(24),
          }}>
            <Image source={require('./../assets/ic-button-pie-act.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(26),
              height: Common.getLengthByIPhone7(26),
            }} />
          </TouchableOpacity>);
        } else {
          table = (<TouchableOpacity onPress={() => this.onTableClick()} style={{
            marginRight: Common.getLengthByIPhone7(16),
          }}>
            <Image source={require('./../assets/ic-button-table-act.png')} style={{
              resizeMode: 'contain',
              width: Common.getLengthByIPhone7(26),
              height: Common.getLengthByIPhone7(26),
            }} />
          </TouchableOpacity>);
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          minHeight: Common.getLengthByIPhone7(46),
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
          {graph}
          {histo}
          {pie}
          {table}
        </View>);
      } else {

        if (this.state.type == 3) {
          return (<ReportTableView data={this.state.report.data} datax={this.state.report.datax}/>);
        }

        let legenda = [];
        for(let i=0;i<this.state.report.data.length;i++) {

          legenda.push(<View style={{
            width: Common.getLengthByIPhone7(0),
            minHeight: Common.getLengthByIPhone7(50),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          key={i}>
            <View style={{
              width: Common.getLengthByIPhone7(18),
              height: Common.getLengthByIPhone7(18),
              marginLeft: Common.getLengthByIPhone7(18),
              backgroundColor: 'transparent',
              borderRadius: Common.getLengthByIPhone7(9),
              borderWidth: Common.getLengthByIPhone7(4),
              borderColor: colors[i],
            }}>
            </View>
            <Text style={{
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(20),
              lineHeight: Common.getLengthByIPhone7(25),
              marginLeft: Common.getLengthByIPhone7(10),
              marginRight: Common.getLengthByIPhone7(16),
              color: Colors.textColor,
            }}>
              {this.state.report.data[i].name}
            </Text>
          </View>);
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          minHeight: Common.getLengthByIPhone7(68),
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          {legenda}
        </View>);
      }
    }
  };

  toggleScrolling = () => {
    this.setState({scrollEnabled: !this.state.scrollEnabled});
  };

  render() {

    // console.log('screen: ' + JSON.stringify(Dimensions.get('screen')));
    // console.log('window: ' + JSON.stringify(Dimensions.get('window')));

    if (this.state.isPortrait) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.backgroundColor,
        }}>
          <View style={{
            width: Dimensions.get('window').width,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: Common.getLengthByIPhone7(60),
          }}>
            <Text style={{
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(34),
              color: Colors.textColor,
              marginLeft: Common.getLengthByIPhone7(16),
              lineHeight: Common.getLengthByIPhone7(42),
            }}>
              {this.props.navigation.state.params.name}
            </Text>
          </View>
          <FlatList
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: Common.getLengthByIPhone7(0),
            }}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            enableEmptySections={true}
            data={this.state.dataSource}
            renderItem={this.renderRow}
            removeClippedSubviews={false}
            bounces={true}
            keyExtractor={(item, index) => `cgc-${item.id}`}
          />
          <View style={{
            position: 'absolute',
            left: 0,
            top: 20,
          }}>
            <BackButton navigation={this.props.navigation} />
          </View>
          <Spinner
            visible={this.state.visible}
            textContent={"Загрузка..."}
            overlayColor={'rgba(32, 42, 91, 0.3)'}
            textStyle={{color: '#FFF'}}
          />
        </View>
      );
    } else {
      let width = Common.getLengthByIPhone7(220);
      let flexDirection = 'column';
      let graphView = null;
      let tableView = null;
      let legendView = [];
      let alignItems = 'flex-start';
      let justifyContent = 'flex-start';

      let graph = (<TouchableOpacity onPress={() => this.onGraphClick()} style={{
        marginRight: Common.getLengthByIPhone7(24),
      }}>
        <Image source={require('./../assets/ic-button-graph-inact.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(26),
          height: Common.getLengthByIPhone7(26),
        }} />
      </TouchableOpacity>);

      let histo = (<TouchableOpacity onPress={() => this.onHistoClick()} style={{
        marginRight: Common.getLengthByIPhone7(24),
      }}>
        <Image source={require('./../assets/ic-button-histogram-inact.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(26),
          height: Common.getLengthByIPhone7(26),
        }} />
      </TouchableOpacity>);

      let pie = (<TouchableOpacity onPress={() => this.onPieClick()} style={{
        marginRight: Common.getLengthByIPhone7(24),
      }}>
        <Image source={require('./../assets/ic-button-pie-inact.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(26),
          height: Common.getLengthByIPhone7(26),
        }} />
      </TouchableOpacity>);

      let table = (<TouchableOpacity onPress={() => this.onTableClick()} style={{
        marginRight: Common.getLengthByIPhone7(16),
      }}>
        <Image source={require('./../assets/ic-button-table-inact.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(26),
          height: Common.getLengthByIPhone7(26),
        }} />
      </TouchableOpacity>);

      if(this.state.type == 0) {
        graph = (<TouchableOpacity onPress={() => this.onGraphClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-graph-act.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);
        graphView = (<ReportGraphView toggleScrolling={this.toggleScrolling} rowx={this.state.report.rowx} rowy={this.state.report.rowy} data={this.state.report.data} datax={this.state.report.datax}/>);
      } else if(this.state.type == 1) {
        histo = (<TouchableOpacity onPress={() => this.onHistoClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-histogram-act.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);
        graphView = (<ReportHistogramView rowx={this.state.report.rowx} rowy={this.state.report.rowy} data={this.state.report.data} datax={this.state.report.datax}/>);
      } else if(this.state.type == 2) {
        pie = (<TouchableOpacity onPress={() => this.onPieClick()} style={{
          marginRight: Common.getLengthByIPhone7(24),
        }}>
          <Image source={require('./../assets/ic-button-pie-act.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);
        graphView = (<ReportPieView data={this.state.report.data} />);
      } else {
        table = (<TouchableOpacity onPress={() => this.onTableClick()} style={{
          marginRight: Common.getLengthByIPhone7(16),
        }}>
          <Image source={require('./../assets/ic-button-table-act.png')} style={{
            resizeMode: 'contain',
            width: Common.getLengthByIPhone7(26),
            height: Common.getLengthByIPhone7(26),
          }} />
        </TouchableOpacity>);
        tableView = (<ReportTableView data={this.state.report.data} datax={this.state.report.datax}/>);
        flexDirection = 'column';
        width = Dimensions.get('window').width;
        alignItems = 'flex-end';
        justifyContent = 'flex-end';
        graphView = (<View></View>);
      }

      if(this.state.type != 3) {

        for(let i=0;i<this.state.report.data.length;i++) {

          legendView.push(<View style={{
            width: width,
            minHeight: Common.getLengthByIPhone7(50),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          key={i}>
            <View style={{
              width: Common.getLengthByIPhone7(18),
              height: Common.getLengthByIPhone7(18),
              backgroundColor: 'transparent',
              borderRadius: Common.getLengthByIPhone7(9),
              borderWidth: Common.getLengthByIPhone7(4),
              borderColor: colors[i],
            }}>
            </View>
            <Text style={{
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(20),
              lineHeight: Common.getLengthByIPhone7(25),
              marginLeft: Common.getLengthByIPhone7(10),
              marginRight: Common.getLengthByIPhone7(16),
              color: Colors.textColor,
            }}>
              {this.state.report.data[i].name}
            </Text>
          </View>);
        }
      }

      return (
        <View style={{
          flex: 1,
          width: Dimensions.get('window').width,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.backgroundColor,
        }}>
          <View style={{
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{
              marginLeft: 0,
            }}>
              <BackButton navigation={this.props.navigation} />
            </View>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'FuturaNewMediumReg',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(34),
                color: Colors.textColor,
                lineHeight: Common.getLengthByIPhone7(42),
              }}>
                {this.props.navigation.state.params.name}
              </Text>
            </View>
            <View style={{
              width: Common.getLengthByIPhone7(24),
              height: Common.getLengthByIPhone7(24),
              marginRight: Common.getLengthByIPhone7(20),
              justifyContent: 'center',
              alignItems: 'center',
            }} >
            </View>
          </View>
          <ScrollView style={{
            flex: 1,
            width: Dimensions.get('window').width,
          }} scrollEnabled={this.state.scrollEnabled}>

            <View style={{
              flexDirection: flexDirection,
              flex: 1,
              width: Dimensions.get('window').width,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              {graphView}
              <View style={{
                width: width,
                alignItems: alignItems,
                marginLeft: Common.getLengthByIPhone7(16)
              }}>
                <View style={{
                  width: width,
                  minHeight: Common.getLengthByIPhone7(46),
                  alignItems: 'center',
                  justifyContent: justifyContent,
                  flexDirection: 'row',
                }}>
                  {graph}
                  {histo}
                  {pie}
                  {table}
                </View>
                {legendView}
              </View>
              {tableView}
            </View>
          </ScrollView>
          <Spinner
            visible={this.state.visible}
            textContent={"Загрузка..."}
            overlayColor={'rgba(32, 42, 91, 0.3)'}
            textStyle={{color: '#FFF'}}
          />
        </View>
      );
    }
  }
}
