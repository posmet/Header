import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, TouchableOpacity, ScrollView, Animated, Linking } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import I18n from './../Utilites/Localization'
import Network, { getPharmById } from './../Utilites/Network'
import { observer } from 'mobx-react/native';
import Common from './../Utilites/Common'
import BackButton from './../components/BackButton'
import Spinner from 'react-native-loading-spinner-overlay';
import { MapView } from 'expo';

const { width } = Dimensions.get('window');

let rows = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
]

@observer
export default class AptekaScreen extends React.Component {

  scrollX = new Animated.Value(0)

  state = {
    visible: true,
    dataSource: rows,
    apteka: null,
  };

  componentWillMount() {
    getPharmById(this.props.navigation.state.params.id)
    .then((apteka) => {
      this.setState({
        apteka: apteka,
        visible: false,
        dataSource: rows,
      });
    })
    .catch((err) => {
      this.setState({
        apteka: null,
        visible: false,
        dataSource: rows,
      });
    });
  }

  constructor(props) {
    super(props);
  }

  onStatClick = () => {
    if(this.props.navigation.state.params.info) {
      this.props.navigation.navigate('AptekaReport2', {name: this.state.apteka.name, id: this.state.apteka.id, info: true});
    } else {
      this.props.navigation.navigate('AptekaReport', {name: this.state.apteka.name, id: this.state.apteka.id});
    }

  };

  callNumber = (url) =>{
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  renderRow = ({item}) => {

    if(this.state.apteka == null) {
      return null;
    } else {
      if(item.id == 1) {

        let position = Animated.divide(this.scrollX, width);
        let img = [];
        let pages = [];

        if(this.state.apteka.pic.length) {
          for(let i=0;i<this.state.apteka.pic.length;i++) {
            let pic = Config.apiDomain + '/' + this.state.apteka.pic[i];
            console.log('pic: ' + pic);
            img.push(<Image
              defaultSource={require('./../assets/ic-placeholder-big.jpg')}
              source={{uri: pic}}
              key={Math.random()}
              style={{
                resizeMode: 'cover',
                width: Common.getLengthByIPhone7(0),
                height: Common.getLengthByIPhone7(248),
            }} />);
            pages.push('1');
          }
        } else {
          img.push(<Image
            source={require('./../assets/ic-placeholder-big.jpg')}
            key={Math.random()}
            style={{
              resizeMode: 'cover',
              width: Common.getLengthByIPhone7(0),
              height: Common.getLengthByIPhone7(248),
          }} />);
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(248),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
            scrollEventThrottle={16}
            bounces={false}
            style={{
              flexDirection: 'row',
          }}>
            {img}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: Common.getLengthByIPhone7(20),
            }}
          >
            {pages.map((_, i) => {
              let backgroundColor = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: ['white', Colors.mainColor, 'white'],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    backgroundColor,
                    height: Common.getLengthByIPhone7(8),
                    width: Common.getLengthByIPhone7(8),
                    // backgroundColor: Colors.pink,
                    marginLeft: Common.getLengthByIPhone7(2),
                    marginRight: Common.getLengthByIPhone7(2),
                    borderRadius: Common.getLengthByIPhone7(4),
                  }}
                />
              );
            })}
          </View>
        </View>);
      } else if(item.id == 2) {
        let phones = [];
        let email = '';

        for(let i=0;i<this.state.apteka.rates.length;i++) {
          if(this.state.apteka.rates[i].id == 3) {
            email = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 2) {
            phones = this.state.apteka.rates[i].val;
          }
        }

        if (!Array.isArray(phones)) {
          phones = [phones];
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          minHeight: Common.getLengthByIPhone7(68),
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <Text style={{
            fontFamily: 'FuturaNewMediumReg',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(24),
            lineHeight: Common.getLengthByIPhone7(29),
            marginLeft: Common.getLengthByIPhone7(16),
            marginRight: Common.getLengthByIPhone7(16),
            marginTop: Common.getLengthByIPhone7(10),
            color: Colors.textColor,
          }}>
            {this.state.apteka.name}
          </Text>
          <Text style={{
            fontFamily: 'RoadRadio',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(10),
            lineHeight: Common.getLengthByIPhone7(13),
            marginLeft: Common.getLengthByIPhone7(16),
            marginRight: Common.getLengthByIPhone7(16),
            marginBottom: Common.getLengthByIPhone7(5),
            color: Colors.textColor,
          }}>
            ID аптеки в базе {this.state.apteka.id}
          </Text>
          <Text style={{
            fontFamily: 'RoadRadio',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(10),
            lineHeight: Common.getLengthByIPhone7(13),
            marginLeft: Common.getLengthByIPhone7(16),
            marginRight: Common.getLengthByIPhone7(16),
            marginBottom: Common.getLengthByIPhone7(5),
            color: Colors.textColor,
          }}>
            {this.state.apteka.addr}
          </Text>
          <Text style={{
            fontFamily: 'RoadRadioBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(12),
            lineHeight: Common.getLengthByIPhone7(13),
            marginLeft: Common.getLengthByIPhone7(16),
            marginRight: Common.getLengthByIPhone7(16),
            marginBottom: Common.getLengthByIPhone7(5),
            color: Colors.textColor,
          }}>
            Почта: <Text style={{
              fontFamily: 'RoadRadio',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(13),
              marginLeft: Common.getLengthByIPhone7(16),
              marginRight: Common.getLengthByIPhone7(16),
              marginBottom: Common.getLengthByIPhone7(5),
              color: Colors.textColor,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            }} onPress={() => Linking.openURL(`mailto:${email}`) }>
              {email}
            </Text>
          </Text>
          <Text style={{
            fontFamily: 'RoadRadioBold',
            textAlign: 'left',
            fontSize: Common.getLengthByIPhone7(12),
            lineHeight: Common.getLengthByIPhone7(13),
            marginLeft: Common.getLengthByIPhone7(16),
            marginRight: Common.getLengthByIPhone7(16),
            marginBottom: Common.getLengthByIPhone7(10),
            color: Colors.textColor,
          }}>
            Телефон:
            { phones.map(phone => (
              <Text key={`pharm-phone-${phone}`} style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                marginLeft: Common.getLengthByIPhone7(16),
                marginRight: Common.getLengthByIPhone7(16),
                marginBottom: Common.getLengthByIPhone7(10),
                color: Colors.textColor,
              }} onPress={()=> this.callNumber(`tel:${phone}`)}>
                {phone}
              </Text>
            )) }
          </Text>
        </View>);
      } else if(item.id == 3) {

        let viruch = '';
        let check = '';

        for(let i=0;i<this.state.apteka.rates.length;i++) {
          if(this.state.apteka.rates[i].id == 5) {
            viruch = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 6) {
            check = this.state.apteka.rates[i].val;
          }
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(54),
          backgroundColor: Colors.mainColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{
            marginLeft: Common.getLengthByIPhone7(16),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'center',
              fontSize: Common.getLengthByIPhone7(20),
              lineHeight: Common.getLengthByIPhone7(20),
              color: Colors.backgroundColor,
            }}>
              {viruch}
            </Text>
            <Text style={{
              fontFamily: 'RoadRadio',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(13),
              color: Colors.backgroundColor,
            }}>
              СРЕДНЯЯ ВЫРУЧКА ЗА МЕСЯЦ
            </Text>
          </View>
          <View style={{
            marginRight: Common.getLengthByIPhone7(16),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'center',
              fontSize: Common.getLengthByIPhone7(20),
              lineHeight: Common.getLengthByIPhone7(20),
              color: Colors.backgroundColor,
            }}>
              {check}
            </Text>
            <Text style={{
              fontFamily: 'RoadRadio',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(13),
              color: Colors.backgroundColor,
            }}>
              СРЕДНИЙ ЧЕК
            </Text>
          </View>
        </View>);
      } else if(item.id == 4) {

        let staff = '';
        let name = '';
        let email = '';
        let phone = [];

        for(let i=0;i<this.state.apteka.rates.length;i++) {
          if(this.state.apteka.rates[i].id == 12) {
            staff = this.state.apteka.rates[i].name;
            name = this.state.apteka.rates[i].val.name;
            email = this.state.apteka.rates[i].val.email;
            phone = this.state.apteka.rates[i].val.phone;
          }
        }

        if (!Array.isArray(phone)) {
          phone = [phone];
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          // height: Common.getLengthByIPhone7(67),
          marginTop: Common.getLengthByIPhone7(12),
          marginBottom: Common.getLengthByIPhone7(12),
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
          <Image source={require('./../assets/ic-placeholder-big.jpg')} style={{
            resizeMode: 'cover',
            width: Common.getLengthByIPhone7(50),
            height: Common.getLengthByIPhone7(50),
            marginLeft: Common.getLengthByIPhone7(16),
            borderRadius: Common.getLengthByIPhone7(25),
          }} />
          <View style={{
            marginLeft: Common.getLengthByIPhone7(11),
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(16),
              lineHeight: Common.getLengthByIPhone7(15),
              color: Colors.textColor,
            }}>
              {staff}
            </Text>
            <Text style={{
              fontFamily: 'ArctikaScript',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(24),
              lineHeight: Common.getLengthByIPhone7(27),
              marginRight: Common.getLengthByIPhone7(16),
              color: Colors.textColor,
            }}>
              {name}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(11),
              marginRight: Common.getLengthByIPhone7(16),
              color: '#847D78',
            }}>
              Почта
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(18),
              lineHeight: Common.getLengthByIPhone7(19),
              marginRight: Common.getLengthByIPhone7(16),
              color: Colors.textColor,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            }} onPress={() => Linking.openURL(`mailto:${email}`) }>
              {email}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(10),
              lineHeight: Common.getLengthByIPhone7(11),
              marginRight: Common.getLengthByIPhone7(16),
              color: '#847D78',
            }}>
              Телефон
            </Text>
            { phone.map(item => (
              <Text key={`pharm-phone-${item}`} style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(18),
                lineHeight: Common.getLengthByIPhone7(19),
                marginRight: Common.getLengthByIPhone7(16),
                color: Colors.textColor,
              }} onPress={()=> this.callNumber(`tel:${item}`)}>
                {item}
              </Text>
            )) }
          </View>
        </View>);
      } else if(item.id == 5) {

        let personal = '';
        let square = '';
        let squareTorg = '';
        let squareHran = '';
        let kass = '';

        for(let i=0;i<this.state.apteka.rates.length;i++) {
          if(this.state.apteka.rates[i].id == 7) {
            personal = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 9) {
            square = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 10) {
            squareTorg = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 11) {
            squareHran = this.state.apteka.rates[i].val;
          } else if(this.state.apteka.rates[i].id == 8) {
            kass = this.state.apteka.rates[i].val;
          }
        }

        return (
        <View style={{

        }}>
          <View style={{
            width: Common.getLengthByIPhone7(0),
            height: Common.getLengthByIPhone7(46),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
            <View style={{
              backgroundColor: Colors.textColor,
              width: Common.getLengthByIPhone7(168),
              height: Common.getLengthByIPhone7(46),
              marginLeft: Common.getLengthByIPhone7(16),
              backgroundColor: '#3C8379',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                color: Colors.backgroundColor,
              }}>
                СОТРУДНИКОВ
              </Text>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(20),
                lineHeight: Common.getLengthByIPhone7(20),
                marginTop: Common.getLengthByIPhone7(5),
                color: Colors.backgroundColor,
              }}>
                {personal} человек
              </Text>
            </View>
            <View style={{
              backgroundColor: Colors.textColor,
              width: Common.getLengthByIPhone7(168),
              height: Common.getLengthByIPhone7(46),
              marginRight: Common.getLengthByIPhone7(16),
              backgroundColor: '#3C8379',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                color: Colors.backgroundColor,
              }}>
                ОБЩАЯ ПЛОЩАДЬ
              </Text>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(20),
                lineHeight: Common.getLengthByIPhone7(20),
                marginTop: Common.getLengthByIPhone7(5),
                color: Colors.backgroundColor,
              }}>
                {square} M2
              </Text>
            </View>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(0),
            height: Common.getLengthByIPhone7(46),
            marginTop: Common.getLengthByIPhone7(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
            <View style={{
              backgroundColor: Colors.textColor,
              width: Common.getLengthByIPhone7(168),
              height: Common.getLengthByIPhone7(46),
              marginLeft: Common.getLengthByIPhone7(16),
              backgroundColor: '#3C8379',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                color: Colors.backgroundColor,
              }}>
                ТОРГОВАЯ ПЛОЩАДЬ
              </Text>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(20),
                lineHeight: Common.getLengthByIPhone7(20),
                marginTop: Common.getLengthByIPhone7(5),
                color: Colors.backgroundColor,
              }}>
                {squareTorg} M2
              </Text>
            </View>
            <View style={{
              backgroundColor: Colors.textColor,
              width: Common.getLengthByIPhone7(168),
              height: Common.getLengthByIPhone7(46),
              marginRight: Common.getLengthByIPhone7(16),
              backgroundColor: '#3C8379',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                color: Colors.backgroundColor,
              }}>
                ПЛОЩАДЬ ХРАНЕНИЯ
              </Text>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(20),
                lineHeight: Common.getLengthByIPhone7(20),
                marginTop: Common.getLengthByIPhone7(5),
                color: Colors.backgroundColor,
              }}>
                {squareHran} M2
              </Text>
            </View>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(0),
            height: Common.getLengthByIPhone7(46),
            marginTop: Common.getLengthByIPhone7(10),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
            <View style={{
              backgroundColor: Colors.textColor,
              width: Common.getLengthByIPhone7(0) - 2*Common.getLengthByIPhone7(16),
              height: Common.getLengthByIPhone7(46),
              backgroundColor: '#3C8379',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RoadRadio',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(10),
                lineHeight: Common.getLengthByIPhone7(13),
                color: Colors.backgroundColor,
              }}>
                ЧИСЛО КАСС
              </Text>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(20),
                lineHeight: Common.getLengthByIPhone7(20),
                marginTop: Common.getLengthByIPhone7(5),
                color: Colors.backgroundColor,
              }}>
                {kass}
              </Text>
            </View>
          </View>
        </View>);
      } else if(item.id == 6) {

        let day1H1 = '';
        let day1H2 = '';
        let day1H3 = '';
        let day1H4 = '';

        let day2H1 = '';
        let day2H2 = '';
        let day2H3 = '';
        let day2H4 = '';

        let day3H1 = '';
        let day3H2 = '';
        let day3H3 = '';
        let day3H4 = '';

        let day4H1 = '';
        let day4H2 = '';
        let day4H3 = '';
        let day4H4 = '';

        let day5H1 = '';
        let day5H2 = '';
        let day5H3 = '';
        let day5H4 = '';

        let day6H1 = '';
        let day6H2 = '';
        let day6H3 = '';
        let day6H4 = '';

        let day7H1 = '';
        let day7H2 = '';
        let day7H3 = '';
        let day7H4 = '';

        for(let i=0;i<this.state.apteka.rates.length;i++) {
          if(this.state.apteka.rates[i].id == 4) {
            let week = this.state.apteka.rates[i].val;
            for(let key in week) {
              // console.log('key: ' + key);
              if(key == 1) {
                day1H1 = week[key][0];
                day1H2 = week[key][1];
                day1H3 = week[key][2];
                day1H4 = week[key][3];
              } else if(key == 2) {
                day2H1 = week[key][0];
                day2H2 = week[key][1];
                day2H3 = week[key][2];
                day2H4 = week[key][3];
              } else if(key == 3) {
                day3H1 = week[key][0];
                day3H2 = week[key][1];
                day3H3 = week[key][2];
                day3H4 = week[key][3];
              } else if(key == 4) {
                day4H1 = week[key][0];
                day4H2 = week[key][1];
                day4H3 = week[key][2];
                day4H4 = week[key][3];
              } else if(key == 5) {
                day5H1 = week[key][0];
                day5H2 = week[key][1];
                day5H3 = week[key][2];
                day5H4 = week[key][3];
              } else if(key == 6) {
                day6H1 = week[key][0];
                day6H2 = week[key][1];
                day6H3 = week[key][2];
                day6H4 = week[key][3];
              } else if(key == 7) {
                day7H1 = week[key][0];
                day7H2 = week[key][1];
                day7H3 = week[key][2];
                day7H4 = week[key][3];
              }
            }
            break;
          }
        }

        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(86),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              ПН
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day1H1}-{day1H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day1H3}-{day1H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              ВТ
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day2H1}-{day2H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day2H3}-{day2H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              СР
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day3H1}-{day3H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day3H3}-{day3H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              ЧТ
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day4H1}-{day4H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day4H3}-{day4H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              ПТ
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day5H1}-{day5H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day5H3}-{day5H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            borderWidth: 1,
            borderColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.mainColor,
              opacity: 0.6,
            }}>
              СБ
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day6H1}-{day6H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.mainColor,
            }}>
              {day6H3}-{day6H4}
            </Text>
          </View>
          <View style={{
            width: Common.getLengthByIPhone7(48),
            height: Common.getLengthByIPhone7(60),
            borderRadius: Common.getLengthByIPhone7(6),
            marginLeft: Common.getLengthByIPhone7(2),
            backgroundColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: 'RoadRadioBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(12),
              lineHeight: Common.getLengthByIPhone7(14),
              color: Colors.backgroundColor,
              opacity: 0.6,
            }}>
              ВС
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.backgroundColor,
            }}>
              {day7H1}-{day7H2}
            </Text>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(11),
              lineHeight: Common.getLengthByIPhone7(19),
              color: Colors.backgroundColor,
            }}>
              {day7H3}-{day7H4}
            </Text>
          </View>
        </View>);
      } else if(item.id == 7) {
        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(55),
          marginTop: Common.getLengthByIPhone7(4),
        }}>
          <View style={{
            width: Common.getLengthByIPhone7(0),
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
            <TouchableOpacity onPress={() => this.onStatClick()} style={{
              width: Common.getLengthByIPhone7(84),
              height: Common.getLengthByIPhone7(38),
              borderRadius: Common.getLengthByIPhone7(6),
              marginRight: Common.getLengthByIPhone7(16),
              backgroundColor: Colors.mainColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'RodchenkoCondensedBold',
                textAlign: 'left',
                fontSize: Common.getLengthByIPhone7(18),
                lineHeight: Common.getLengthByIPhone7(19),
                marginTop: Common.getLengthByIPhone7(7),
                color: 'white',
              }}>
                СТАТИСТИКА
              </Text>
            </TouchableOpacity>
          </View>
        </View>);
      } else {
        let marker = null;
        if(Platform.OS === "android") {
          marker = (<MapView.Marker
            coordinate={{
              latitude: this.state.apteka.wpos,
              longitude: this.state.apteka.hpos,
            }}
            image={require('./../assets/ic-geotag2.png')}>

          </MapView.Marker>);
        } else {
          marker = (<MapView.Marker
            coordinate={{
              latitude: this.state.apteka.wpos,
              longitude: this.state.apteka.hpos,
            }}>
              <Image source={require('./../assets/ic-geotag2.png')} style={{
                resizeMode: 'contain',
                width: Common.getLengthByIPhone7(48),
                height: Common.getLengthByIPhone7(66),
              }} />
          </MapView.Marker>);
        }
        return (<View style={{
          width: Common.getLengthByIPhone7(0),
          height: Common.getLengthByIPhone7(205),
        }}>
          <MapView
            style={{
              flex: 1,
              marginBottom: Common.getLengthByIPhone7(15),
              width: Common.getLengthByIPhone7(0),
              height: Common.getLengthByIPhone7(205),
            }}
            mapType="none"
            initialRegion={{
              latitude: this.state.apteka.wpos,
              longitude: this.state.apteka.hpos,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            onPress={() => this.toMapScreen()}>
            <MapView.UrlTile
              urlTemplate={Config.urlTile}
            />
            {marker}
          </MapView>
        </View>);
      }
    }
  }

  toMapScreen = () => {
    this.props.navigation.navigate('Map', {name: this.state.apteka.name, lat: this.state.apteka.wpos, long: this.state.apteka.hpos, addr: this.state.apteka.addr});
  }

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        <FlatList
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          enableEmptySections={true}
          data={this.state.dataSource}
          renderItem={this.renderRow}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => index.toString()}
          bounces={true}
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
  }
}
