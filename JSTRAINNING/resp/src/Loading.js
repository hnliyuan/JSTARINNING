import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import Util from './util/Util';
import Constant  from './util/Constant'



let image1 = require('../src/images/nav1.png');
let image2 = require('../src/images/nav2.png');
let image3 = require('../src/images/nav3.png');




export default class Loading extends Component {
	
	constructor(props){
		super(props)
	}
	
  
  render() {
  	

    return (<ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        pagingEnabled={true}
        horizontal={true}>
        <Image source={image1} style={styles.backgroundImage} />
        <Image source={image2} style={styles.backgroundImage} />
        <TouchableHighlight  
				  onPress={ this.props.checkLogin }
				>
        	<Image source={image3} style={styles.backgroundImage}/>
        </TouchableHighlight>
      </ScrollView>)
  }
};



var styles = StyleSheet.create({
    contentContainer: {
      width: Util.size.width*3,
      height: Util.size.height,
    },
    backgroundImage: {
      width: Util.size.width,
      height: Util.size.height,
    },
});

