import React from 'react';
import { Platform, Dimensions } from 'react-native';
import Config from './../constants/Config';

class Common extends React.Component {

  constructor(props) {
    super(props);
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  getLengthByIPhone7 = (length) => {
    if(length > 0) {
      if(this.isPortrait()) {
        return Dimensions.get('window').width*length/375;
      } else {
        return Dimensions.get('window').height*length/375;
      }
    } else {
      if(this.isPortrait()) {
        return Dimensions.get('window').width;
      } else {
        return Dimensions.get('window').height;
      }
    }
  }
}

const common = new Common();
export default common;
