import React, { Component } from 'react'
import { View, Text,  BackAndroid, TouchableHighlight} from 'react-native'
import Util from '../../src/util/Util'
import Constant from '../../src/util/Constant'
import {
Grid,
Row,
ButtonGroup
} from 'react-native-elements'
import PhoneMethod from './findPassMethod/PhoneMethod'
import EmailMethod from './findPassMethod/EmailMethod'



class ForgetPassWord extends Component{
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	selectedIndex : 0
	    }
    }
	
	updateIndex = (selectedIndex) => {
	  this.setState({selectedIndex:selectedIndex});
	}
	
	
	static navigationOptions = {
	  header: ({ state, setParams, goBack }) => ({
	  		style : {backgroundColor:'#0cb8f6'},
	  		title : '找回密码',
	  		titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
	  		left : (
	  			<TouchableHighlight onPress={() => goBack()}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{'<返回'}</Text>
	  			</TouchableHighlight>
	  		),
	  		right : (
  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{'分享'}</Text>
	  		)
	  		
	  })
	  
	}
		
		
	render() {
		const buttons = ['手机方式', '邮件方式']
		
		const { navigate } = this.props.navigation
		
		
		let page = (<PhoneMethod navigate={navigate}></PhoneMethod>)
		
		switch(this.state.selectedIndex) {
			case Constant.ForgetPassWord.PHONE:
				page = (<PhoneMethod navigate={navigate}></PhoneMethod>)
				break;
			case Constant.ForgetPassWord.EMAIL:
				page = (<EmailMethod></EmailMethod>)
				break;
		}
		
		return  (
			<View>
				<ButtonGroup
					  selectedIndex={this.state.selectedIndex}
				      onPress={this.updateIndex}
				      buttons={buttons}
				      containerStyle={{height: 35}} />
					{page}
			</View>
			
		)
	}
	
}

export default ForgetPassWord