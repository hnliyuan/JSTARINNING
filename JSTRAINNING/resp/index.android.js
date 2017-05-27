/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import AppContainer from './src/AppContainer'

global.webUrl = 'http://192.168.48.99:8088';
const resp_app = () => (
	<AppContainer/>
)


AppRegistry.registerComponent('resp', () => resp_app);


