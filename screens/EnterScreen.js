import React from 'react';
import { Platform, Text, Image, View, Dimensions, TouchableOpacity, TextInput, ImageBackground, Alert, Keyboard, Animated } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import Profile from './../Utilites/Profile'
import Common from './../Utilites/Common'
import Network, { login } from './../Utilites/Network'
import Spinner from 'react-native-loading-spinner-overlay';

export default class EnterScreen extends React.Component {

  fadeAnim = new Animated.Value(1);
  topY = new Animated.Value(Common.getLengthByIPhone7(140));


  state = {
    login: '',
    password: '',
    visible: false,
  };

  componentWillMount() {

  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    console.log('Keyboard Shown: ' + e.endCoordinates.height);
    let buttonBottom = Common.getLengthByIPhone7(140+75+19+40+30+19+40+30+38+5);
    if(Dimensions.get('window').height - e.endCoordinates.height < buttonBottom) {
      let Y = Common.getLengthByIPhone7(140) - (buttonBottom - (Dimensions.get('window').height - e.endCoordinates.height));
      Animated.parallel([
        Animated.timing(
          this.fadeAnim,
          {
            toValue: 0,
            duration: 200,
          }
        ),
        Animated.timing(
          this.topY,
          {
            toValue: Y,
            duration: 200,
          }
        )
      ]).start();
    }
  }

  _keyboardDidHide = () => {
    console.log('Keyboard Hidden');
    Animated.parallel([
      Animated.timing(
        this.fadeAnim,
        {
          toValue: 1,
          duration: 200,
        }
      ),
      Animated.timing(
        this.topY,
        {
          toValue: Common.getLengthByIPhone7(140),
          duration: 200,
        }
      )
    ]).start();
  }

  constructor(props) {
    super(props);
  }

  onEnterPress = () => {
    // this.props.navigation.navigate('SignedIn');
    if(this.state.login.length && this.state.password.length) {
      this.setState({
        visible: true,
      });
      login(this.state.login, this.state.password)
      .then(() => {
        this.setState({
          visible: false,
          login: '',
          password: '',
        }, () => {
          setTimeout(() => {
            this.props.navigation.navigate('SignedIn');
          }, 100);
        });
      })
      .catch((err) => {
        this.setState({
          visible: false,
        }, () => {
          setTimeout(() => {
            Alert.alert('Госаптека', err);
          }, 100);
        });
      });
    } else {
      Alert.alert('Госаптека', 'Введите логин и пароль!');
    }
  }

  render() {

    /*
    <TouchableOpacity onPress={() => this.onEnterPress()} style={{
      width: Common.getLengthByIPhone7(218),
      marginTop: Dimensions.get('window').width*10/375,
      alignItems: 'flex-start',
    }}>
      <Text style={{
        fontFamily: 'RodchenkoCondensedBold',
        textAlign: 'center',
        fontSize: Common.getLengthByIPhone7(18),
        color: Colors.mainColor,
        lineHeight: Common.getLengthByIPhone7(19),
        marginTop: Common.getLengthByIPhone7(20),
      }}>
        Забыли пароль?
      </Text>
    </TouchableOpacity>



    marginTop: Common.getLengthByIPhone7(75),

    */
    return (
      <ImageBackground source={require('./../assets/ic-fon.png')} style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
      }}>
        <Animated.Image source={require('./../assets/ic-header.png')} style={{
          resizeMode: 'contain',
          width: Common.getLengthByIPhone7(340),
          height: Common.getLengthByIPhone7(140),
          opacity: this.fadeAnim,
        }} />
        <Animated.View style={{
          position: 'absolute',
          top: this.topY,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <View style={{
            width: Common.getLengthByIPhone7(218),
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(18),
              color: 'black',
              opacity: 0.5,
              lineHeight: Common.getLengthByIPhone7(19),
              marginTop: Common.getLengthByIPhone7(75),
            }}>
              Логин
            </Text>
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0, 0, 0, 0.2)',
              height: Common.getLengthByIPhone7(40),
              width: Common.getLengthByIPhone7(238),
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(22),
              lineHeight: Common.getLengthByIPhone7(28),
              color: Colors.mainColor,
              padding: Common.getLengthByIPhone7(10),
            }}
            underlineColorAndroid={'transparent'}
            keyboardType='email-address'
            returnKeyType={'next'}
            onSubmitEditing={(event) => {this.refs.Password.focus();}}
            secureTextEntry={false}
            placeholder='Логин'
            onChangeText={(login) => this.setState({login})}
            value={this.state.login}
          />
          <View style={{
            width: Common.getLengthByIPhone7(218),
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(18),
              color: 'black',
              opacity: 0.5,
              lineHeight: Common.getLengthByIPhone7(19),
              marginTop: Common.getLengthByIPhone7(30),
            }}>
              Пароль
            </Text>
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0, 0, 0, 0.2)',
              height: Common.getLengthByIPhone7(40),
              width: Common.getLengthByIPhone7(238),
              fontFamily: 'FuturaNewMediumReg',
              textAlign: 'left',
              fontSize: Common.getLengthByIPhone7(22),
              lineHeight: Common.getLengthByIPhone7(28),
              color: Colors.mainColor,
              padding: Common.getLengthByIPhone7(10),
            }}
            ref='Password'
            underlineColorAndroid={'transparent'}
            secureTextEntry={true}
            returnKeyType={'done'}
            onSubmitEditing={(event) => {this.onEnterPress()}}
            placeholder='Пароль'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity onPress={() => this.onEnterPress()} style={{
            height: Common.getLengthByIPhone7(38),
            width: Common.getLengthByIPhone7(84),
            marginTop: Common.getLengthByIPhone7(30),
            borderRadius: Common.getLengthByIPhone7(6),
            backgroundColor: Colors.mainColor,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontFamily: 'RodchenkoCondensedBold',
              textAlign: 'center',
              fontSize: Common.getLengthByIPhone7(18),
              color: 'white',
              lineHeight: Common.getLengthByIPhone7(19),
              marginTop: Common.getLengthByIPhone7(5),
            }}>
              Вход
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Spinner
          visible={this.state.visible}
          textContent={"Загрузка..."}
          overlayColor={'rgba(32, 42, 91, 0.3)'}
          textStyle={{color: '#FFF'}}
        />
      </ImageBackground>
    );
  }
}
