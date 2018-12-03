import React from 'react';
import { observable, computed } from "mobx";
import * as mobx from 'mobx';
import { observer } from "mobx-react";
import { AsyncStorage, Platform } from 'react-native';
import Config from './../constants/Config';

class Profile extends React.Component {

  @observable userId = 0;
  @observable username = '';
  @observable birthday = '';
  @observable sex = 0;

  constructor(props) {
    super(props);
    mobx.autorun(() => {});
  }
}

const profile = new Profile();
export default profile;
