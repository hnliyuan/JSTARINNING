import React, { Component } from 'react'
import { View, Text, TouchableHighlight,  StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button, Grid, Row, Col } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

class WarnningData extends Component{
	
	constructor (props) {
		super(props)
	}
	
	static navigationOptions = {
	  header: ({ navigate ,state, setParams, goBack, dispatch }) => ({
	  		style : {backgroundColor:'#08527a'},
	  		title : '告警数据查询',
	  		titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
	  		left : (
  				<TouchableHighlight onPress={() => goBack()}  >
  					<Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{'返回'}</Text>
  				</TouchableHighlight>
	  		),
	  		right : (
	  			<TouchableHighlight onPress={() => console.log('分享')}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{'分享'}</Text>
	  			</TouchableHighlight>
	  		)
	  		
	  })
	  
	}
		
	render(){
		return (<View >
		</View>)
	}
}


export default WarnningData
