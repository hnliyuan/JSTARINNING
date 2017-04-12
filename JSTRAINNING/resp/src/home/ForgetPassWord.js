import React, { Component } from 'react'
import { View, Text, BackAndroid, TouchableHighlight} from 'react-native'
import Util from '../../src/util/Util'
class ForgetPassWord extends Component{
	
	constructor(props) {
	    super(props);

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
		
		return  (
			<View>
				
			</View>
		)
	}
	
	
	
	
	
}

export default ForgetPassWord