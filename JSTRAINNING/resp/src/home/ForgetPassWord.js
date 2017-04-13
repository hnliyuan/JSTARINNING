import React, { Component } from 'react'
import { View, Text,  BackAndroid, TouchableHighlight} from 'react-native'
import Util from '../../src/util/Util'
import Constant from '../../src/util/Constant'
import {
Grid,
Row,
ButtonGroup
} from 'react-native-elements'



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
		const buttons = ['手机方式', '邮件方式', '短信方式']
		
		let page = (<View><Text>Phone</Text></View>);
		
		switch(this.state.selectedIndex) {
			case Constant.ForgetPassWord.PHONE:
				page = (<View><Text>PHONE</Text></View>)
				break;
			case Constant.ForgetPassWord.EMAIL:
				page = (<View><Text>Email</Text></View>)
				break;
			case Constant.ForgetPassWord.SMS:
				page = (<View><Text>SMS</Text></View>)
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