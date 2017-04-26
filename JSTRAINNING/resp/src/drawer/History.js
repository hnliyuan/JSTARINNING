import React, { Component } from 'react'
import { View, Text, TouchableHighlight,  StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button, Grid, Row, Col } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

class History extends Component{
	
	constructor (props) {
		super(props)
	}
	
	static navigationOptions = {
	  header: ({ navigate ,state, setParams, goBack, dispatch }) => ({
	  		style : {backgroundColor:'#08527a'},
	  		title : '最近查看的设备 ',
	  		titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
	  		left : (
  				<TouchableHighlight onPress={() => goBack()}  >
  					<Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{'返回'}</Text>
  				</TouchableHighlight>
	  		),
	  		right : (
	  			<TouchableHighlight onPress={() => console.log('')}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{''}</Text>
	  			</TouchableHighlight>
	  		)
	  		
	  })
	  
	}
		
	render(){
		return (<View >
		</View>)
	}
}


export default History
