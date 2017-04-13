import React, { Component } from 'react'
import { View, Text, TouchableHighlight,  StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button, Grid, Row, Col } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

class RegisterSuccess extends Component{
	
	constructor (props) {
		super(props)
	}
	
	static navigationOptions = {
	  header: ({ navigate ,state, setParams, goBack, dispatch }) => ({
	  		style : {backgroundColor:'#0cb8f6'},
	  		title : '处理结果',
	  		titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
	  		left : (
  				<Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{' '}</Text>
	  		),
	  		right : (
	  			<TouchableHighlight onPress={() => dispatch(resetAction)}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{'完成'}</Text>
	  			</TouchableHighlight>
	  		)
	  		
	  })
	  
	}
		
	render(){
		return (<View style={styles.container}>
			<Icon
			  name='done'
			  type='material-community'
			  color='green'
			  size={40}
			/>
			<Text style={{color:'green',fontSize:30}}> 注册成功!</Text>

		</View>)
	}
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

styles = StyleSheet.create({
	container :{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
	}
})

export default RegisterSuccess
